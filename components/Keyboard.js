import { Plane, Text, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { Howl } from 'howler';
import { useControls } from 'leva';
import React, { useEffect, useRef } from 'react';
import { Color, FrontSide, MeshStandardMaterial } from 'three';
import Key1 from '../components/sounds/key1.mp3';
import Key2 from '../components/sounds/key2.mp3';
import SpaceSound from '../components/sounds/space.mp3';
import Coin from '../components/sounds/coin.mp3';
import Complete from '../components/sounds/complete.mp3';
import Victory from '../components/sounds/victory.mp3';

const baseMaterial = new MeshStandardMaterial();

const Model = (props) => {
  const { onDocumentKey, nodes, materials, keys, theme, backlit, group } = props;
  const [Key_F, Key_U, Key_C, Key_K, Key_O, Key_Y, Key_M, Key_T, Space] = keys;

  const getMaterial = (props) => {
    const { color, emissive, emissiveIntensity, roughness, metalness } = props || {};
    const newMaterial = baseMaterial.clone();

    if (color !== undefined) newMaterial.color = new Color(color);
    if (emissive !== undefined) newMaterial.emissive = new Color(emissive);
    if (emissiveIntensity !== undefined) newMaterial.emissiveIntensity = emissiveIntensity;
    if (roughness !== undefined) newMaterial.roughness = roughness;
    if (metalness !== undefined) newMaterial.metalness = metalness;

    return newMaterial;
  }

  const themes = {
    default: {
      backlit: { color: 'white', emissive: 'white', emissiveIntensity: 2 },
      text: getMaterial({ color: 'black' }),
      invertText: getMaterial({ color: 'white' }),
      bottom_base: materials.bottom_base,
      base: materials.base,
      key: materials.key,
      key_orange: materials.key_orange,
      key_red: new MeshStandardMaterial({ ...materials.key_red }),
    },
    uniform: {
      backlit: { color: 'white', emissive: 'white', emissiveIntensity: 2 },
      text: getMaterial({ color: 'black' }),
      invertText: getMaterial({ color: 'black' }),
      bottom_base: materials.bottom_base,
      base: materials.base,
      key: getMaterial(),
      key_orange: getMaterial(),
      key_red: getMaterial(),
    },
    metal: {
      backlit: { color: '#8B0000', emissive: '#8B0000', emissiveIntensity: 2 },
      text: getMaterial(),
      invertText: getMaterial({ color: 'white' }),
      bottom_base: getMaterial({ color: '#1e1e1e', metalness: 1, roughness: 0 }),
      base: getMaterial({ color: materials.base.color, metalness: 1, roughness: 0 }),
      key: getMaterial({ color: 'brown', metalness: 1, roughness: 0 }),
      key_orange: getMaterial({ color: 'brown', metalness: 1, roughness: 0 }),
      key_red: getMaterial({ color: 'orangered', metalness: 1, roughness: 0 }),
    },
    hack: {
      backlit: { color: '#66FF00', emissive: '#66FF00', emissiveIntensity: 2 },
      text: getMaterial({ color: '#66FF00' }),
      invertText: getMaterial({ color: '#66FF00' }),
      bottom_base: getMaterial({ metalness: 1, roughness: 0, color: '#1e1e1e' }),
      base: getMaterial({ metalness: 1, roughness: 0, color: '#00040d' }),
      key: getMaterial({ metalness: 1, roughness: 0, color: '#4d4f56', }),
      key_orange: getMaterial({ metalness: 1, roughness: 0, color: '#33363d', }),
      key_red: getMaterial({ metalness: 1, roughness: 0, color: '#1a1d25' }),
    },
    kawaii: {
      backlit: { color: 'blue', emissive: 'hotpink', emissiveIntensity: 2 },
      text: getMaterial({ color: 'black' }),
      invertText: getMaterial({ color: 'black' }),
      bottom_base: getMaterial({ color: '#F2BFCA' }),
      base: getMaterial({ color: '#D68D96' }),
      key: getMaterial({ color: '#D9A1C8' }),
      key_orange: getMaterial({ color: 'white' }),
      key_red: getMaterial({ color: 'violet' }),
    },
    blackops: {
      backlit: { color: 'orangered', emissive: '#ec6f00', emissiveIntensity: 2 },
      text: getMaterial({ color: '#EC6F00', emissive: '#EC6F00', emissiveIntensity: 2 }),
      invertText: getMaterial({ color: '#ec6f00', emissive: '#ec6f00', emissiveIntensity: 2 }),
      bottom_base: getMaterial({ metalness: 1, roughness: 0, color: '#1e1e1e' }),
      base: getMaterial({ color: '#1e1e1e', metalness: 1, roughness: 0 }),
      key: getMaterial({ metalness: 1, roughness: 0, color: '#1a1d25', }),
      key_orange: getMaterial({ color: '#1a1d25', metalness: 1, roughness: 0 }),
      key_red: getMaterial({ metalness: 1, roughness: 0, color: '#1a1d25' }),
    }
  }


  useEffect(() => {
    addEventListener('keydown', onDocumentKey);
    addEventListener('keyup', onDocumentKey);
    return () => {
      removeEventListener('keydown', onDocumentKey);
      removeEventListener('keyup', onDocumentKey);
    };
  }, []);

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

  return (keys.length && keys.every(k => k.current !== undefined)) ? (
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
            {theme !== 'default' ? (
              <>
                <Text fontSize={0.1} color={'lightgray'} rotation={[Math.PI / 2, 0, Math.PI]} position={[0, 0.27, 0]}>4432</Text>

                <Text fontSize={0.1} color={'lightgray'} rotation={[0, -Math.PI / 2, 0]} position={[-7.52, 1, 0]}>1234 6+7</Text>
                <Text fontSize={0.1} color={'lightgray'} rotation={[0, Math.PI / 2, 0]} position={[7.45, 1, 0]}>9556</Text>

                <Text fontSize={0.1} color={'lightgray'} rotation={[0, 0, 0]} position={[0, 1, 6.05]}>7x13</Text>
                <Text fontSize={0.1} color={'lightgray'} rotation={[Math.PI, 0, Math.PI]} position={[0, 1, -5.93]}>placeholder</Text>
              </>
            ) : null}
            {backlit ? <Plane rotation={[Math.PI / 2, Math.PI, 0]} position={[-0.06, 2.52, 0.1]} material={new MeshStandardMaterial({ ...themes[theme].backlit })} args={[13.3, 10.2]} /> : null}
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
              position={[0, 4.4555, 0]}
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
              position={[0, 4.4555, 0]}
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
              position={[0, 4.4555, 0]}
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
              position={[0, 4.4555, 0]}
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
              position={[0, 4.4555, 0]}
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
              position={[0, 4.4555, 0]}
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
              position={[0, 4.4555, 0]}
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
              position={[0, 4.4555, 0]}
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
              position={[0, 4.4555, 0]}
            />
          </mesh>
        </group>
      </group>
    </>
  ) : null;
}

export default function Keyboard(props) {
  const { theme, backlit, sound } = props;
  const { nodes, materials } = useGLTF('/models/keyboard-v3.glb');
  const group = useRef();

  const word = { value: useRef(), completed: false }
  const me = { value: useRef(), completed: false }
  const bye = { value: useRef(), completed: false }

  const keyMap = {};

  useEffect(() => {
    dispatchEvent(new Event('rendered'));
    document.addEventListener('touchstart', onDocumentKey);
    document.addEventListener('touchend', onDocumentKey);
    return () => {
      document.removeEventListener('touchstart', onDocumentKey);
      document.removeEventListener('touchend', onDocumentKey);
    };
  }, []);

  const keys = [
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
  };

  function wiggle() {
    gsap.to(group.current.rotation, {
      z: 4.08,
      ease: 'power3',
      repeat: 5,
      delay: 0,
      yoyo: true,
      duration: 0.04
    });
  }

  async function playSound(tracks, key) {
    if (sound.current) {
      tracks[key].play();
    }
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
    })
  }

  const getCurrentChar = (e) => {
    return e.code ? e.code.replace('Key', '').toLowerCase() : e.target?.innerText?.toLowerCase();
  }

  const wordEgg = (ref, currentChar) => {
    const word = ref.value;
    word.current = word.current ? word.current + currentChar : currentChar;

    if (word.current === 'fuck') {
      playSound(tracks, 'coin');
    }

    if ((word.current === 'fuckym' || word.current === 'fuckmy') && (keyMap['y'] && keyMap['m'])) {
      playSound(tracks, 'complete');
      wiggle();
      ref.completed = true;
    }

    if (word.current?.length > 6) {
      word.current = '';
    }
  }

  const byeEgg = (ref, currentChar) => {
    const bye = ref.value;

    if (bye.current?.length > 4 || ref.completed) {
      bye.current = '';
      return;
    }

    bye.current = bye.current ? bye.current + currentChar : currentChar;

    if (bye.current === 'kk') {
      playSound(tracks, 'coin');
    }

    if (bye.current === 'kkcu') {
      playSound(tracks, 'complete');
      wiggle()
      ref.completed = true;
    }
  }

  const meEgg = (ref, currentChar) => {
    const me = ref.value;
    if (currentChar === 'm') {
      me.current = me.current ? me.current + 1 : 1;

      if (me.current === 3) {
        playSound(tracks, 'coin');
      }

      if (me.current === 13) {
        playSound(tracks, 'complete');
        wiggle();
        ref.completed = true;
      }
    } else {
      me.current = 0;
    }
  }

  const easterEgg = (e, egg, ref) => {
    const currentChar = getCurrentChar(e);

    if (e.type === 'keydown' || e.type === 'touchstart' && !ref.completed) {
      keyMap[currentChar] = true;
      egg(ref, currentChar);
    } else {
      keyMap[currentChar] = false;
    }
  }

  const onDocumentKey = (e) => {
    if (e.repeat) { return }

    const chars = ['f', 'u', 'c', 'k', 'o', 'y', 'm', 't', 'space'];

    const keysPressed = new Set(keys.map(k => k.current.name));
    const validChars = new Set(chars);

    const validPress = (key) => keysPressed.has(key) || validChars.has(key);

    const isSpace = e.code === 'Space' || e.target?.innerText === 'space';
    const isValidStart = e.type === 'keydown' || e.type === 'touchstart';
    const isValidEnd = e.type === 'keyup' || e.type === 'touchend';

    const prop = (e.type === 'keydown' || e.type === 'keyup') ? getSplitKey(e, isSpace) : (e.type === 'mobile-key-press' ? e.key : e.target.innerText);

    easterEgg(e, wordEgg, word);
    easterEgg(e, byeEgg, bye);
    easterEgg(e, meEgg, me);

    if (isValidStart && validPress(prop)) {
      if (isSpace) {
        playSound(tracks, 'space');
      } else {
        const sounds = ['key1', 'key2'];
        playSound(tracks, sounds[Math.floor(Math.random() * sounds.length)]);
      }

      const key = getKeyPress(keys, prop);
      if (key) key.current.position.set(0, -1, 0);
    }

    if (isValidEnd && validPress(prop)) {
      const key = getKeyPress(keys, prop);
      if (key) key.current.position.set(0, 0, 0);
    }
  };

  Object.keys(materials).map((key) => {
    let material = materials[key];
    material.side = FrontSide;

    if (material.name === 'text') {
      material.color = new Color('white');
    }

    material.roughness = 0.2;

  });

  for (const node in nodes) {
    nodes[node].castShadow = true;
    nodes[node].receiveShadow = true;
  }

  return <Model backlit={backlit} group={group} theme={theme} onDocumentKey={onDocumentKey} nodes={nodes} materials={materials} keys={keys} />

}

useGLTF.preload('/models/keyboard-v3.glb');
