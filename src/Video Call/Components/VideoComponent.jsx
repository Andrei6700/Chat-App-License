import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../firebase/firebase";

export const VideoComponent = ({
  onStreamReady,
}) => {
  const { currentUser } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const localStreamRef = useRef(null);
  let peerConnection;

  useEffect(() => {
    const init = async () => {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 1024, ideal: 1280, max: 1920 },
          height: { min: 576, ideal: 720, max: 1080 },
        },
        audio: true,
      });
      videoRef.current.srcObject = localStream;
      localStreamRef.current = localStream;
      onStreamReady && onStreamReady(localStream);

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
      peerConnection = new RTCPeerConnection(server);

      const roomID = params.roomID;

      if (params.roomID === "create") {
        createRoom(peerConnection, db);
      } else {
        joinRoom(peerConnection, db, roomID);
      }
    };

    init();

    return () => {
      if (localStreamRef.current) {
        const tracks = localStreamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const createRoom = async (peerConnection, db) => {
    const docRef = await addDoc(collection(db, "calls"), {});
    const roomID = docRef.id;

    peerConnection.onicecandidate = async (e) => {
      if (e.candidate) {
        await setDoc(doc(db, "calls", roomID), {
          offer: JSON.stringify(peerConnection.localDescription),
        });
      }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    handleIceCandidate(peerConnection, db, roomID);
  };

  const joinRoom = async (peerConnection, db, roomID) => {
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

    handleIceCandidate(peerConnection, db, roomID);
  };

  const handleIceCandidate = (peerConnection, db, roomID) => {
    onSnapshot(doc(db, "calls", roomID), async (doc) => {
      if (doc.data().answer && !peerConnection.currentRemoteDescription) {
        await peerConnection.setRemoteDescription(
          JSON.parse(doc.data().answer)
        );
      }
    });
  };

  return (
    <div className="videoscreenUsers">
      <div className="participants">
        <div className="participant">
          <div className="card">
            <video
              className="video"
              id="caller"
              autoPlay
              playsInline
              ref={videoRef}
            ></video>
            <div className="name"> "{currentUser.displayName}"</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
