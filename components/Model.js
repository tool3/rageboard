import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, PerspectiveCamera, useHelper } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { MeshPhongMaterial, MeshStandardMaterial } from 'three';

export default function Model({ scroll, ...props }) {
  const group = useRef();

  const { nodes, materials, animations } = useGLTF('/models/spiral_scroll_d.glb');
  const { actions } = useAnimations(animations, group);
  const colorMap = useLoader(TextureLoader, 'screen.png');
  const extras = { receiveShadow: true, castShadow: true, 'material-envMapIntensity': 0.2 };

  useEffect(() => void (actions['CameraAction.005'].play().paused = true), []);

  useEffect(() => {
    group.current.children[0].children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        child.layers.enable(3);
        child.material.color.set('#202020').convertSRGBToLinear();
        child.geometry.computeVertexNormals(true);
        child.geometry.shading = THREE.SmoothShading;
      } else {
        child.children.forEach((child) => {
          if (child.name !== 'Notebook_screen') {
            console.log(child);
            child.layers.enable(3);
            child.material.color.set('#202020').convertSRGBToLinear();
            child.geometry.computeVertexNormals(true);
          }
        });
      }
    });
  }, []);

  useFrame((state) => {
    actions['CameraAction.005'].time = THREE.MathUtils.lerp(
      actions['CameraAction.005'].time,
      actions['CameraAction.005'].getClip().duration * scroll.current,
      0.05
    );

    group.current.children[0].children.forEach((child, index) => {
      if (child instanceof THREE.Mesh) {
        const et = state.clock.elapsedTime;

        if (child.name == 'Icosphere') {
          child.rotateY(et / 10000);
          return;
        }

        child.position.y = Math.sin((et + index * 2000) / 2) * 0.5;

        if (child.name == 'Guitar') {
          child.position.y = Math.sin((et + index * 2000) / 2) * 0.5 - 15;
        }

        if (child.name == 'Horns') {
          child.position.y = Math.sin((et + index * 2000) / 2) * 0.5 - 15;
        }

        if (child.name == 'Cone') {
          child.position.y = Math.sin((et + index * 2000) / 2) * 0.5 - 15;
        }

        if (child.name == 'Suzanne') {
          child.position.y = Math.sin((et + index * 2000) / 2) * 0.5 - 10;
        }

        if (child.name == 'Diamond') {
          child.position.y = Math.sin((et + index * 2000) / 2) * 0.5 - 10;
        }

        child.rotation.x = Math.sin((et + index * 2000) / 3) / 100;
        child.rotation.y = Math.cos((et + index * 2000) / 2) / 100;
        child.rotation.z = Math.sin((et + index * 2000) / 3) / 100;
      }
    });
  });
  console.log(materials);

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0.06, 4.04, 0.35]} scale={[0.25, 0.25, 0.25]}>
        <mesh
          name="Horns"
          scale={[3.5, 3.5, 3.5]}
          geometry={nodes.Horns.geometry}
          material={materials.Horns}
          {...extras}
        />
        <group>
          <mesh
            name="Notebook"
            geometry={nodes.Notebook.children[0].geometry}
            material={materials.M_Notebook}
            {...extras}
          />
          <mesh
            name="Notebook_screen"
            geometry={nodes.Notebook.children[1].geometry}
            material={materials.Screen}
            {...extras}
          />
        </group>
        <mesh name="Guitar" scale={[4, 4, 4]} position={[0, -10, 0]} geometry={nodes.Guitar.geometry} material={materials.Guitar} {...extras} />
        <mesh
          name="Cone"
          scale={[4, 4, 4]}
          geometry={nodes.Cone.geometry}
          material={materials.Cone}
          rotateX={120}
          {...extras}
        />
        <mesh
          name="Suzanne"
          scale={[3.5, 3.5, 3.5]}
          geometry={nodes.Suzanne.geometry}
          material={materials.Suzanne}
          {...extras}
        />
        <mesh name="VR_Headset" geometry={nodes.VR_Headset.geometry} material={materials.M_Headset} {...extras} />
        <mesh
          name="Icosphere"
          position={[-10, 80, 0]}
          scale={[5, 5, 5]}
          geometry={nodes.Icosphere.geometry}
          material={materials.Icosphere}
          v
        />

        {/* <EffectComposer autoClear={true}>
          <DepthOfField focusDistance={0.08} focalLength={0.2} bokehScale={5} blur />
        </EffectComposer> */}
      </group>
      <group name="Camera" position={[-1.78, 2.04, 15.58]} rotation={[1.62, 0.01, 0.11]}>
        <PerspectiveCamera makeDefault far={100} near={0.1} fov={28} rotation={[-Math.PI / 2, 0, 0]}>
          <pointLight position={[35, -20, -20]} color={0xffffff} intensity={2} />
          <pointLight position={[10, 10, 0]} color={0xff00ff} intensity={2} />
          <pointLight position={[-10, 10, 0]} color={0x00ffff} intensity={2} />

          <pointLight position={[-10, 80, 0]} color={0xff00ff * Math.random()} intensity={2} power={10} />
          <pointLight position={[10, 80, 0]} color={0x00ffff * Math.random()} intensity={2} power={10} />

          <directionalLight
            castShadow
            position={[10, 20, 15]}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-left={-8}
            shadow-camera-bottom={-8}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            intensity={2}
            shadow-bias={-0.0001}
          />
        </PerspectiveCamera>
      </group>
    </group>
  );
}

useGLTF.preload('/models/spiral_scroll_d.glb');
