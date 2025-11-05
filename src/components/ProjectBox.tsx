import type { Project } from "../data/projects";

interface ProjectBoxProps {
    project: Project
    selected: boolean
}



export function ProjectBox({ project, selected }: ProjectBoxProps) {
    return (
      <div className="relative w-32 h-32">
        <div
          className={`w-32 h-32 bg-white transform-gpu transition-transform duration-300`}
          style={{
            transform: selected
              ? 'rotateX(12deg) rotateY(-10deg) scale(1.1)' // tilt + slightly bigger when selected
              : 'rotateX(5deg) rotateY(0deg) scale(1)',     // subtle tilt for unselected
            boxShadow: selected
              ? '8px 8px 16px rgba(0,0,0,0.8), inset -3px -3px 6px rgba(0,0,0,0.4), inset 3px 3px 6px rgba(255,255,255,0.4)'
              : '5px 5px 10px rgba(0,0,0,0.7), inset -3px -3px 6px rgba(0,0,0,0.4), inset 3px 3px 6px rgba(255,255,255,0.4)',
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