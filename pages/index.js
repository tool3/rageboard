import React, { Suspense, useRef, useState } from 'react';
import Head from 'next/head';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Model from '../components/Model';
import Overlay from '../components/Overlay';
import { Html, useProgress } from '@react-three/drei';
import { useRouter } from 'next/router';


function Loader() {
  const { progress } = useProgress();
  return (
    <Html center className="loading">
      {progress} % loaded
    </Html>
  );
}

export default function IndexPage() {
  const overlay = useRef();
  const caption = useRef();
  const scroll = useRef(0);
  const [started, setStarted] = useState();
  const router = useRouter();

  function setStart(e) {
    e.target.style.opacity = 0;
    setTimeout(() => (e.target.parentElement.style.display = 'none'), 220);
    setStarted(true);
  }

  return (
    <>
      <Head>
        <title>Tal Hayut</title>
        <meta name="description" content="web experience with next and three" />
        <meta name="author" content="Tal Hayut" />
      </Head>
      <Canvas
        shadows
        onCreated={(state) => state.events.connect(overlay.current)}
        raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}>
        <ambientLight intensity={1} />

        <Suspense fallback={<Loader />}>
          <Model router={router} scroll={scroll} started={started} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <Overlay ref={overlay} caption={caption} scroll={scroll} setStarted={setStart} />
    </>
  );
}
