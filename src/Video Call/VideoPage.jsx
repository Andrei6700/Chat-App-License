import { useNavigate, useParams } from "react-router";
import "./css/styling.css";
import { useCallback, useEffect, useRef, useState, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, updateDoc, arrayUnion, Timestamp, getDoc, onSnapshot, collection, addDoc } from "firebase/firestore";
import FooterComponent from "./Components/FooterComponents";
import VideoComponent from "./Components/VideoComponent";
import { firebaseConfig } from "../firebase/firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { v4 as uuid } from "uuid";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function VideoCall() {
  const params = useParams(); // Access URL parameters
  const friend = useRef(null); // Ref for friend's video element
  const you = useRef(null); // Ref for user's video element
  const mute = useRef(null); // Ref for mute button
  const VideoToggle = useRef(null); // Ref for video toggle button
  const DisconnectCall = useRef(null); // Ref for disconnect call button
  const share = useRef(null); // Ref for share button

  const navigate = useNavigate(); // Hook for navigation
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  let server = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
  };
  let peerConnection = new RTCPeerConnection(server); // Create a new RTCPeerConnection

  const [localstream, setLocalstream] = useState(null); // State to hold local media stream
  const [isMuted, setIsMuted] = useState(false); // State to track mute status

  // Function to send room ID as a message in the chat
  const sendMessageToChat = async (roomID) => {
    const message = `Video call room created. Join using this ID: ${roomID}`;
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: message,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    // Update the last message in the user chats
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [`${data.chatId}.lastMessage`]: {
        text: message,
      },
      [`${data.chatId}.date`]: Timestamp.now(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [`${data.chatId}.lastMessage`]: {
        text: message,
      },
      [`${data.chatId}.date`]: Timestamp.now(),
    });
  };

  // Callback function to initialize media and connection
  const init = useCallback(async () => {
    // Request media devices and set local stream
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 },
      },
      audio: true,
    });
    // Set the obtained media stream as the local stream.
    setLocalstream(localStream);
    console.log("created ");
    // Create a new MediaStream object for the remote stream.
    const remoteStream = new MediaStream();
    // Set the source object for video elements for local and remote videos.
    friend.current.srcObject = remoteStream;
    you.current.srcObject = localStream;
    
    // Add each track from the local stream to the peer connection.
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });
    // Handling tracks from remote stream
    peerConnection.ontrack = (e) => {
      e.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
    // Get the room ID from the URL parameters.
    let roomID = params.roomID;
    // Check if the room ID indicates a new call should be created.
    if (params.roomID === "create") {
      // Create a new document in the 'calls' collection in the database.
      const docRef = await addDoc(collection(db, "calls"), {});
      roomID = docRef.id;
      // Handle ICE candidates for the new call.
      peerConnection.onicecandidate = async (e) => {
        if (e.candidate) {
          await setDoc(doc(db, "calls", roomID), {
            offer: JSON.stringify(peerConnection.localDescription),
          });
        }
      };
      // Create an offer for the call.
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      // Send roomID to chat
      sendMessageToChat(roomID);
    } else {
      // For an existing call, set the remote description from the stored offer.
      await peerConnection.setRemoteDescription(
        JSON.parse((await getDoc(doc(db, "calls", roomID))).data().offer)
      );
      // Handle ICE candidates for the existing call.
      peerConnection.onicecandidate = async (e) => {
        if (e.candidate) {
          await updateDoc(doc(db, "calls", roomID), {
            answer: JSON.stringify(peerConnection.localDescription),
          });
        }
      };

      // Waiting for a reply from the other user
      // This response can be an acceptance of the offer or a counterproposal
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
    }
    // Listen for changes in the Firestore
    onSnapshot(doc(db, "calls", roomID), async (doc) => {
      if (doc.data().answer && !peerConnection.currentRemoteDescription) {
        await peerConnection.setRemoteDescription(
          JSON.parse(doc.data().answer)
        );
      }
    });

    const localstream = localStream;
    // Event listener for disconnecting the call
    DisconnectCall.current.addEventListener("click", async () => {
      localstream.getTracks().forEach((track) => {
        track.stop();
      });
      peerConnection.close();
      navigate("/chat");
    });
    // Event listener for toggling video
    VideoToggle.current.addEventListener("click", async (e) => {
      const track = localstream
        .getTracks()
        .find((track) => track.kind === "video");
      if (track.enabled) {
        track.enabled = false;
        VideoToggle.current.style.backgroundColor = "red";
      } else {
        track.enabled = true;
        VideoToggle.current.style.backgroundColor = "green";
      }
    });
    // Event listener for muting audio
    mute.current.addEventListener("click", async () => {
      const track = localstream
        .getTracks()
        .find((track) => track.kind === "audio");
      if (track.enabled) {
        track.enabled = false;
        mute.current.style.backgroundColor = "red";
      } else {
        track.enabled = true;
        mute.current.style.backgroundColor = "green";
      }
    });
    // Handle changes in ICE connection state
    peerConnection.oniceconnectionstatechange = function () {
      if (peerConnection.iceConnectionState === "disconnected") {
        navigate("/chat");
      }
    };
    // Event listener for sharing the room ID
    share.current.addEventListener("click", async (e) => {
      await navigator.clipboard.writeText(roomID);
      console.log("Copied id");
    });
  });

  // Effect hook to initialize the component
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <VideoComponent you={you} friend={friend} />
      <FooterComponent
        VideoToggle={VideoToggle}
        mute={mute}
        DisconnectCall={DisconnectCall}
        share={share}
      />
    </>
  );
}
