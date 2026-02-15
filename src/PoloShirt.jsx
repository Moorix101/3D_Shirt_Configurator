import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function PoloShirt({ colors, ...props }) {
  const { nodes, materials } = useGLTF('/triko.glb')

  const shirtMaterial = useMemo(() => materials.Shirt_Material ? materials.Shirt_Material.clone() : new THREE.MeshStandardMaterial(), [materials.Shirt_Material])
  const buttonMaterial = useMemo(() => materials.Button_Mat ? materials.Button_Mat.clone() : new THREE.MeshStandardMaterial(), [materials.Button_Mat])
  const collarMaterial = useMemo(() => materials.Collar_Mat ? materials.Collar_Mat.clone() : new THREE.MeshStandardMaterial(), [materials.Collar_Mat])
  const trimMaterial = useMemo(() => new THREE.MeshStandardMaterial(), [])

  useFrame((state, delta) => {
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
      {nodes.Shirt_Body && <mesh geometry={nodes.Shirt_Body.geometry} material={shirtMaterial} />}
      {nodes.Buttons && <mesh geometry={nodes.Buttons.geometry} material={buttonMaterial} />}
      {nodes.Collar && <mesh geometry={nodes.Collar.geometry} material={collarMaterial} />}
      {nodes.Trims && <mesh geometry={nodes.Trims.geometry} material={trimMaterial} />}
    </group>
  )
}

useGLTF.preload('/triko.glb')
