import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Cap({ colors, ...props }) {
  // 1. Updated path to match your new filename
  const { scene } = useGLTF('/cap2.glb')

  // 2. Create a single material to be shared by all parts of the hat
  const masterMaterial = useMemo(() => new THREE.MeshStandardMaterial(), [])

  // 3. Automatically find and link every mesh in the new model to the master material
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = masterMaterial
      }
    })
  }, [scene, masterMaterial])

  useFrame((state, delta) => {
    // 4. Smoothly update the color for all linked parts
    const targetColor = new THREE.Color(colors.body)
    masterMaterial.color.lerp(targetColor, delta * 4)
  })

  return (
    <group {...props} dispose={null} rotation={[0, 0, 0]}>
      {/* 5. Render the entire scene structure from Blender */}
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/cap2.glb')
