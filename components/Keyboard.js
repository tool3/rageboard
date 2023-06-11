import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { Depth, Fresnel, LayerMaterial } from 'lamina/vanilla';
import React, { useEffect, useRef } from 'react';
import {
  Color,
  MeshStandardMaterial,
  Vector3
} from 'three';

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/models/keyboard.glb');

  
  const flowerMaterial = new LayerMaterial({
    color: new Color('#C7C7C7'),
    lighting: 'physical',
    layers: [
      new Depth({
        far: 7,
        near: 0,
        origin: [0, 0, 1],
        colorA: new Color('red').convertSRGBToLinear(),
        colorB: new Color('blue').convertSRGBToLinear(),
        alpha: 1,
        mode: 'normal',
        mapping: 'vector',
      }),
      new Fresnel({
        color: '#ffffff',
        alpha: .8,
        mode: 'softlight',
        power: 2,
        intensity: 3,
        bias: 0
      }),
    ],
  })
  
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
  const keySounds = ['/sounds/key1.wav', '/sounds/key2.wav'];
  const spaceSound = ['/sounds/space.wav'];
  const playSound = (sound, volume = 1) => {
    sound.currentTime = sound.currentTime - 10;
    sound.gain = volume;
    sound.play();
  };

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
        playSound(new Audio(spaceSound));
        return;
      }
      playSound(new Audio(keySounds[Math.floor(Math.random() * keySounds.length)]), 0.1);
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
      // playSound(new Audio(keySounds[Math.floor(Math.random() * keySounds.length)]));
    }
  };

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
    <group ref={group} {...props} dispose={null} rotation={[-5, 0.4, 4.3]}>
      <directionalLight ref={dirLight} intensity={1} position={[-10, 20, 4]} />
      {/* <pointLight intensity={.4} position={[-20, 15, -10]} color={0xffffff} /> */}
      {/* <pointLight intensity={.4} position={[-5, 25, -10]} color={0xffffff} /> */}

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
  );
}

useGLTF.preload('/models/keyboard.glb');
