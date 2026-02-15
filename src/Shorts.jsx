import React, { useMemo } from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Shorts({ colors, ...props }) {
  // Load the model - make sure this filename matches your public folder
  const { nodes, materials } = useGLTF('/shorts.glb')

  // Clone materials so the shorts can have their own colors
  const bodyMaterial = useMemo(() => 
    materials.Material ? materials.Material.clone() : new THREE.MeshStandardMaterial()
  , [materials.Material])

  const trimMaterial = useMemo(() => 
    materials.Trim_Material ? materials.Trim_Material.clone() : new THREE.MeshStandardMaterial()
  , [materials.Trim_Material])

  useFrame((state, delta) => {
    // Smoothly interpolate the colors just like the Polo Shirt
    const bodyColor = new THREE.Color(colors.body)
    const trimColor = new THREE.Color(colors.trims)
    
    bodyMaterial.color.lerp(bodyColor, delta * 4)
    trimMaterial.color.lerp(trimColor, delta * 4)
  })

  return (
    <group {...props} dispose={null} rotation={[0, 0, 0]}>
      <Center>
        {/* IMPORTANT: These names must match your Blender Outliner exactly.
            If Blender says "Short_Body", use nodes.Short_Body.
        */}
        {nodes.Shorts_Body && (
          <mesh geometry={nodes.Shorts_Body.geometry} material={bodyMaterial} />
        )}
        {nodes.Trim && (
          <mesh geometry={nodes.Trim.geometry} material={trimMaterial} />
        )}
      </Center>
    </group>
  )
}

useGLTF.preload('/shorts.glb')
