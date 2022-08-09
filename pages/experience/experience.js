import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Model from './Model';
import Overlay from './Overlay';

export default function App() {
  const overlay = useRef();
  const caption = useRef();
  const scroll = useRef(0);
  return (
    <>
      <Canvas
        shadows
        onCreated={(state) => state.events.connect(overlay.current)}
        raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}>
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <Model scroll={scroll} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <Overlay ref={overlay} caption={caption} scroll={scroll} />
    </>
  );
}
