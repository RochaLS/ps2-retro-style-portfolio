import { useEffect, useState } from 'react'
import './App.css'
import { ProjectBox } from './components/ProjectBox'
import { projects } from './data/projects'
import { crtSound, navSound, selectSound } from './data/sounds'

import CRT from './components/CRT'

const textStyle = {
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontWeight: 400,
  color: '#FFFFFF',
  textShadow: `
    1px 1px 0 #000,
    -1px 1px 0 #000,
    1px -1px 0 #000,
    -1px -1px 0 #000,
    2px 2px 4px rgba(0,0,0,0.6)
  `,
  letterSpacing: '0.05em', 
};

const textStyleSecondary = {
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontWeight: 400,
  color: '#C8D952',
  textShadow: `
    1px 1px 0 #000,
    -1px 1px 0 #000,
    1px -1px 0 #000,
    -1px -1px 0 #000,
    2px 2px 4px rgba(0,0,0,0.6)
  `,
  letterSpacing: '0.05em', 
};

function App() {

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const COLS = 5
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("Key pressed: ", e.key)

      // Math.max returs the bigger of the two num
      switch(e.key) {
        case "ArrowLeft":
          if (!isMuted) navSound.play();
          setSelectedIndex(prev => Math.max(0, prev - 1))
          break;
        case "ArrowRight":
          if (!isMuted) navSound.play();
          setSelectedIndex((prev) => {
            if ((prev + 1) >= projects.length) {
              return 0
            }

            return prev + 1
          })
          break;
        case "ArrowUp":
          if (!isMuted) navSound.play();
          setSelectedIndex(prev => {
            const next = prev - COLS
            return next < 0 ? prev : next
          })
          break;
        case "ArrowDown":
          if (!isMuted) navSound.play();
          setSelectedIndex(prev => {
            const next = prev + COLS
            return next >= projects.length ? prev : next
          })
          break;

        
        case "Enter":
          console.log('Selected item:', selectedIndex);
          if (!isMuted) selectSound.play()
          break;
      }
    }


    const timeout = setTimeout(() => {
      setIsLoading(false);
      window.addEventListener('keydown', handleKeyDown);
    }, projects.length * 480); 


    //Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeout);
    };
  }, [isMuted])

  return (
    <CRT>
      <div className="min-h-screen bg-gradient-to-br from-stone-300 via-stone-500 to-stone-900">
        <div className="flex justify-between w-full p-12">
          <div>
            <p className="font-ps2 text-4xl font-bold text-white tracking-tight"
              style={textStyle}>
              Memory Card [ps2/1]
            </p>
            <p className="font-ps2 text-2xl font-normal text-gray-200 tracking-tight"
              style={textStyle}>
              Lucas’s Full-Stack Portfolio
            </p>
            <p className="font-ps2 text-2xl font-normal text-gray-200 tracking-tight"
              style={{ 
                textShadow: `
                1px 1px 0px #000,
                -1px 1px 0px #000,
                1px -1px 0px #000,
                -1px -1px 0px #000,
                2px 2px 4px rgba(0,0,0,0.6)
              `,
              fontWeight: 400
              }}>
              733 KB Free
            </p>
          </div>
          <div className="text-4xl font-black uppercase tracking-tight" style={textStyleSecondary}>
            {projects[selectedIndex].title}
          </div>
        </div>
        <div className="flex justify-center align-center m-4">
          <div className="grid grid-cols-5 gap-16 my-0 mx-auto">
            {projects.map((project, index) => (
              <ProjectBox project={project} selected={selectedIndex === index} index={index} onHover={(i) => { 
                if (!isMuted) navSound.play();
                setSelectedIndex(i); 
              }}/>
            ))}
          </div>
        </div>
        <div className="text-white text-2xl p-12 absolute bottom-0 flex justify-between w-full tracking-tight" 
              style={textStyle}>
          <button className="cursor-pointer" style={textStyle}  onClick={() => {
            if (isMuted) {
              setIsMuted(false)
              if (!crtSound.playing()) {
                crtSound.play();
              }
            } else {
              setIsMuted(true)
              crtSound.stop();

            }
          }}>[SOUND {isMuted ? "OFF": "ON"}]</button>
          <p >USE [&lt;---] [---&gt;] TO NAVIGATE</p>
          <p>[ENTER] CONFIRM</p>
        </div>
        {isLoading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p className="text-white text-5xl" style={textStyle}>Now loading...</p>
            </div>
        )}

        
      </div>
      
      
    </CRT>
    
  )
}

export default App
