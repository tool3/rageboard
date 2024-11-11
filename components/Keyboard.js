import { useGLTF, Html, Text } from '@react-three/drei';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import { Color, MeshPhongMaterial, MeshStandardMaterial } from 'three';
import Key1 from './sounds/key1.mp3';
import Key2 from './sounds/key2.mp3';
import SpaceSound from './sounds/space.mp3';
import { Howl } from 'howler';

const Layover = (props) => {
  const { onDocumentKey, keyboard } = props;
  return keyboard ? (
    <Html className="keyboard" pointerEvents='none'>
      <div className="keyboard-row">
        <button onTouchEnd={onDocumentKey} onTouchStart={onDocumentKey}>f</button>
        <button onTouchEnd={onDocumentKey} onTouchStart={onDocumentKey}>u</button>
        <button onTouchEnd={onDocumentKey} onTouchStart={onDocumentKey}>c</button>
        <button onTouchEnd={onDocumentKey} onTouchStart={onDocumentKey}>k</button>
      </div>
      <div className="keyboard-row">
        <button onTouchEnd={onDocumentKey} onTouchStart={onDocumentKey}>o</button>
        <button onTouchEnd={onDocumentKey} onTouchStart={onDocumentKey}>y</button>
        <button onTouchEnd={onDocumentKey} onTouchStart={onDocumentKey}>m</button>
        <button onTouchEnd={onDocumentKey} onTouchStart={onDocumentKey}>t</button>
      </div>

      <div className="keyboard-row">
        <button className="space" onTouchEnd={onDocumentKey} onTouchStart={onDocumentKey}>space</button>
      </div>
    </Html>
  ) : null;
}

const Model = (props) => {
  const { onDocumentKey, nodes, materials, keys, theme } = props;
  const [Key_F, Key_U, Key_C, Key_K, Key_O, Key_Y, Key_M, Key_T, Space] = keys;
  const group = useRef();

  const themes = {
    default: {
      text: new MeshStandardMaterial({ ...materials.key, color: 'black' }),
      invertText: new MeshStandardMaterial({ ...materials.key, color: 'white' }),
      bottom_base: materials.bottom_base,
      base: materials.base,
      key: materials.key,
      key_orange: materials.key_orange,
      key_red: materials.key_red,
    },
    metal: {
      text: new MeshStandardMaterial({ ...materials.text }),
      invertText: new MeshStandardMaterial({ ...materials.key, color: 'white' }),
      bottom_base: new MeshStandardMaterial({ ...materials.bottom_base, metalness: 1, roughness: 0 }),
      base: new MeshStandardMaterial({ ...materials.base, metalness: 1, roughness: 0 }),
      key: new MeshStandardMaterial({ ...materials.key, metalness: 1, roughness: 0 }),
      key_orange: new MeshStandardMaterial({ ...materials.key_orange, metalness: 1, roughness: 0 }),
      key_red: new MeshStandardMaterial({ ...materials.key_red, metalness: 1, roughness: 0 }),
    },
    wood: {
      text: new MeshStandardMaterial({ ...materials.key, color: 'black' }),
      invertText: new MeshStandardMaterial({ ...materials.key, color: 'white' }),
      bottom_base: materials.bottom_base,
      base: materials.base,
      key: materials.key,
      key_orange: materials.key_orange,
      key_red: materials.key_red,
    },
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

  return (
    <>
      <group ref={group} {...props} dispose={null} rotation={[-5, 0.4, 4.3]}>
        <directionalLight ref={dirLight} intensity={1} position={[-10, 20, 4]} />
        <pointLight intensity={1} position={[0, 0, -10]} color={'red'} />
        <pointLight intensity={1} position={[-20, -20, 10]} color={'red'} />

        <group name="Scene">
          <group>
            <mesh
              name="Cube"
              castShadow
              receiveShadow
              geometry={nodes.Cube.geometry}
              material={themes[theme].base}
              position={[-0.03, -3.15, 0.05]}
            />
            <Text fontSize={0.1} rotation={[Math.PI / 2, 0, Math.PI]} position={[0, 0.25, 0]}>Nothing to see here but I am glad you are exploring</Text>
          </group>
          <mesh
            name="Cube001"
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={themes[theme].bottom_base}
            position={[-0.03, -4.21, 0.05]}
          />
          <mesh
            name="Key_T"
            castShadow
            receiveShadow
            geometry={Key_T.current.geometry}
            ref={Key_T}
            material={themes[theme].key_orange}>
            <mesh
              name="Text"
              castShadow
              receiveShadow
              geometry={nodes.Text.geometry}
              material={themes[theme].invertText}
              position={[0, 4.45, 0]}
            />
          </mesh>
          <mesh
            name="Key_M"
            castShadow
            receiveShadow
            geometry={Key_M.current.geometry}
            ref={Key_M}
            material={themes[theme].key_orange}>
            <mesh
              name="Text001"
              castShadow
              receiveShadow
              geometry={nodes.Text001.geometry}
              material={themes[theme].invertText}
              position={[0, 4.45, 0]}
            />
          </mesh>
          <mesh
            name="Key_Y"
            castShadow
            receiveShadow
            geometry={Key_Y.current.geometry}
            ref={Key_Y}
            material={themes[theme].key_orange}>
            <mesh
              name="Text002"
              castShadow
              receiveShadow
              geometry={nodes.Text002.geometry}
              material={themes[theme].invertText}
              position={[0, 4.45, 0]}
            />
          </mesh>
          <mesh
            name="Space"
            castShadow
            receiveShadow
            geometry={Space.current.geometry}
            ref={Space}
            material={themes[theme].key_red}>
            <mesh
              name="Text003"
              castShadow
              receiveShadow
              geometry={nodes.Text003.geometry}
              material={themes[theme].invertText}
              position={[0, 4.45, 0]}
            />
          </mesh>
          <mesh
            name="Key_O"
            castShadow
            receiveShadow
            geometry={Key_O.current.geometry}
            ref={Key_O}
            material={themes[theme].key_orange}>
            <mesh
              name="Text004"
              castShadow
              receiveShadow
              geometry={nodes.Text004.geometry}
              material={themes[theme].invertText}
              position={[0, 4.45, 0]}
            />
          </mesh>
          <mesh
            name="Key_K"
            castShadow
            receiveShadow
            geometry={Key_K.current.geometry}
            ref={Key_K}
            material={themes[theme].key}>
            <mesh
              name="Text005"
              castShadow
              receiveShadow
              geometry={nodes.Text005.geometry}
              material={themes[theme].text}
              position={[0, 4.45, 0]}
            />
          </mesh>
          <mesh
            name="Key_C"
            castShadow
            receiveShadow
            geometry={Key_C.current.geometry}
            ref={Key_C}
            material={themes[theme].key}>
            <mesh
              name="Text006"
              castShadow
              receiveShadow
              geometry={nodes.Text006.geometry}
              material={themes[theme].text}
              position={[0, 4.45, 0]}
            />
          </mesh>
          <mesh
            name="Key_U"
            castShadow
            receiveShadow
            geometry={Key_U.current.geometry}
            ref={Key_U}
            material={themes[theme].key}>
            <mesh
              name="Text007"
              castShadow
              receiveShadow
              geometry={nodes.Text007.geometry}
              material={themes[theme].text}
              position={[0, 4.45, 0]}
            />
          </mesh>
          <mesh
            name="Key_F"
            castShadow
            receiveShadow
            geometry={Key_F.current.geometry}
            ref={Key_F}
            material={themes[theme].key}>
            <mesh
              name="Text008"
              castShadow
              receiveShadow
              geometry={nodes.Text008.geometry}
              material={themes[theme].text}
              position={[0, 4.45, 0]}
            />
          </mesh>
        </group>
      </group>
    </>
  );

}

export default function Keyboard(props) {
  const { keyboard, theme } = props;
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
      src: [SpaceSound],
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

  const [Key_F, Key_U, Key_C, Key_K, Key_O, Key_Y, Key_M, Key_T, Space] = [
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
  const keys = [Key_F, Key_U, Key_C, Key_K, Key_O, Key_Y, Key_M, Key_T, Space];

  async function playSound(tracks, key) {
    tracks[key].play();
  }

  const getSplitKey = (e, isSpace) => {
    const part = e.code.split('Key');
    const code = isSpace ? 'Space' : `Key_${part[1]}`
    return code;
  }


  const getKeyPress = (keys, prop) => {
    return keys.find(k => {
      const [, char] = k.current.name === 'Space' ? [, 'space'] : k.current.name.split('_');
      return k.current.name === prop || char.toLowerCase() === prop.toLowerCase();
    });
  }

  const onDocumentKey = (e) => {
    if (e.repeat) { return }
    const chars = ['f', 'u', 'c', 'k', 'o', 'y', 'm', 't', 'space'];

    const keysPressed = new Set(keys.map(k => k.current.name));
    const validChars = new Set(chars);

    const validPress = (key) => keysPressed.has(key) || validChars.has(key);

    const isSpace = e.code === 'Space' || e.currentTarget?.innerText === 'space';
    const isValidStart = e.type === 'keydown' || e.type === 'touchstart';
    const isValidEnd = e.type === 'keyup' || e.type === 'touchend';

    const prop = (e.type === 'keydown' || e.type === 'keyup') ? getSplitKey(e, isSpace) : e.target.innerText;

    if (isValidStart && validPress(prop)) {
      if (isSpace) {
        playSound(tracks, 'space');
      } else {
        const sounds = ['key1', 'key2'];
        playSound(tracks, sounds[Math.floor(Math.random() * sounds.length)]);
      }

      const key = getKeyPress(keys, prop);
      key.current.position.set(0, -1, 0);
    }

    if (isValidEnd && validPress(prop)) {
      const key = getKeyPress(keys, prop);
      key.current.position.set(0, 0, 0);
    }
  };


  // useHelper(dirLight, DirectionalLightHelper, 1, 'red');


  return (
    <>
      <Layover onDocumentKey={onDocumentKey} keyboard={keyboard} />
      <Model theme={theme} onDocumentKey={onDocumentKey} nodes={nodes} materials={materials} keys={keys} />
    </>
  )
}

useGLTF.preload('/models/keyboard-v3.glb');
