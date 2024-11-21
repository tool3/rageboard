import { Plane, Text, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { Howl } from 'howler';
import React, { useEffect, useMemo, useRef } from 'react';
import { Color, FrontSide, MeshStandardMaterial } from 'three';
import Coin from '../components/sounds/coin.mp3';
import Complete from '../components/sounds/complete.mp3';
import Key1 from '../components/sounds/key1.mp3';
import Key2 from '../components/sounds/key2.mp3';
import SpaceSound from '../components/sounds/space.mp3';
import Victory from '../components/sounds/victory.mp3';

const MODEL = '/models/k_opt_2_c8.glb';

const Model = (props) => {
  const { updateKeyMap, onDocumentKey, nodes, materials, keys, theme, backlit, group } = props;
  const [Key_F, Key_U, Key_C, Key_K, Key_O, Key_Y, Key_M, Key_T, Space] = keys;

  const getMaterial = (baseMaterial) => (props) => {
    const { color, emissive, emissiveIntensity, roughness, metalness } = props || {};
    const newMaterial = baseMaterial.clone();

    if (color !== undefined) newMaterial.color = new Color(color);
    if (emissive !== undefined) newMaterial.emissive = new Color(emissive);
    if (emissiveIntensity !== undefined) newMaterial.emissiveIntensity = emissiveIntensity;
    if (roughness !== undefined) newMaterial.roughness = roughness;
    if (metalness !== undefined) newMaterial.metalness = metalness;

    return newMaterial;
  };

  const getTextMaterial = useMemo(() => getMaterial(materials.text), []);
  const getInvertTextMaterial = useMemo(() => getMaterial(materials.text), []);
  const getBottomBaseMaterial = useMemo(() => getMaterial(materials.bottom_base), []);
  const getBaseMaterial = useMemo(() => getMaterial(materials.base), []);
  const getKeyMaterial = useMemo(() => getMaterial(materials.key), []);
  const getKeyOrangeMaterial = useMemo(() => getMaterial(materials.key_orange), []);
  const getKeyRedMaterial = useMemo(() => getMaterial(materials.key_red), []);

  const themes = {
    default: {
      backlit: { color: 'white', emissive: 'white', emissiveIntensity: 4 },
      text: getTextMaterial({ color: 'black' }),
      invertText: materials.text,
      bottom_base: materials.bottom_base,
      base: materials.base,
      key: materials.key,
      key_orange: materials.key_orange,
      key_red: materials.key_red,
    },
    uniform: {
      backlit: { color: 'white', emissive: 'white', emissiveIntensity: 4 },
      text: getTextMaterial({ color: 'black' }),
      invertText: getInvertTextMaterial({ color: 'black' }),
      bottom_base: materials.bottom_base,
      base: materials.base,
      key: getKeyMaterial({ color: 'white' }),
      key_orange: getKeyOrangeMaterial({ color: 'white' }),
      key_red: getKeyMaterial({ color: 'white' }),
    },
    metal: {
      backlit: { color: '#8B0000', emissive: '#8B0000', emissiveIntensity: 4 },
      text: getTextMaterial(),
      invertText: getInvertTextMaterial({ color: 'white' }),
      bottom_base: getBottomBaseMaterial({ color: '#1e1e1e', metalness: 1, roughness: 0 }),
      base: getBaseMaterial({ metalness: 1, roughness: 0 }),
      key: getKeyMaterial({ color: 'brown', metalness: 1, roughness: 0 }),
      key_orange: getKeyOrangeMaterial({ color: 'brown', metalness: 1, roughness: 0 }),
      key_red: getKeyMaterial({ color: 'orangered', metalness: 1, roughness: 0 }),
    },
    hack: {
      backlit: { color: '#66FF00', emissive: '#66FF00', emissiveIntensity: 4 },
      text: getTextMaterial({ color: '#66FF00' }),
      invertText: getInvertTextMaterial({ color: '#66FF00' }),
      bottom_base: getBottomBaseMaterial({ metalness: 1, roughness: 0, color: '#1e1e1e' }),
      base: getBaseMaterial({ metalness: 1, roughness: 0, color: '#00040d' }),
      key: getKeyMaterial({ metalness: 1, roughness: 0, color: '#4d4f56', }),
      key_orange: getKeyOrangeMaterial({ metalness: 1, roughness: 0, color: '#33363d', }),
      key_red: getKeyRedMaterial({ metalness: 1, roughness: 0, color: '#1a1d25' }),
    },
    kawaii: {
      backlit: { color: 'blue', emissive: 'hotpink', emissiveIntensity: 4 },
      text: getTextMaterial({ color: 'black' }),
      invertText: getInvertTextMaterial({ color: 'black' }),
      bottom_base: getBottomBaseMaterial({ color: '#F2BFCA' }),
      base: getBaseMaterial({ color: '#D68D96' }),
      key: getKeyMaterial({ color: '#D9A1C8' }),
      key_orange: getKeyOrangeMaterial({ color: 'white' }),
      key_red: getKeyRedMaterial({ color: 'violet' }),
    },
    blackops: {
      backlit: { color: '#ec6f00', emissive: '#ec6f00', emissiveIntensity: 4 },
      text: getTextMaterial({ color: '#EC6F00', emissive: '#EC6F00', emissiveIntensity: 2 }),
      invertText: getInvertTextMaterial({ color: '#ec6f00', emissive: '#ec6f00', emissiveIntensity: 2 }),
      bottom_base: getBottomBaseMaterial({ metalness: 1, roughness: 0, color: '#1e1e1e' }),
      base: getBaseMaterial({ color: '#1e1e1e', metalness: 1, roughness: 0 }),
      key: getKeyMaterial({ metalness: 1, roughness: 0, color: '#1a1d25', }),
      key_orange: getKeyOrangeMaterial({ color: '#1a1d25', metalness: 1, roughness: 0 }),
      key_red: getKeyRedMaterial({ metalness: 1, roughness: 0, color: '#1a1d25' }),
    }
  }

  useEffect(() => {
    addEventListener('keydown', updateKeyMap);
    addEventListener('keyup', updateKeyMap);

    addEventListener('keydown', onDocumentKey);
    addEventListener('keyup', onDocumentKey);
    return () => {
      removeEventListener('keydown', updateKeyMap);
      removeEventListener('keydown', onDocumentKey);

      removeEventListener('keyup', updateKeyMap);
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
      ease: 'power3',
      repeat: 0,
      duration: 1,
      delay: 0.2
    });
  }, []);

  return (keys.length && keys.every(k => k.current !== undefined)) ? (
    <>
      <group ref={group} {...props} dispose={null} rotation={[-5, 0.4, 4.3]}>
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
                <Text fontSize={0.1} color={'lightgray'} rotation={[Math.PI, 0, Math.PI]} position={[0, 1, -5.93]}>4 1234 5+8</Text>
              </>
            ) : null}
            {backlit ? <Plane rotation={[Math.PI / 2, Math.PI, 0]} position={[-0.06, 2.53, 0.1]} material={new MeshStandardMaterial({ ...themes[theme].backlit })} args={[13.3, 10.2]} /> : null}
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
  const { nodes, materials } = useGLTF(MODEL, true);

  const group = useRef();

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

  const word = { value: useRef(), completed: false }
  const me = { value: useRef(), completed: false }
  const bye = { value: useRef(), completed: false }
  const takeoff = { value: useRef(), completed: false }
  const nomood = { value: useRef(), completed: false }

  const easterEggs = {
    even: {
      completed: false,
      midway: (value) => value.current === 'fuck',
      complete: (value) => value.current === 'fuckym' || value.current === 'fuckmy' && (keyMap['m'] && keyMap['y']),
      assign: (value, currentChar) => value.current ? value.current + currentChar : currentChar,
      reset: (value) => value.current?.length > 4 && !value.current.startsWith('fuck')
    },
    bye: {
      completed: false,
      midway: (value) => value.current === 'kk',
      complete: (value) => value.current === 'kkcu',
      assign: (value, currentChar) => ['k', 'c', 'u'].includes(currentChar) ? (value.current ? value.current + currentChar : currentChar) : '',
      reset: (value) => value.current?.length > 4
    },
    narcissist: {
      completed: false,
      midway: (value) => value.current === 3,
      complete: (value) => value.current === 13,
      assign: (value, currentChar) => currentChar === 'm' ? (value.current ? value.current + 1 : 1) : 0,
      reset: (value) => value.current?.length > 4
    },
    takeoff: {
      completed: false,
      midway: (value) => value.current === 'spaceoo',
      complete: (value) => value.current === 'spaceooy',
      assign: (value, currentChar) => value.current ? value.current + currentChar : currentChar,
      reset: (value) => value.current?.length > 8
    },
    nomood: {
      completed: false,
      midway: (value) => value.current === 'kfuck',
      complete: (value) => value.current === 'kfuckot' || value.current === 'kfuckto',
      assign: (value, currentChar) => value.current ? value.current + currentChar : currentChar,
      reset: (value) => value.current?.length > 8
    }
  }


  const easterEgg = (name, ref, currentChar) => {
    if (!ref.completed) {
      const { midway, complete, assign, reset } = easterEggs[name];
      const value = ref.value;

      value.current = assign(value, currentChar);

      if (midway(value)) {
        playSound(tracks, 'coin');
      }

      if (complete(value)) {
        playSound(tracks, 'complete');
        wiggle();
        ref.completed = true;
      }

      if (reset(value)) {
        value.current = '';
      }
    }
  }

  const updateKeyMap = (e) => {
    if (e.repeat) { return }
    const currentChar = getCurrentChar(e);
    if (e.type === 'keydown' || e.type === 'touchstart') {
      keyMap[currentChar] = true;

    } else {
      keyMap[currentChar] = false;
    }
  }

  const onDocumentKey = (e) => {
    if (e.repeat) { return }
    const currentChar = getCurrentChar(e);

    if ((e.type === 'keydown' || e.type === 'touchstart')) {
      easterEgg('even', word, currentChar);
      easterEgg('bye', bye, currentChar);
      easterEgg('narcissist', me, currentChar);
      easterEgg('takeoff', takeoff, currentChar);
      easterEgg('nomood', nomood, currentChar);
    }

    const chars = ['f', 'u', 'c', 'k', 'o', 'y', 'm', 't', 'space'];

    const keysPressed = new Set(keys.map(k => k.current.name));
    const validChars = new Set(chars);

    const validPress = (key) => keysPressed.has(key) || validChars.has(key);

    const isSpace = e.code === 'Space' || e.target?.innerText === 'space';
    const isValidStart = e.type === 'keydown' || e.type === 'touchstart';
    const isValidEnd = e.type === 'keyup' || e.type === 'touchend';

    const prop = (e.type === 'keydown' || e.type === 'keyup') ? getSplitKey(e, isSpace) : (e.type === 'mobile-key-press' ? e.key : e.target.innerText);

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

  const dirLight = useRef(null);


  return (
    <>
      <Model backlit={backlit} onDocumentKey={onDocumentKey} updateKeyMap={updateKeyMap} group={group} theme={theme} nodes={nodes} materials={materials} keys={keys} />
      <group rotation={[-5, 0.4, 4.3]}>
        <directionalLight ref={dirLight} intensity={1} position={[-10, 20, 4]} />
        <pointLight intensity={1} position={[0, 0, -10]} color={'red'} />
        <pointLight intensity={1} position={[-20, -20, 10]} color={'red'} />
      </group>

    </>
  )


}

useGLTF.preload(MODEL, true);
