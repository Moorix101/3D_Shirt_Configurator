import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Cap({ colors, ...props }) {
  const { nodes } = useGLTF('/cap.glb')

  const material = useMemo(() => {
    if (nodes.Cap && nodes.Cap.material) return nodes.Cap.material.clone()
    return new THREE.MeshStandardMaterial()
  }, [nodes.Cap])

  useFrame((state, delta) => {
    const targetColor = new THREE.Color(colors.body)
    material.color.lerp(targetColor, delta * 4)
  })

  return (
    <group {...props} dispose={null} rotation={[0, Math.PI , 0]}>
      {nodes.Cap && <mesh geometry={nodes.Cap.geometry} material={material} />}
    </group>
  )
}

useGLTF.preload('/cap.glb')
