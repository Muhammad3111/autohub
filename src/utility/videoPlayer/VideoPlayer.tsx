import { FC } from "react";

interface YouTubePlayerProps {
  url: string;
  width: string;
  height: string;
}

const VideoPlayer: FC<YouTubePlayerProps> = ({ url, width, height }) => {
  const getVideoId = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^\s&?/]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(url);

  if (!videoId) {
    return <div>Videoni topib bo'lmadi!</div>;
  }

  return (
    <iframe
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default VideoPlayer;
