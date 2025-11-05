import { useEffect, useState } from "react";
import type { Project } from "../data/projects";

interface ProjectBoxProps {
    project: Project
    selected: boolean
    index: number
    onHover: (i: number) => void
}



export function ProjectBox({ project, selected, index, onHover }: ProjectBoxProps) {
    const [spawned, setSpawned] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
          setSpawned(true);
        }, index * 480); 
        return () => clearTimeout(timeout);
      }, []);

      
    return (
      <div className="relative w-32 h-32 cursor-pointer" onMouseEnter={() => onHover(index)}>
      <div
        className="
          w-32 h-32 bg-white
          transform-gpu
          transition-all
          duration-500
          ease-out
        "
        style={{
          transform: spawned
            ? selected
              ? 'translateY(0px) rotateX(12deg) rotateY(-10deg) scale(1.1)'
              : 'translateY(0px) rotateX(5deg) rotateY(0deg) scale(1)'
            : 'translateY(40px) scale(0.95)',   // START
          opacity: spawned ? 1 : 0,             // FADE IN
          boxShadow: selected
            ? '8px 8px 16px rgba(0,0,0,0.8)'
            : '5px 5px 10px rgba(0,0,0,0.7)',
          backgroundImage: `url("${project.imagePath}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
  
        {selected && (
          <>
            {/* Solid white core */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-6 rounded-full bg-white"
              style={{
                boxShadow:
                  '0 0 30px 15px rgba(255,255,255,1), 0 0 60px 30px rgba(255,255,255,0.8), 0 0 90px 45px rgba(135,206,250,0.6)',
              }}
            ></div>
  
            {/* Bright glow layer */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-10 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 30%, rgba(200,230,255,0.7) 50%, rgba(135,206,250,0.4) 70%, transparent 90%)',
                boxShadow: '0 0 40px 20px rgba(255,255,255,0.9)',
                filter: 'blur(2px)',
              }}
            ></div>
  
            {/* Extra outer glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-28 h-14 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(135,206,250,0.4) 40%, transparent 70%)',
                filter: 'blur(4px)',
              }}
            ></div>
          </>
        )}
      </div>
    );
  }