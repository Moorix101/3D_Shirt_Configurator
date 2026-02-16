import React, { useMemo } from 'react'
import { useGLTF, Center } from '@react-three/drei' //
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Shorts({ colors, ...props }) {
  const { nodes, materials } = useGLTF('/shorts3.glb')

  const bodyMaterial = useMemo(() => 
    materials.Material ? materials.Material.clone() : new THREE.MeshStandardMaterial()
  , [materials.Material])

  const drawstringMaterial = useMemo(() => 
    materials.Drawstring_Material ? materials.Drawstring_Material.clone() : new THREE.MeshStandardMaterial()
  , [materials.Drawstring_Material])

  useFrame((state, delta) => {
    const bodyColor = new THREE.Color(colors.body)
    const drawstringColor = new THREE.Color(colors.drawstring || '#ffffff')
    
    bodyMaterial.color.lerp(bodyColor, delta * 4)
    drawstringMaterial.color.lerp(drawstringColor, delta * 4)
  })

  // We look for 'Shorts_Body' or any mesh that might be the main part
  const bodyMesh = nodes.Shorts_Body || nodes.Short_Body || nodes.Shorts; //

  return (
    <group {...props} dispose={null} rotation={[0, 0, 0]}>
      <Center top> {/* This forces the model to stay centered and above ground */}
        {bodyMesh && (
          <mesh geometry={bodyMesh.geometry} material={bodyMaterial} />
        )}
        {nodes.Drawstring && (
          <mesh geometry={nodes.Drawstring.geometry} material={drawstringMaterial} />
        )}
      </Center>
    </group>
  )
}

useGLTF.preload('/shorts3.glb')