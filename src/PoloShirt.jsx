import React, { useMemo } from 'react'
import { useGLTF, Decal, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Logo({ textureUrl, position, scale, rotation }) {
  const texture = useTexture(textureUrl)
  return (
    <Decal
      debug
      position={position}
      rotation={[0, 0, rotation]}
      scale={scale}
    >
      <meshStandardMaterial
        map={texture}
        transparent
        polygonOffset
        polygonOffsetFactor={-1}
        depthTest={true}
      />
    </Decal>
  )
}

export default function PoloShirt({ colors, logo, logoSettings = { x: -0.15, y: 0.4, z: 0.15, scale: 0.12, rotation: 0 }, ...props }) {
  // Load the model from the public folder
  const { nodes, materials } = useGLTF('/triko.glb')

  // Clone materials to ensure independent coloring
  const shirtMaterial = useMemo(() => materials.Shirt_Material ? materials.Shirt_Material.clone() : new THREE.MeshStandardMaterial(), [materials.Shirt_Material])
  const buttonMaterial = useMemo(() => materials.Button_Mat ? materials.Button_Mat.clone() : new THREE.MeshStandardMaterial(), [materials.Button_Mat])
  const collarMaterial = useMemo(() => materials.Collar_Mat ? materials.Collar_Mat.clone() : new THREE.MeshStandardMaterial(), [materials.Collar_Mat])
  const trimMaterial = useMemo(() => new THREE.MeshStandardMaterial(), [])

  useFrame((state, delta) => {
    // Smoothly interpolate colors
    const lerpColor = (material, colorHex) => {
        const targetColor = new THREE.Color(colorHex)
        material.color.lerp(targetColor, delta * 4)
    }

    lerpColor(shirtMaterial, colors.body)
    lerpColor(collarMaterial, colors.collar)
    lerpColor(buttonMaterial, colors.buttons)
    lerpColor(trimMaterial, colors.trims)
  })

  return (
    <group {...props} dispose={null} rotation={[Math.PI / 2, 0, 0]}>
      {nodes.Shirt_Body && (
        <mesh geometry={nodes.Shirt_Body.geometry} material={shirtMaterial}>
          {logo && (
            <Logo 
              textureUrl={logo} 
              position={[logoSettings.x, logoSettings.y, logoSettings.z]} 
              scale={[logoSettings.scale, logoSettings.scale, logoSettings.scale]}
              rotation={logoSettings.rotation}
            />
          )}
        </mesh>
      )}
      {nodes.Buttons && <mesh geometry={nodes.Buttons.geometry} material={buttonMaterial} />}
      {nodes.Collar && <mesh geometry={nodes.Collar.geometry} material={collarMaterial} />}
      {nodes.Trims && <mesh geometry={nodes.Trims.geometry} material={trimMaterial} />}
    </group>
  )
}

useGLTF.preload('/triko.glb')