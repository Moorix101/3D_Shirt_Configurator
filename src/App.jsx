import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stage, OrbitControls, ContactShadows, Html, useProgress } from '@react-three/drei'
import PoloShirt from './PoloShirt'
import Cap from './Cap'
import Shorts from './Shorts'

function Loader() {
  const { progress } = useProgress()
  return <Html center className="text-sm font-bold text-gray-500">{progress.toFixed(0)}% loaded</Html>
}

export default function App() {
  const [modelColors, setModelColors] = useState({
    polo: {
      body: '#ffffff',
      collar: '#1a1a1a',
      buttons: '#ffffff',
      trims: '#ffffff'
    },
    cap: {
      body: '#ffffff'
    },
    shorts: {
      body: '#ffffff',
      trims: '#ffffff'
    }
  })
  const [currentModel, setCurrentModel] = useState('polo')
  const [bgColor, setBgColor] = useState('#f3f4f6')

  const updateColor = (part, value) => {
    setModelColors(prev => ({
      ...prev,
      [currentModel]: { ...prev[currentModel], [part]: value }
    }))
  }

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <div className="flex-1 relative">
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
          <Suspense fallback={<Loader />}>
            <Stage environment="city" intensity={0.5}>
              {currentModel === 'cap' && (
                <Cap colors={modelColors.cap} position={[0, -0.2, 0]} scale={1} />
              )}
              {currentModel === 'polo' && (
                <PoloShirt colors={modelColors.polo} position={[0, 0, 0]} />
              )}
              {currentModel === 'shorts' && (
                <Shorts colors={modelColors.shorts} position={[0, 0, 0]} scale={1} />
              )}
            </Stage>
          </Suspense>
          <OrbitControls makeDefault minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2} />
        </Canvas>
      </div>

      <div className="w-96 p-8 bg-white shadow-xl flex flex-col gap-8 overflow-y-auto">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-gray-400">Premium Collection</h2>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Custom {currentModel.charAt(0).toUpperCase() + currentModel.slice(1)}</h1>
          <p className="text-xl text-gray-600 mt-2">$120.00</p>
        </div>

        <div className="flex gap-2">
            {['polo', 'cap', 'shorts'].map(model => (
                <button
                    key={model}
                    onClick={() => setCurrentModel(model)}
                    className={`flex-1 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${
                        currentModel === model ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                >
                    {model}
                </button>
            ))}
        </div>

        <div className="space-y-6">
          <Section label="Body Color" active={modelColors[currentModel].body} 
            onSelect={(c) => updateColor('body', c)} 
            options={['#ffffff', '#000000', '#1e3a8a', '#b91c1c']} />
            
          {currentModel === 'polo' && (
            <Section label="Collar Detail" active={modelColors.polo.collar} 
              onSelect={(c) => updateColor('collar', c)} 
              options={['#1a1a1a', '#ffffff', '#4b5563', '#166534']} />
          )}

          {currentModel === 'polo' && (
            <Section label="Trims" active={modelColors.polo.trims} 
              onSelect={(c) => updateColor('trims', c)} 
              options={['#ffffff', '#000000', '#1e3a8a', '#b91c1c']} />
          )}
            
          {currentModel === 'polo' && (
            <Section label="Buttons" active={modelColors.polo.buttons} 
              onSelect={(c) => updateColor('buttons', c)} 
              options={['#ffffff', '#000000', '#d1d5db', '#4b5563']} />
          )}
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
          <button key={color} onClick={() => onSelect(color)}
            className={`w-8 h-8 rounded-full border ${active === color ? 'border-gray-900 scale-110' : 'border-gray-200'}`}
            style={{ backgroundColor: color }} />
        ))}
        <div className="relative w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden cursor-pointer bg-white">
            <span className="text-[8px] font-bold text-gray-500">RGB</span>
            <input type="color" value={active} onChange={(e) => onSelect(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
        </div>
      </div>
    </div>
  )
}
