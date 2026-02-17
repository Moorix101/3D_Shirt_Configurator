import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Shorts({ colors, ...props }) {
  // 1. Load the new model
  const { scene } = useGLTF('/shortSYOUR.glb')
  console.log('Shorts loaded: /shortSYOUR.glb')

  // 2. Create a single material to be shared by all parts
  const masterMaterial = useMemo(() => new THREE.MeshStandardMaterial(), [])

  // 3. Traverse the scene and assign materials
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = masterMaterial
      }
    })
  }, [scene, masterMaterial])

  useFrame((state, delta) => {
    const bodyColor = new THREE.Color(colors.body)
    masterMaterial.color.lerp(bodyColor, delta * 4)
  })

  return (
    <group {...props} dispose={null} rotation={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/shortSYOUR.glb')