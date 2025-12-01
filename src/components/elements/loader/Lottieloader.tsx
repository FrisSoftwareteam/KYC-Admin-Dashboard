import React from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

export default function Lottieloader() {
  return (
    <div>
      <Player
        autoplay
        loop
        src={
          'https://lottie.host/203b7be4-a288-47d2-8906-6838c9ef8076/W2TZkdiEKy.json'
        }
        style={{ height: '300px', width: '500px' }}
      >
        <Controls visible={false}></Controls>
      </Player>
    </div>
  );
}
