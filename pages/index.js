import { Environment, Html, OrbitControls, Sparkles, Stats, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import Head from 'next/head';
import React, { Suspense } from 'react';
import Keyboard from '../components/Keyboard';

function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="title">RAGE BOARD</div>
      <div className="loading">{progress.toFixed(2)} % loaded</div>
    </Html>
  );
}

function GlowingParticles({ size = 100, random, amount = 1000, ...props }) {
  const sizes = React.useMemo(() => {
    return new Float32Array(Array.from({ length: amount }, () => Math.random() * size));
  }, [size, amount]);

  return <Sparkles {...props} size={random ? sizes : size} color="orange" count={amount} />;
}

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Rage Board</title>
        <meta name="description" content="rage keyboard made with threejs and blender" />
        <meta name="author" content="Tal Hayut" />
      </Head>
      <Canvas
        shadows
        orthographic
        camera={{ fov: 50, position: [20, -5, -20], zoom: 35 }}
        raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}>
        <Suspense fallback={<Loader />}>
          <color attach="background" args={['#a39d97']} />
          <Keyboard />
          <Environment files="./textures/puresky.hdr" resolution={2048} />
        </Suspense>
        <OrbitControls target={[0, 0, 0]} />

        <EffectComposer>
          <Noise opacity={0.03} />
          <DepthOfField focusDistance={0.3} focalLength={1.8} bokehScale={5} height={880} blur={100} />
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
          <Vignette eskil offset={0} darkness={0.8} />
        </EffectComposer>
        <Stats />
      </Canvas>
      <input type="text" style={{display: 'none'}}  autoFocus/>
    </>
  );
}
