import { useEffect, useState } from "react";
import type { Project } from "../data/projects";
import { useNavigate } from "react-router";
import { selectSound } from "../data/sounds";

interface ProjectBoxProps {
    project: Project
    selected: boolean
    index: number
    onHover: (i: number) => void
    isLoading: boolean
    isMuted: boolean
}



export function ProjectBox({ project, selected, index, onHover, isLoading, isMuted }: ProjectBoxProps) {
    const isMobile = window.innerWidth < 768; // same as Tailwind's md breakpoint
    const [spawned, setSpawned] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const hasVisited = sessionStorage.getItem("hasVisited");

        if (hasVisited) {
            setSpawned(true);
            return
        }
        const timeout = setTimeout(() => {
          setSpawned(true);
        }, index * 480); 
        return () => clearTimeout(timeout);
      }, []);

      
    return (
      <div className="relative w-32 h-32 cursor-pointer" aria-label={`Open ${project.title} project details`} onMouseEnter={() => {
        if (!isLoading) {
            onHover(index)
        }
      }}>
        <div
        className="
            w-32 h-32 bg-white
            transform-gpu
            transition-all
            duration-500
            ease-out
            rounded-md
        "
        style={{
            transform: spawned
            ? selected && !isMobile
                ? 'translateY(0px) rotateX(12deg) rotateY(-10deg) scale(1.1)'
                : 'translateY(0px) scale(1)'
            : isMobile
                ? 'scale(1)' // no spawn animation on mobile
                : 'translateY(40px) scale(0.95)',
            opacity: spawned || isMobile ? 1 : 0, // instantly visible on mobile
            boxShadow: selected && !isMobile
            ? '8px 8px 16px rgba(0,0,0,0.8)'
            : '5px 5px 10px rgba(0,0,0,0.7)',
            backgroundImage: `url("${project.imagePath}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        onClick={() => {
            if (!isMuted) selectSound.play()
            navigate(`/project/${index}`);
        }}
        ></div>
        {/* IMG is hidden. Only used for screen readers to see the alt */}
          {/* <img
            src={project.imagePath}
            alt={`Screenshot of ${project.title}`}
            className="absolute inset-0 opacity-0"
        /> */}
        {selected && !isMobile && (
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