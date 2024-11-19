import { Environment, Html, OrbitControls, Stats, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';
import Head from 'next/head';
import React, { Suspense, useRef, useState } from 'react';
import Debug from '../components/Debug';
import Keyboard from '../components/Keyboard';
import MobileKeyboard from '../components/MobileKeyboard';
import Tile from '../components/Tile';
import Script from 'next/script';
import Credits from '../components/Credit';
import { Perf } from 'r3f-perf';

function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="title">RAGE BOARD</div>
      <div className="loading">{progress.toFixed(2)} % loaded</div>
    </Html>
  );
}

function FPS({ fps }) {
  return fps ? <Stats className="stats" /> : null
}

export default function IndexPage() {
  const [active, setActive] = useState(false);

  const sound = useRef(true);
  const [backlit, setBacklit] = useState(false);

  const { fps, perf, background, theme } = useControls({
    fps: { value: false, color: 'red' },
    perf: false,
    background: '#655b5b',
    theme: {
      value: 'default',
      options: {
        default: 'default',
        uniform: 'uniform',
        metal: 'metal',
        hack: 'hack',
        kawaii: 'kawaii',
        blackops: 'blackops',
      },
    }
  });

  const bloom = useControls('bloom', {
    enabled: true,
    intensity: 1,
    luminanceThreshold: 0.5,
    luminanceSmoothing: 0.9,
  }, { collapsed: true, order: 1 })

  const vignette = useControls('vignette', {
    enabled: true,
  }, { collapsed: true, order: 2 })

  return (
    <>
      <Head>
        <title>Rage Board</title>
        <meta name="description" content="rage keyboard made with threejs and blender" />
        <meta name="author" content="Tal Hayut" />
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/favicon.ico" sizes="any" />

        <Script
          async
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=G-50Y8D0TG3M`}
          strategy="lazyOnload"
        />
        <Script async defer id="google-analytics" strategy="lazyOnload">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-50Y8D0TG3M');
        `}
        </Script>
      </Head>


      <Leva hidden={!active} />
      <FPS fps={fps} />
      <Debug active={active} setActive={setActive} />
      <Credits />

      <Tile backslit={backlit} setBacklit={setBacklit} sound={sound} />

      <Suspense fallback={null}>
        <MobileKeyboard backlit={backlit} theme={theme} />
      </Suspense>

      <Canvas
        orthographic
        camera={{ frustumCulled: true, fov: 50, position: [20, -5, -20], zoom: 25, }}>

        <Suspense fallback={<Loader />}>
          <color attach="background" args={[background]} />

          {perf ? <Perf align="top-right" /> : null}

          <Keyboard sound={sound} backlit={backlit} theme={theme} />
          <Environment files="./textures/puresky.hdr" resolution={1024} />
        </Suspense>
        <OrbitControls minZoom={10} maxZoom={100} target={[0, 0, 0]} />

        <EffectComposer>
          {bloom.enabled ? <Bloom intensity={bloom.intensity} luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} /> : null}
          {vignette.enabled ? <Vignette eskil offset={0} darkness={0.8} /> : null}
        </EffectComposer>
      </Canvas>
    </>
  );
}
