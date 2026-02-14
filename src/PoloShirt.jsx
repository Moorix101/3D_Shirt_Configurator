import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function PoloShirt({ colors, ...props }) {
  // Load the model from the public folder
  const { scene } = useGLTF('/triko.glb')

  // Identify the relevant meshes once
  const targets = useMemo(() => {
    const found = { body: [], collar: [], buttons: [], leftArm: [], rightArm: [], trim: [] }
    
    scene.traverse((child) => {
      if (child.isMesh) {
        // Clone material to ensure independent coloring
        child.material = child.material.clone()
        child.material.transparent = false
        child.material.opacity = 1
        
        const name = child.name
        if (name.includes('Shirt_Body')) {
            found.body.push(child)
        } else if (name.includes('Collar')) {
            found.collar.push(child)
        } else if (name.includes('Buttons')) {
            found.buttons.push(child)
        } else if (name.includes('Left_Arm')) {
            found.leftArm.push(child)
        } else if (name.includes('Right_Arm')) {
            found.rightArm.push(child)
        } else if (name.includes('Trim_Details')) {
            found.trim.push(child)
        }
      }
    })
    return found
  }, [scene])

  useFrame((state, delta) => {
    // Smoothly interpolate colors
    const lerpColor = (meshes, colorHex) => {
        const targetColor = new THREE.Color(colorHex)
        meshes.forEach(mesh => {
            mesh.material.color.lerp(targetColor, delta * 4)
        })
    }

    lerpColor(targets.body, colors.body)
    lerpColor(targets.collar, colors.collar)
    lerpColor(targets.buttons, colors.buttons)
    lerpColor(targets.leftArm, colors.leftArm)
    lerpColor(targets.rightArm, colors.rightArm)
    lerpColor(targets.trim, colors.body)
  })

  return <primitive object={scene} {...props} />
}

useGLTF.preload('/triko.glb')