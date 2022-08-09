import React, { Suspense, useRef } from 'react';
import Head from 'next/head';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Model from '../components/Model';
import Overlay from '../components/Overlay';

export default function IndexPage() {
  const overlay = useRef();
  const caption = useRef();
  const scroll = useRef(0);
  return (
    <>
      <Head>
        <title>Tal Hayut</title>
        <meta name="description" content="web experience with next and three" />
      </Head>
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
