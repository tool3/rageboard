import { Environment, Html, OrbitControls, Stats, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';
import Head from 'next/head';
import React, { Suspense, useState } from 'react';
import Debug from '../components/Debug';
import Keyboard from '../components/Keyboard';
import Layover from '../components/Layover';


function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="title">RAGE BOARD</div>
      <div className="loading">{progress.toFixed(2)} % loaded</div>
    </Html>
  );
}

export default function IndexPage(props) {
  const [active, setActive] = useState(false);
  const { fps, background, theme } = useControls({
    fps: false,
    background: '#a39d97',
    theme: {
      value: 'default',
      options: {
        default: 'default',
        metal: 'metal',
        hack: 'hack',
      },
    }
  });

  return (
    <>
      <Head>
        <title>Rage Board</title>
        <meta name="description" content="rage keyboard made with threejs and blender" />
        <meta name="author" content="Tal Hayut" />
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/favicon.ico" sizes="any" />
      </Head>
      <Leva hidden={!active} />
      {fps ? <Stats /> : null}
      <Debug active={active} setActive={setActive} />

      <Suspense fallback={null}>
        <Layover />
      </Suspense>

      <Canvas
        shadows
        orthographic
        camera={{ fov: 50, position: [20, -5, -20], zoom: 25 }}
        raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}>


        <Suspense fallback={<Loader />}>
          <color attach="background" args={[background]} />
          <Keyboard theme={theme} />
          <Environment files="./textures/puresky.hdr" resolution={2048} />
        </Suspense>
        <OrbitControls target={[0, 0, 0]} />

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
          <Vignette eskil offset={0} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </>
  );
}
