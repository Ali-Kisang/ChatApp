import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

function VideoChat() {
  const { channelName } = useParams();
  const userId = Math.floor(Math.random() * 10000);

  useEffect(() => {
    const initializeAgora = async () => {
      const response = await axios.post("http://localhost:5000/agora/token", {
        channelName,
        uid: userId,
      });
      const { token } = response.data;

      await client.join(
        "65a89dbc4c00465ea2112ea7319825aa",
        channelName,
        token,
        userId
      );
      const [microphoneTrack, cameraTrack] =
        await AgoraRTC.createMicrophoneAndCameraTracks();
      await client.publish([microphoneTrack, cameraTrack]);

      cameraTrack.play("local-video");
    };

    initializeAgora();
  }, [channelName, userId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        Testing streaming App
      </h2>
      <div
        id="local-video"
        className="w-1/2 h-96 bg-black rounded-lg shadow-lg"
      ></div>
    </div>
  );
}

export default VideoChat;
