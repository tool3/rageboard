import { Plane, Text, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Color, FrontSide, MeshStandardMaterial } from 'three';

const MODEL = '/models/keyboard_opt_text.glb';

const Model = (props) => {
  const { updateKeyMap, onDocumentKey, nodes, materials, keys, backlit, group, theme } = props;
  const [Key_F, Key_U, Key_C, Key_K, Key_O, Key_Y, Key_M, Key_T, Space] = keys;

  const getMaterial = (baseMaterial) => (props) => useMemo(() => {
    const { color, emissive, emissiveIntensity, roughness, metalness } = props || {};
    const newMaterial = baseMaterial.clone();

    if (color !== undefined) newMaterial.color = new Color(color);
    if (emissive !== undefined) newMaterial.emissive = new Color(emissive);
    if (emissiveIntensity !== undefined) newMaterial.emissiveIntensity = emissiveIntensity;
    if (roughness !== undefined) newMaterial.roughness = roughness;
    if (metalness !== undefined) newMaterial.metalness = metalness;

    return newMaterial;
  }, []);

  const getTextMaterial = getMaterial(materials.text);
  const getInvertTextMaterial = getMaterial(materials.text);
  const getBottomBaseMaterial = getMaterial(materials.bottom_base);
  const getBaseMaterial = getMaterial(materials.base);
  const getKeyMaterial = getMaterial(materials.key);
  const getKeyOrangeMaterial = getMaterial(materials.key_orange);
  const getKeyRedMaterial = getMaterial(materials.key_red);

  const themes = {
    default: {
      backlit: { color: 'white', emissive: 'white', emissiveIntensity: 4 },
      text: getTextMaterial({ color: 'black' }),
      invertText: getTextMaterial({ color: 'white' }),
      bottom_base: getBottomBaseMaterial({ roughness: 0.2 }),
      base: getBaseMaterial({ roughness: 0.2 }),
      key: getKeyMaterial({ roughness: 0.2 }),
      key_orange: getKeyOrangeMaterial({ roughness: 0.2 }),
      key_red: getKeyRedMaterial({ roughness: 0.2 }),
    },
    uniform: {
      backlit: { color: 'white', emissive: 'white', emissiveIntensity: 4 },
      text: getTextMaterial({ color: 'black' }),
      invertText: getInvertTextMaterial({ color: 'black' }),
      bottom_base: getBottomBaseMaterial({ side: FrontSide }),
      base: getBaseMaterial({ side: FrontSide }),
      key: getKeyMaterial({ side: FrontSide }),
      key_orange: getKeyOrangeMaterial({ color: materials.key.color, side: FrontSide }),
      key_red: getKeyMaterial({ side: FrontSide }),
    },
    metal: {
      backlit: { color: '#8B0000', emissive: '#8B0000', emissiveIntensity: 4 },
      text: getTextMaterial({ color: 'white' }),
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
      base: getBaseMaterial({ color: '#f7dce7' }),
      key: getKeyMaterial({ color: '#f7dce7' }),
      key_orange: getKeyOrangeMaterial({ color: 'white' }),
      key_red: getKeyRedMaterial({ color: '#fdc8ef' }),
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
    addEventListener('keydown', onDocumentKey);

    addEventListener('keyup', updateKeyMap);
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
      y: -30,
      z: -10,
      ease: 'power3',
      repeat: 0,
      duration: 1,
      delay: 0.2
    });
  }, []);

  return (keys.length && keys.every(k => k.current !== null)) ? (
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
              position={[-0.03, 0, 0.05]}
            />
            {theme !== 'default' ? (
              <>
                <Text fontSize={0.1} color={'lightgray'} rotation={[Math.PI / 2, 0, Math.PI]} position={[0, -2.6, 0]}>4432</Text>

                <Text fontSize={0.1} color={'lightgray'} rotation={[0, -Math.PI / 2, 0]} position={[-7.2, -1.5, 0]}>1234 6+7</Text>
                <Text fontSize={0.1} color={'lightgray'} rotation={[0, Math.PI / 2, 0]} position={[7.8, -1.5, 0]}>9556</Text>

                <Text fontSize={0.1} color={'lightgray'} rotation={[0, 0, 0]} position={[0, -2, 6.89]}>7x13</Text>
                <Text fontSize={0.1} color={'lightgray'} rotation={[Math.PI, 0, Math.PI]} position={[0, -2, -5.08]}>4 1234 5+8</Text>
              </>
            ) : null}
            {backlit ? <Plane rotation={[Math.PI / 2, Math.PI, 0]} position={[.3, -.4, 0.95]} material={new MeshStandardMaterial({ ...themes[theme].backlit })} args={[13.3, 10.2]} /> : null}
          </group>
          <mesh
            name="Cube001"
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={themes[theme].bottom_base}
            position={[0, 0, 0]}
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
              position={[0, 0, 0]}
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
              position={[0, 0, 0]}
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
              position={[0, 0, 0]}
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
              position={[0, 0, 0]}
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
              position={[0, 0, 0]}
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
              position={[0, 0, 0]}
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
              position={[0, 0, 0]}
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
              position={[0, 0, 0]}
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
              position={[0, 0, 0]}
            />
          </mesh>
        </group>
      </group>
    </>
  ) : null;
}

export default function Keyboard(props) {
  const { theme, backlit, playSound: playSounds, sound } = props;
  const { nodes, materials } = useGLTF(MODEL, true);
  const isMobile = useRef(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator?.userAgent));

  const playSound = (key) => {
    if (sound.current) {
      playSounds(key);
    }
  }

  const group = useRef();
  const keyMap = {};

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

  useEffect(() => {
    dispatchEvent(new Event('rendered'));

    addEventListener('touchstart', updateKeyMap);
    addEventListener('touchstart', onDocumentKey);
    addEventListener('touchend', updateKeyMap);
    addEventListener('touchend', onDocumentKey);

    return () => {
      removeEventListener('touchstart', updateKeyMap);
      removeEventListener('touchstart', onDocumentKey);
      removeEventListener('touchend', updateKeyMap);
      removeEventListener('touchend', onDocumentKey);
    };
  }, []);

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

  const word = { value: useRef(), completed: false };
  const me = { value: useRef(), completed: false };
  const bye = { value: useRef(), completed: false };
  const takeoff = { value: useRef(), completed: false };
  const nomood = { value: useRef(), completed: false };

  const eggRefs = [word, me, bye, takeoff, nomood];

  const easterEggs = {
    even: {
      completed: false,
      letters: new Set(['f', 'u', 'c', 'k', 'y', 'm']),
      midway: (value) => value.current === 'fuck',
      complete: (value) => value.current.startsWith('fuck') && (keyMap['m'] && keyMap['y']),
      assign: (value, currentChar) => value.current ? value.current + currentChar : currentChar,
      reset: (value) => value.current?.length > 4 && !value.current.startsWith('fuck')
    },
    bye: {
      completed: false,
      letters: new Set(['k', 'c', 'u']),
      midway: (value) => value.current === 'kk',
      complete: (value) => value.current === 'kkcu',
      assign: (value, currentChar) => value.current ? value.current + currentChar : currentChar,
      reset: (value) => value.current?.length > 4
    },
    narcissist: {
      completed: false,
      letters: new Set(['m']),
      midway: (value) => value.current === 3,
      complete: (value) => value.current === 13,
      assign: (value) => value.current ? value.current + 1 : 1,
      reset: (value) => value.current?.length > 4
    },
    takeoff: {
      completed: false,
      letters: new Set(['space', 'o', 'y']),
      midway: (value) => value.current === 'spaceoo',
      complete: (value) => value.current === 'spaceooy',
      assign: (value, currentChar) => value.current ? value.current + currentChar : currentChar,
      reset: (value) => value.current?.length > 8
    },
    nomood: {
      completed: false,
      letters: new Set(['k', 'f', 'u', 'c', 'o', 't']),
      midway: (value) => value.current === 'kfuck',
      complete: (value) => (value.current === 'kfuckot' || value.current === 'kfuckto') && (keyMap['o'] && keyMap['t']),
      assign: (value, currentChar) => value.current ? value.current + currentChar : currentChar,
      reset: (value) => value.current?.length > 8
    }
  }


  const allCompleted = () => Object.values(eggRefs).every(e => e.completed);

  const easterEgg = (name, ref, currentChar) => {
    if (!ref.completed) {
      const { midway, complete, assign, reset, letters } = easterEggs[name];
      const value = ref.value;

      value.current = letters.has(currentChar) ? assign(value, currentChar) : '';

      if (midway(value)) {
        playSound('coin');
      }

      if (complete(value)) {
        playSound('complete');
        wiggle();
        ref.completed = true;
        easterEggs[name].completed = true;

        const event = new CustomEvent('easterEgg', { detail: { name } });
        dispatchEvent(event);

        const completed = allCompleted();
        if (completed) {
          playSound('cheering');
        }
      }

      if (reset(value)) {
        value.current = '';
      }
    }
  }

  const updateKeyMap = (e) => {
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

    if (e.type === 'keydown' || e.type === 'touchstart') {
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
        playSound('space');
      } else {
        const sounds = ['key1', 'key2'];
        playSound(sounds[Math.floor(Math.random() * sounds.length)]);
      }

      const key = getKeyPress(keys, prop);
      if (key) key.current.position.set(0, -1, 0);
    }

    if (isValidEnd && validPress(prop)) {
      const key = getKeyPress(keys, prop);
      if (key) key.current.position.set(0, 0, 0);
    }
  };

  const dirLight = useRef(null);
  const dirLight1 = useRef(null);
  const position = [0, isMobile.current ? 5 : 0, 0];
  return (
    <>
      <Model position={position} backlit={backlit} onDocumentKey={onDocumentKey} updateKeyMap={updateKeyMap} theme={theme} group={group} nodes={nodes} materials={materials} keys={keys} />
      <group rotation={[-5, 0.4, 4.3]}>
        <directionalLight args={[1, 1, 1]} position={[0, -10, -10]} intensity={2} ref={dirLight1} color={'cyan'} />
        <directionalLight args={[1, 1, 1]} position={[0, -10, 10]} intensity={4} ref={dirLight} color={'hotpink'} />
      </group>

    </>
  )


}

useGLTF.preload(MODEL, true);
