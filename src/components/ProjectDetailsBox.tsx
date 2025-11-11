import type { Project } from "../data/projects"

interface ProjectDetailsBoxProps {
    project: Project
}

export function ProjectDetailsBox({ project }: ProjectDetailsBoxProps) {
    const isMobile = window.innerWidth < 768;
  
    return (
      <div
        className="
          w-64 h-64 bg-white
          transform-gpu
          transition-all
          duration-500
          ease-out
          rounded-md
        "
        style={{
          animation: isMobile ? 'none' : 'floatUpDown 2.4s ease-in-out infinite',
          boxShadow: '5px 5px 10px rgba(0,0,0,0.7)',
          backgroundImage: `url("${project.imagePath}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    );
  }