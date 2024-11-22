import { Environment, Html, OrbitControls, Stats, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';
import Head from 'next/head';
import Script from 'next/script';
import { Perf } from 'r3f-perf';
import React, { Suspense, useCallback, useRef, useState } from 'react';
import Credits from '../components/Credit';
import Debug from '../components/Debug';
import Keyboard from '../components/Keyboard';
import MobileKeyboard from '../components/MobileKeyboard';
import Cheering from '../components/sounds/cheering.mp3';
import Coin from '../components/sounds/coin.mp3';
import Complete from '../components/sounds/complete.mp3';
import Key1 from '../components/sounds/key1.mp3';
import Key2 from '../components/sounds/key2.mp3';
import SpaceSound from '../components/sounds/space.mp3';
import Victory from '../components/sounds/victory.mp3';
import Tile from '../components/Tile';
import { Howl } from 'howler';

function Loader() {
  const { progress } = useProgress();

  return (
    <Html center className='overlay'>
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
  const [sounds, setSounds] = useState(true);
  const [backlit, setBacklit] = useState(false);


  const tracks = {
    key1: new Howl({
      src: [Key1],
      format: ['mp3'],
      preload: true
    }),
    key2: new Howl({
      src: [Key2],
      format: ['mp3'],
      preload: true
    }),
    space: new Howl({
      src: [SpaceSound],
      format: ['mp3'],
      preload: true
    }),
    coin: new Howl({
      src: [Coin],
      format: ['mp3'],
      preload: true
    }),
    complete: new Howl({
      src: [Complete],
      format: ['mp3'],
      preload: true
    }),
    victory: new Howl({
      src: [Victory],
      format: ['mp3'],
      preload: true
    }),
    cheering: new Howl({
      src: [Cheering],
      format: ['mp3'],
      preload: true
    }),
  };

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
    intensity: .2,
    luminanceThreshold: 0.5,
    luminanceSmoothing: 0.9,
  }, { collapsed: true, order: 1 })

  const vignette = useControls('vignette', {
    enabled: true,
  }, { collapsed: true, order: 2 })

  const setSoundOn = useCallback(() => {
    sound.current = !sound.current;
    setSounds(!sounds);
  }, [sound.current])


  function playSound(key) {
    if (sound) {
      tracks[key].play();
    }
  }

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

      <Tile backlit={backlit} setBacklit={setBacklit} sound={sounds} setSound={setSoundOn} />

      <Suspense fallback={null}>
        <MobileKeyboard backlit={backlit} theme={theme} />
      </Suspense>

      <Canvas
        orthographic
        camera={{ frustumCulled: true, fov: 50, position: [20, -5, -20], zoom: 25, }}>

        <Suspense fallback={<Loader />}>
          <color attach="background" args={[background]} />

          {perf ? <Perf align="top-right" /> : null}

          <Keyboard playSound={playSound} sound={sound} backlit={backlit} theme={theme} />
          <Environment backgroundRotation={45} files="./textures/small_harbour_sunset_1k.hdr" resolution={340} />
        </Suspense>
        <OrbitControls minZoom={10} maxZoom={100} target={[0, 0, 0]} />


        {/* <EffectComposer autoClear> */}
          {bloom.enabled ? <Bloom intensity={bloom.intensity} luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} /> : null}
          {/* {vignette.enabled ? <Vignette eskil={false} offset={0} darkness={0.8} /> : null} */}
        {/* </EffectComposer> */}
      </Canvas>
    </>
  );
}
