import { useGLTF, Html } from '@react-three/drei';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import { Color, MeshStandardMaterial } from 'three';
import Key1 from './sounds/key1.mp3';
import Key2 from './sounds/key2.mp3';
import Space from './sounds/space.mp3';
import { Howl } from 'howler';

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/models/keyboard-v3.glb');

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
      src: [Space],
      format: ['mp3'],
      preload: true
    })
  };

  Object.keys(materials).map((key) => {
    let material = materials[key];
    if (material.name === 'text') {
      material.color = new Color('white');
    }

    material.roughness = 0.2;
  });

  const [fKey, uKey, cKey, kKey, offKey, youKey, meKey, thisKey, everyhingKey] = [
    useRef(nodes.F_Key),
    useRef(nodes.U_Key),
    useRef(nodes.C_key),
    useRef(nodes.K_Key),
    useRef(nodes.Off_Key),
    useRef(nodes.You_Key),
    useRef(nodes.Me_Key),
    useRef(nodes.This_key),
    useRef(nodes.Everything_key)
  ];

  const blackKey = new MeshStandardMaterial({ ...materials.key, color: 'black' });

  async function playSound(tracks, key) {
    tracks[key].play();
  }

  const onDocumentKey = (e) => {
    const keysPressed = new Set(['KeyF', 'KeyU', 'KeyC', 'KeyK', 'KeyO', 'KeyY', 'KeyM', 'KeyT', 'Space']);
    if (e.type === 'keydown' && keysPressed.has(e.code)) {
      if (e.code === 'KeyF') fKey.current.position.set(0, -1, 0);
      if (e.code === 'KeyU') uKey.current.position.set(0, -1, 0);
      if (e.code === 'KeyC') cKey.current.position.set(0, -1, 0);
      if (e.code === 'KeyK') kKey.current.position.set(0, -1, 0);
      if (e.code === 'KeyO') offKey.current.position.set(0, -1, 0);
      if (e.code === 'KeyY') youKey.current.position.set(0, -1, 0);
      if (e.code === 'KeyM') meKey.current.position.set(0, -1, 0);
      if (e.code === 'KeyT') thisKey.current.position.set(0, -1, 0);
      if (e.code === 'Space') {
        everyhingKey.current.position.set(0, -1, 0);
        playSound(tracks, 'space');
        return;
      }
      const sounds = ['key1', 'key2'];
      playSound(tracks, sounds[Math.floor(Math.random() * sounds.length)]);
    }
    if (e.type === 'keyup' && keysPressed.has(e.code)) {
      if (e.code === 'KeyF') fKey.current.position.set(0, 0, 0);
      if (e.code === 'KeyU') uKey.current.position.set(0, 0, 0);
      if (e.code === 'KeyC') cKey.current.position.set(0, 0, 0);
      if (e.code === 'KeyK') kKey.current.position.set(0, 0, 0);
      if (e.code === 'KeyO') offKey.current.position.set(0, 0, 0);
      if (e.code === 'KeyY') youKey.current.position.set(0, 0, 0);
      if (e.code === 'KeyM') meKey.current.position.set(0, 0, 0);
      if (e.code === 'KeyT') thisKey.current.position.set(0, 0, 0);
      if (e.code === 'Space') everyhingKey.current.position.set(0, 0, 0);
    }
  };

  const onMobileKey = (key) => {
    key.current.position.set(0, -1, 0);
    if (key.current.name === 'Everything_key') {
      playSound(tracks, 'space');
    } else {
      const sounds = ['key1', 'key2'];
      playSound(tracks, sounds[Math.floor(Math.random() * sounds.length)]);
    }

    setTimeout(() => key.current.position.set(0, 0, 0), 100);
  }

  useEffect(() => {
    document.addEventListener('keydown', onDocumentKey);
    document.addEventListener('keyup', onDocumentKey);
    return () => {
      document.removeEventListener('keydown', onDocumentKey);
      document.removeEventListener('keyup', onDocumentKey);
    };
  });

  useEffect(() => {
    if (!group.current) return;
    gsap.from(group.current.rotation, {
      z: -Math.PI,
      // x: Math.PI / 2 ,
      ease: 'power3',
      repeat: 0,
      duration: 1,
      delay: 0.2
    });
    gsap.from(group.current.position, {
      y: -10,
      z: -10,
      ease: 'power2',
      repeat: 0,
      duration: 1,
      delay: 0.2
    });
  }, []);

  const dirLight = useRef(null);
  // useHelper(dirLight, DirectionalLightHelper, 1, 'red');

  return (
    <>
      <Html className="keyboard">
        <div className="keyboard-row">
          <button className="key__button" onClick={() => onMobileKey(fKey)}>f</button>
          <button onClick={() => onMobileKey(uKey)}>u</button>
          <button onClick={() => onMobileKey(cKey)}>c</button>
          <button onClick={() => onMobileKey(kKey)}>k</button>
        </div>
        <div className="keyboard-row">
          <button onClick={() => onMobileKey(offKey)}>o</button>
          <button onClick={() => onMobileKey(youKey)}>y</button>
          <button onClick={() => onMobileKey(meKey)}>m</button>
          <button onClick={() => onMobileKey(thisKey)}>t</button>
        </div>
        <div className="keyboard-row">
          <button className="space" onClick={() => onMobileKey(everyhingKey)}>[ ]</button>
        </div>
      </Html>
      <group ref={group} {...props} dispose={null} rotation={[-5, 0.4, 4.3]}>
        <directionalLight ref={dirLight} intensity={1} position={[-10, 20, 4]} />
        <pointLight intensity={1} position={[0, 0, -10]} color={'red'} />
        <pointLight intensity={1} position={[-20, -20, 10]} color={'red'} />

        <group name="Scene">
          <mesh
            name="Cube"
            castShadow
            receiveShadow
            geometry={nodes.Cube.geometry}
            material={materials.base}
            position={[-0.03, -3.15, 0.05]}
          />
          <mesh
            name="Cube001"
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={materials.bottom_base}
            position={[-0.03, -4.21, 0.05]}
          />
          <mesh
            name="This_key"
            // onPointerDown={() => onDocumentKey({ code: 'KeyT', type: 'keydown' })}
            // onPointerUp={() => onDocumentKey({ code: 'KeyT', type: 'keyup' })}
            // onPointerLeave={() => onDocumentKey({ code: 'KeyT', type: 'keyup' })}
            castShadow
            receiveShadow
            geometry={thisKey.current.geometry}
            ref={thisKey}
            material={materials.key_orange}>
            <mesh
              name="Text"
              castShadow
              receiveShadow
              geometry={nodes.Text.geometry}
              material={materials.text}
              position={[0, 4.44, 0]}
            />
          </mesh>
          <mesh
            name="Me_Key"
            // onPointerDown={() => onDocumentKey({ code: 'KeyM', type: 'keydown' })}
            // onPointerUp={() => onDocumentKey({ code: 'KeyM', type: 'keyup' })}
            // onPointerLeave={() => onDocumentKey({ code: 'KeyM', type: 'keyup' })}
            castShadow
            receiveShadow
            geometry={meKey.current.geometry}
            ref={meKey}
            material={materials.key_orange}>
            <mesh
              name="Text001"
              castShadow
              receiveShadow
              geometry={nodes.Text001.geometry}
              material={materials.text}
              position={[0, 4.44, 0]}
            />
          </mesh>
          <mesh
            name="You_Key"
            // onPointerDown={() => onDocumentKey({ code: 'KeyY', type: 'keydown' })}
            // onPointerUp={() => onDocumentKey({ code: 'KeyY', type: 'keyup' })}
            // onPointerLeave={() => onDocumentKey({ code: 'KeyY', type: 'keyup' })}
            castShadow
            receiveShadow
            geometry={youKey.current.geometry}
            ref={youKey}
            material={materials.key_orange}>
            <mesh
              name="Text002"
              castShadow
              receiveShadow
              geometry={nodes.Text002.geometry}
              material={materials.text}
              position={[0, 4.44, 0]}
            />
          </mesh>
          <mesh
            name="Everything_key"
            // onPointerDown={() => onDocumentKey({ code: 'Space', type: 'keydown' })}
            // onPointerUp={() => onDocumentKey({ code: 'Space', type: 'keyup' })}
            // onPointerLeave={() => onDocumentKey({ code: 'Space', type: 'keyup' })}
            castShadow
            receiveShadow
            geometry={everyhingKey.current.geometry}
            ref={everyhingKey}
            material={materials.key_red}>
            <mesh
              name="Text003"
              castShadow
              receiveShadow
              geometry={nodes.Text003.geometry}
              material={materials.text}
              position={[0, 4.44, 0]}
            />
          </mesh>
          <mesh
            name="Off_Key"
            // onPointerDown={() => onDocumentKey({ code: 'KeyO', type: 'keydown' })}
            // onPointerUp={() => onDocumentKey({ code: 'KeyO', type: 'keyup' })}
            // onPointerLeave={() => onDocumentKey({ code: 'KeyO', type: 'keyup' })}
            castShadow
            receiveShadow
            geometry={offKey.current.geometry}
            ref={offKey}
            material={materials.key_orange}>
            <mesh
              name="Text004"
              castShadow
              receiveShadow
              geometry={nodes.Text004.geometry}
              material={materials.text}
              position={[0, 4.44, 0]}
            />
          </mesh>
          <mesh
            name="K_Key"
            // onPointerDown={() => onDocumentKey({ code: 'KeyK', type: 'keydown' })}
            // onPointerUp={() => onDocumentKey({ code: 'KeyK', type: 'keyup' })}
            // onPointerLeave={() => onDocumentKey({ code: 'KeyK', type: 'keyup' })}
            castShadow
            receiveShadow
            geometry={kKey.current.geometry}
            ref={kKey}
            material={materials.key}>
            <mesh
              name="Text005"
              castShadow
              receiveShadow
              geometry={nodes.Text005.geometry}
              material={blackKey}
              position={[0, 4.44, 0]}
            />
          </mesh>
          <mesh
            name="C_key"
            // onPointerDown={() => onDocumentKey({ code: 'KeyC', type: 'keydown' })}
            // onPointerUp={() => onDocumentKey({ code: 'KeyC', type: 'keyup' })}
            // onPointerLeave={() => onDocumentKey({ code: 'KeyC', type: 'keyup' })}
            castShadow
            receiveShadow
            geometry={cKey.current.geometry}
            ref={cKey}
            material={materials.key}>
            <mesh
              name="Text006"
              castShadow
              receiveShadow
              geometry={nodes.Text006.geometry}
              material={blackKey}
              position={[0, 4.44, 0]}
            />
          </mesh>
          <mesh
            name="U_Key"
            // onPointerDown={() => onDocumentKey({ code: 'KeyU', type: 'keydown' })}
            // onPointerUp={() => onDocumentKey({ code: 'KeyU', type: 'keyup' })}
            // onPointerLeave={() => onDocumentKey({ code: 'KeyU', type: 'keyup' })}
            castShadow
            receiveShadow
            geometry={uKey.current.geometry}
            ref={uKey}
            material={materials.key}>
            <mesh
              name="Text007"
              castShadow
              receiveShadow
              geometry={nodes.Text007.geometry}
              material={blackKey}
              position={[0, 4.44, 0]}
            />
          </mesh>
          <mesh
            name="F_Key"
            // onPointerDown={() => onDocumentKey({ code: 'KeyF', type: 'keydown' })}
            // onPointerUp={() => onDocumentKey({ code: 'KeyF', type: 'keyup' })}
            // onPointerLeave={() => onDocumentKey({ code: 'KeyF', type: 'keyup' })}
            castShadow
            receiveShadow
            geometry={fKey.current.geometry}
            ref={fKey}
            material={materials.key}>
            <mesh
              name="Text008"
              castShadow
              receiveShadow
              geometry={nodes.Text008.geometry}
              material={blackKey}
              position={[0, 4.44, 0]}
            />
          </mesh>
        </group>
      </group>
    </>
  );
}

useGLTF.preload('/models/keyboard-v3.glb');
