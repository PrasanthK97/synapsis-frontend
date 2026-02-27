import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import ImageAnalyser from './services/ImageAnalyser'
import ImgPrcDataVisu from './services/ImgPrcDataVisu'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
           <Header/>    
           <Routes>
              <Route path="/home" element={<ImageAnalyser />} />
              <Route path="/img_data" element={<ImgPrcDataVisu />} />
           </Routes>
      </div>
    </>
  )
}

export default App
