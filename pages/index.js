import React, { Suspense, useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import { Canvas } from '@react-three/fiber';
import { Environment, Sparkles } from '@react-three/drei';
import Model from '../components/Model';
import Overlay from '../components/Overlay';
import { Html, useProgress } from '@react-three/drei';
import { useRouter } from 'next/router';
import Particles from '../components/Particles';

function Loader() {
  const { progress } = useProgress();
  useEffect(() => {}, [progress]);
  return (
    <Html center className="loading">
      {progress.toFixed(2)} % loaded
    </Html>
  );
}

function GlowingParticles({ size, random, amount, ...props }) {
  const sizes = React.useMemo(() => {
    return new Float32Array(Array.from({ length: amount }, () => Math.random() * size));
  }, [size, amount]);

  return <Sparkles {...props} size={random ? sizes : size} color="orange" count={amount} />;
}

export default function IndexPage() {
  const overlay = useRef();
  const caption = useRef();
  const scroll = useRef(0);
  const [started, setStarted] = useState();
  const router = useRouter();

  async function slowScrollY(scroll) {
    for (let i = 0; i < scroll; i += 500) {
      document.querySelector('.scroll').scroll(0, i);
    }
  }

  function setStart(e) {
    e.target.style.opacity = 0;
    setTimeout(() => {
      e.target.parentElement.style.display = 'none';
    }, 220);
    setStarted(true);
  }

  useEffect(() => {
    const mobile = window.innerWidth <= 600;
    const onHashChangeStart = (url) => {
      const paths = {
        music: { path: '/#music', value: mobile ? 6000 : 6500, selector: '.music' },
        motto: { path: '/#motto', value: mobile ? 4000 : 4500, selector: '.rock' },
        vr: { path: '/#vr', value: mobile ? 7500 : 8000, selector: '.vr' },
        '3d': { path: '/#3d', value: mobile ? 9500 : 10500, selector: '.ddd' },
        code: { path: '/#code', value: mobile ? 11000 : 13000, selector: '.code' },
        links: { path: '/#links', value: 16000, selector: '.links' }
      };

      const keys = Object.keys(paths);
      for (const key of keys) {
        const pathObject = paths[key];
        if (url === pathObject.path) {
          slowScrollY(pathObject.value);
        }
      }
    };

    if (router?.events) {
      router.events.on('hashChangeStart', onHashChangeStart);

      return () => {
        router.events.off('hashChangeStart', onHashChangeStart);
      };
    }
  }, [router.events]);

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
          <Particles color={0xff00ff} />
          <Particles color={0x00ffff} />
          {/* <GlowingParticles random={false} amount={100} size={0.1} position={[1, 2, 10]} /> */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <Overlay
        ref={overlay}
        router={router}
        caption={caption}
        scroll={scroll}
        started={started}
        setStarted={setStart}
      />
    </>
  );
}
