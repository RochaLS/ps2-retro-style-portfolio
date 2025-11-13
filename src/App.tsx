import { useEffect, useRef, useState } from 'react'
import { ProjectBox } from './components/ProjectBox'
import { projects } from './data/projects'
import { crtSound, navSound, selectSound } from './data/sounds'

import CRT from './components/CRT'
import { useNavigate } from 'react-router'
import { Navigation } from './components/Navigation'

export const textStyle = {
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontWeight: 400,
  textShadow: `
    1px 1px 0 #000,
    -1px 1px 0 #000,
    1px -1px 0 #000,
    -1px -1px 0 #000,
    2px 2px 4px rgba(0,0,0,0.6)
  `,
  letterSpacing: '0.05em', 
};

export const textStyleSecondary = {
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
  const isMobile = window.innerWidth < 768;
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem("isMuted");
    return saved ? JSON.parse(saved) : true; // default true if not stored
  });
  const [isLoading, setIsLoading] = useState(true)
  let navigate = useNavigate();

  const selectedRef = useRef(selectedIndex);

  useEffect(() => {
    localStorage.setItem("isMuted", JSON.stringify(isMuted));

    if (isMobile) {
      setIsLoading(false); 
      return; 
    }
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
        case "z":
          console.log('Selected item:', selectedIndex);
          if (!isMuted) selectSound.play()
          navigate(`/project/${selectedRef.current}`)
          break;
      }
    }

    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      // First time visiting
      const timeout = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasVisited", "true");
        window.addEventListener('keydown', handleKeyDown);
      }, projects.length * 480); 

      //Cleanup
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timeout);
      };
    } else {
      setIsLoading(false)
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }


  }, [isMuted])

  useEffect(() => {
    selectedRef.current = selectedIndex;
  }, [selectedIndex]);

  return (
    <CRT>
      <div className="min-h-screen bg-gradient-to-br from-stone-300 via-stone-500 to-stone-900 pb-20">
        <div className="flex flex-col sm:flex-row justify-between w-full p-6 sm:p-12">
          <div className="text-center sm:text-left">
            <h1 className="font-ps2 text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight"
              style={textStyle}>
              Memory Card [ps2/1]
            </h1>
            <h2 className="font-ps2 text-lg sm:text-xl md:text-2xl font-normal text-gray-200 tracking-tight"
              style={textStyle}>
              Lucas’s Full-Stack Portfolio
            </h2>
            <p className="font-ps2 text-base sm:text-lg md:text-2xl font-normal text-gray-200 tracking-tight"
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
          <div className="hidden sm:block text-4xl font-black uppercase tracking-tight" style={textStyleSecondary}>
            {projects[selectedIndex].title}
          </div>
        </div>
        <div className="flex justify-center align-center m-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-10 md:gap-16">
            {projects.map((project, index) => (
              <ProjectBox key={index} project={project} selected={selectedIndex === index} index={index} onHover={(i) => { 
                if (!isMuted) navSound.play();
                setSelectedIndex(i); 
              }} isLoading={isLoading} isMuted={isMuted}/>
            ))}
          </div>
        </div>
        { !isMobile && (
           <Navigation>
           <>
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
           }}
           aria-label="Toggle sound"
           >[SOUND {isMuted ? "OFF": "ON"}]</button>
             <p >USE [&lt;---] [---&gt;] TO NAVIGATE</p>
             <p>[Z] CONFIRM</p>
           </>
          </Navigation>
        )}
        
        {isLoading && !isMobile && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p className="text-white text-5xl" style={textStyle}>Now loading...</p>
            </div>
        )}

        
      </div>
    </CRT>
  )
}

export default App
