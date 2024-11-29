import { Environment, Html, OrbitControls, Stats, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Howl } from 'howler';
import { Leva, useControls } from 'leva';
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
import { Bloom, EffectComposer } from '@react-three/postprocessing';

function Loader() {
  const { progress } = useProgress();

  const style = {
    backdropFilter: 'blur(10px)',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <Html style={style} center className='overlay'>
      <div className="title-wrapper">
        <div className="title">RAGE BOARD</div>
        <div className="loading">{progress.toFixed(2)} % loaded</div>
      </div>
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
    luminanceThreshold: 1,
    luminanceSmoothing: 0.1,
  }, { collapsed: true, order: 1 })

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
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ frustumCulled: true, fov: 50, position: [20, -5, -20], zoom: 25, }}>

        <Suspense fallback={<Loader />}>
          <color attach="background" args={[background]} />

          {perf ? <Perf align="top-right" /> : null}

          <Keyboard playSound={playSound} sound={sound} backlit={backlit} theme={theme} />
          <Environment files="./textures/small_harbour_sunset_1k.hdr" resolution={340} />
        </Suspense>
        <OrbitControls minZoom={10} maxZoom={100} target={[0, 0, 0]} />

        <EffectComposer multisampling={0} stencilBuffer={true}>
          {bloom.enabled ?
            <Bloom
              intensity={bloom.intensity}
              luminanceThreshold={bloom.luminanceThreshold}
              luminanceSmoothing={bloom.luminanceSmoothing}
              height={1024} /> :
            null}
        </EffectComposer>
      </Canvas>
    </>
  );
}
