# 👕 3D Premium Collection Configurator

A high-end, real-time **3D product customization platform** built with **React**, **Three.js**, and **Tailwind CSS v4**.  
This tool lets users seamlessly switch between a **Polo Shirt**, **Cap**, and **Shorts**, with dynamic color control and custom logo placement.

---

## 🚀 Key Features

### 🎽 Multi-Product Selection
Seamlessly switch between customizing:
- Polo Shirt  
- Cap  
- Shorts  
using a simple UI toggle.

### 🎨 Dynamic Color Control
Independent color customization for specific parts:

- **Polo Shirt**
  - Body
  - Collar
  - Buttons
  - Trims

- **Cap**
  - Body

- **Shorts**
  - Body
  - Trims

### 🖼️ Interactive Logo Placement
- Upload **PNG** or **SVG** logos  
- Real-time adjustment:
  - Position (X, Y, Z)
  - Scale
  - Rotation

## 🧪 Logo System Status (Beta / WIP)

The logo upload and placement system is currently **functional but rough** and still under active development.

### ⚠️ Current Limitations
- Inconsistent logo placement on the shirt surface  
- Manual tweaking required for position (X, Y, Z)  
- Scaling can feel unintuitive  
- Rotation is not always visually accurate  
- UV mapping is not fully optimized  
- Some logo distortions may occur depending on the image

  
🛠️ Technical Stack
Framework: React (Vite)

3D Engine: @react-three/fiber & @react-three/drei

Styling: Tailwind CSS v4

Math / Core: Three.js

📦 Installation & Setup
1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```
```bash
cd polo-configurator
```
2️⃣ Install Dependencies
```
npm install
```
3️⃣ Required Assets
Ensure the following models exist inside the /public folder:

4️⃣ Launch the Development Server

```bash
npm run dev
```
