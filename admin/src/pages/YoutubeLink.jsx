import React from 'react';

const YouTubeLink = ({ videoId }) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div>
      <p>Check out this YouTube video:</p>
      <a href={videoUrl} target="_blank" rel="noopener noreferrer">
        Open Video
      </a>
    </div>
  );
};

export default YouTubeLink;
