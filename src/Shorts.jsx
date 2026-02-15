import React, { useMemo } from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Shorts({ colors, ...props }) {
  const { nodes, materials } = useGLTF('/shorts.glb')

  // Keep both materials separate in memory so they can have different textures/roughness
  const bodyMaterial = useMemo(() => 
    materials.Material ? materials.Material.clone() : new THREE.MeshStandardMaterial()
  , [materials.Material])

  const trimMaterial = useMemo(() => 
    materials.Trim_Material ? materials.Trim_Material.clone() : new THREE.MeshStandardMaterial()
  , [materials.Trim_Material])

  useFrame((state, delta) => {
    // SMART FIX: Use 'colors.body' for BOTH materials
    const activeColor = new THREE.Color(colors.body)
    
    bodyMaterial.color.lerp(activeColor, delta * 4)
    trimMaterial.color.lerp(activeColor, delta * 4)
  })

  return (
    <group {...props} dispose={null} rotation={[0, 0, 0]}>
      <Center>
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
