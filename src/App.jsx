import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stage, OrbitControls, ContactShadows } from '@react-three/drei'
import PoloShirt from './PoloShirt'

export default function App() {
  const [colors, setColors] = useState({
    body: '#ffffff',
    collar: '#1a1a1a',
    buttons: '#ffffff',
    leftArm: '#ffffff',
    rightArm: '#ffffff'
  })
  const [bgColor, setBgColor] = useState('#f3f4f6')

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* 3D Viewer Area */}
      <div className="flex-1 relative">
        {/* Background Color Picker */}
        <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 transition-all hover:bg-white">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Background</span>
            <div className="relative w-6 h-6 rounded-full border border-gray-200 overflow-hidden cursor-pointer shadow-sm hover:scale-110 transition-transform" style={{ backgroundColor: bgColor }}>
                <input 
                    type="color" 
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>

        <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
          <color attach="background" args={[bgColor]} />
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5}>
              <PoloShirt colors={colors} />
            </Stage>
          </Suspense>
          <OrbitControls makeDefault minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2} />
        </Canvas>
      </div>

      {/* Luxury Sidebar UI */}
      <div className="w-96 p-8 bg-white shadow-xl flex flex-col gap-8 overflow-y-auto">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-gray-400">Premium Collection</h2>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Custom Polo Shirt</h1>
          <p className="text-xl text-gray-600 mt-2">$120.00</p>
        </div>

        {/* Customization Options */}
        <div className="space-y-6">
          <Section label="Body Color" active={colors.body} 
            onSelect={(c) => setColors({...colors, body: c})} 
            options={['#ffffff', '#000000', '#1e3a8a', '#b91c1c']} />
            
          <Section label="Collar Detail" active={colors.collar} 
            onSelect={(c) => setColors({...colors, collar: c})} 
            options={['#1a1a1a', '#ffffff', '#4b5563', '#166534']} />
            
          <Section label="Left Arm" active={colors.leftArm} 
            onSelect={(c) => setColors({...colors, leftArm: c})} 
            options={['#ffffff', '#000000', '#1e3a8a', '#b91c1c']} />

          <Section label="Right Arm" active={colors.rightArm} 
            onSelect={(c) => setColors({...colors, rightArm: c})} 
            options={['#ffffff', '#000000', '#1e3a8a', '#b91c1c']} />
            
          <Section label="Buttons" active={colors.buttons} 
            onSelect={(c) => setColors({...colors, buttons: c})} 
            options={['#ffffff', '#000000', '#d1d5db', '#4b5563']} />
        </div>

        <button className="mt-auto w-full bg-black text-white py-4 font-bold hover:bg-gray-800 transition-colors">
          ADD TO CART
        </button>
      </div>
    </div>
  )
}

function Section({ label, options, onSelect, active }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-700 mb-3">{label}</h3>
      <div className="flex flex-wrap gap-3">
        {options.map((color) => (
          <button 
            key={color} 
            onClick={() => onSelect(color)}
            className={`w-8 h-8 rounded-full border transition-all duration-200 ${
              active === color 
                ? 'border-gray-900 scale-110 shadow-md' 
                : 'border-gray-200 hover:scale-110 hover:border-gray-400 shadow-sm'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
        {/* RGB Color Picker */}
        <div className="relative w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-gray-400 transition-all hover:scale-110 shadow-sm bg-white">
            <span className="text-[8px] font-bold text-gray-500">RGB</span>
            <input 
                type="color" 
                value={active}
                onChange={(e) => onSelect(e.target.value)}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            />
        </div>
      </div>
    </div>
  )
}
