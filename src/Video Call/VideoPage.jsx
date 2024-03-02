import { useNavigate, useParams } from "react-router";
import "./css/styling.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import FooterComponent from "./Components/FooterComponents";
import VideoComponent from "./Components/VideoComponent";
import { firebaseConfig } from "../firebase/firebase";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function VideoCall() {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const params = useParams();
  const friend = useRef(null);
  const you = useRef(null);
  const mute = useRef(null);
  const VideoToggle = useRef(null);
  const DisconnectCall = useRef(null);
  const share = useRef(null);
  const navigate = useNavigate();

  const init = useCallback(async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: isCameraOn,
      audio: isMicrophoneOn,
    });

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
    let peerConnection = new RTCPeerConnection(server);

    const remoteStream = new MediaStream();
    friend.current.srcObject = remoteStream;
    you.current.srcObject = localStream;
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });
    peerConnection.ontrack = (e) => {
      e.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    let roomID = params.roomID;
    if (params.roomID === "create") {
      const docRef = await addDoc(collection(db, "calls"), {});
      roomID = docRef.id;
      peerConnection.onicecandidate = async (e) => {
        if (e.candidate) {
          await setDoc(doc(db, "calls", roomID), {
            offer: JSON.stringify(peerConnection.localDescription),
          });
        }
      };
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
    } else {
      await peerConnection.setRemoteDescription(
        JSON.parse((await getDoc(doc(db, "calls", roomID))).data().offer)
      );
      peerConnection.onicecandidate = async (e) => {
        if (e.candidate) {
          await setDoc(doc(db, "calls", roomID), {
            answer: JSON.stringify(peerConnection.localDescription),
          });
        }
      };
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
    }

    onSnapshot(doc(db, "calls", roomID), async (doc) => {
      if (doc.data().answer && !peerConnection.currentRemoteDescription) {
        await peerConnection.setRemoteDescription(
          JSON.parse(doc.data().answer)
        );
      }
    });

    const localstream = localStream;
    DisconnectCall.current.addEventListener("click", async () => {
      localstream.getTracks().forEach((track) => {
        track.stop();
      });
      peerConnection.close();
      navigate("/chat");
    });

    VideoToggle.current.addEventListener("click", async (e) => {
      const track = localstream
        .getTracks()
        .find((track) => track.kind === "video");
      if (track.enabled) {
        track.enabled = false;
        VideoToggle.current.style.backgroundColor = "rgba(232, 154, 232, 0.567)";
      } else {
        track.enabled = true;
        VideoToggle.current.style.backgroundColor = "rgba(232, 154, 232,1)";
      }
    });
    mute.current.addEventListener("click", async () => {
      const track = localstream
        .getTracks()
        .find((track) => track.kind === "audio");
      if (track.enabled) {
        track.enabled = false;
        mute.current.style.backgroundColor = "rgb(209, 206, 206)";
      } else {
        track.enabled = true;
        mute.current.style.backgroundColor = "rgba(209, 206, 206, 0.35)";
      }
    });

    peerConnection.oniceconnectionstatechange = function () {
      if (peerConnection.iceConnectionState === "disconnected") {
        navigate("/chat");
      }
    };

    share.current.addEventListener("click", async (e) => {
      await navigator.clipboard.writeText(roomID);
      console.log("Copied id");
    });
  }, [isCameraOn, isMicrophoneOn, params.roomID, navigate, db]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <VideoComponent
        you={you}
        friend={friend}
        isCameraOn={isCameraOn} 
      />
      <FooterComponent
        VideoToggle={VideoToggle}
        mute={mute}
        DisconnectCall={DisconnectCall}
        share={share}
        toggleCamera={() => setIsCameraOn((prevState) => !prevState)} 
        toggleMicrophone={() => setIsMicrophoneOn((prevState) => !prevState)}
      />
    </>
  );
}
