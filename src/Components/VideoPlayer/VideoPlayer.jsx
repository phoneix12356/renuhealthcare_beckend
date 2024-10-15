import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, onVideoEnd, playerRef }) => {
  return (
    <ReactPlayer
      ref={playerRef}
      url={videoUrl}
      controls={true}
      onEnded={onVideoEnd}
      config={{
        youtube: { playerVars: { rel: 0 } },
      }}
    />
  );
};

export default VideoPlayer;
