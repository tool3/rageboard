import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Ground() {
    const [roughness, normal] = useLoader(TextureLoader, ['textures/ground_roughness.png', 'textures/ground_normal.png'])

    return (
        <mesh rotation-x={-Math.PI * 0.5} position={[0, -1 , 0]} castShadow receiveShadow>
            <planeGeometry args={[30, 30]}/>
            <MeshReflectorMaterial 
            envMapIntensity={0}
            dithering={true}
            color={[0.015, 0.015, 0.015]}
            roughness={0.7}
            roughnessMap={roughness}
            normalMap={normal}
            blur={[1000, 400]}
            mixBlur={30}
            mixStrength={80}
            mixContrast={1}
            resolution={1024}
            mirror={0}
            depthScale={0.01}
            minDepthThreshold={0.9}
            maxDepthThreshold={1}
            depthToBlurRatioBias={0.25}
            debug={0}
            reflectorOffset={0.2}
            
            />
        </mesh>
    )
}