import { useNavigate, useParams } from "react-router";
import CRT from "./components/CRT";
import { ProjectDetailsBox } from "./components/ProjectDetailsBox";
import { projects } from "./data/projects";
import { textStyle, textStyleSecondary } from "./App";
import { TechStackBox } from "./components/TechStackBox";
import { Navigation } from "./components/Navigation";
import { useEffect, useState } from "react";
import { navSound, selectSound } from "./data/sounds";


export default function Project() {
    const isMobile = window.innerWidth < 768; 
    let [selectedIndex, setSelectedIndex] = useState(0);
    let { projectId } = useParams();
    let navigate = useNavigate();
    const [isMuted, setIsMuted] = useState(() => {
        const saved = localStorage.getItem("isMuted");
        return saved ? JSON.parse(saved) : true;
      });

      useEffect(() => {
        if (isMobile) {
            return; 
          }

        const handleKeyDown = (e: KeyboardEvent) => {
          console.log("Key pressed: ", e.key)
    
        
          switch(e.key) {
            case "Escape":
                if (!isMuted) selectSound.play();
                navigate("/");
                break;
            case "ArrowUp":
                if (!isMuted) navSound.play();
                setSelectedIndex(prev => Math.max(0, prev - 1))
                console.log(selectedIndex)
                break;
            case "ArrowDown":
                if (!isMuted) navSound.play();
                setSelectedIndex(prev => Math.min(1, prev + 1))
                console.log(selectedIndex)
                break;
            case "z":
                if (!isMuted) selectSound.play();
                if (selectedIndex === 0) {
                    if (Number(projectId) === 7) {
                        window.open(projects[Number(projectId)].linkedinUrl, "_blank");
                    } else {
                        window.open(projects[Number(projectId)].repoUrl, "_blank");
                    }
                    
                } else if (selectedIndex === 1) {
                    if (Number(projectId) === 7) {
                        window.open(projects[Number(projectId)].githubUrl, "_blank");
                    } else {
                        window.open(projects[Number(projectId)].prodUrl, "_blank");
                    }
                    
                }
                
          }
        }

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
          };
    })

    return (
        <CRT>
            <div className="min-h-screen bg-gradient-to-br from-stone-300 via-stone-500 to-stone-900
                flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-36 px-6 py-8">

                <div className="flex justify-center flex-col">
                    <ProjectDetailsBox project={projects[Number(projectId)]} />
                    
                    {projects[Number(projectId)].repoUrl && (
                <a
                    className={`text-center mt-12 font-ps2 text-2xl transition-colors duration-300 ${
                    selectedIndex === 0 && !isMobile ? "text-[#7bc9ff]" : "text-white hover:text-[#7bc9ff]"
                    }`}
                    href={projects[Number(projectId)].repoUrl}
                    target="_blank"
                    style={textStyle}
                    onClick={() => {
                        if (!isMuted) selectSound.play();
                    }}
                    aria-label={`View ${projects[Number(projectId)].title} source code on GitHub`}
                >
                    [See Repository]
                </a>
                )}

                {projects[Number(projectId)].prodUrl && (
                <a
                    className={`text-center font-ps2 text-2xl transition-colors duration-300 ${
                    selectedIndex === 1 && !isMobile ? "text-[#7bc9ff]" : "text-white hover:text-[#7bc9ff]"
                    }`}
                    href={projects[Number(projectId)].prodUrl}
                    target="_blank"
                    style={textStyle}
                    onClick={() => {
                        if (!isMuted) selectSound.play();
                    }}
                    aria-label={`View ${projects[Number(projectId)].title} live.`}
                >
                    [See it Live]
                </a>
                )}

                {projects[Number(projectId)].linkedinUrl && (
                <a
                    className={`text-center mt-12 font-ps2 text-2xl transition-colors duration-300 ${
                    selectedIndex === 0 && !isMobile ? "text-[#7bc9ff]" : "text-white hover:text-[#7bc9ff]"
                    }`}
                    href={projects[Number(projectId)].linkedinUrl}
                    target="_blank"
                    style={textStyle}
                    onClick={() => {
                        if (!isMuted) selectSound.play();
                    }}
                    aria-label="Go to Lucas's Linkedin"
                >
                    [See Linkedin]
                </a>
                )}

                {projects[Number(projectId)].githubUrl && (
                <a
                    className={`text-center font-ps2 text-2xl transition-colors duration-300 ${
                    selectedIndex === 1 && !isMobile ? "text-[#7bc9ff]" : "text-white hover:text-[#7bc9ff]"
                    }`}
                    href={projects[Number(projectId)].githubUrl}
                    target="_blank"
                    style={textStyle}
                    onClick={() => {
                        if (!isMuted) selectSound.play();
                    }}
                    aria-label="Go to Lucas's Github profile page"
                >
                    [See Github]
                </a>
                )}
                </div>

                    <div className="max-w-xl px-4 sm:px-0 text-center lg:text-left">
                        <p className="hidden sm:block font-ps2 text-2xl sm:text-3xl text-white text-center lg:text-left" style={textStyle}>Memory Card [ps2/1]</p>
                        <p className="text-2xl sm:text-3xl md:text-4xl font-black text-center lg:text-left mt-2 sm:mt-6" style={textStyleSecondary}>{projects[Number(projectId)].title}</p>
                        <p className="font-ps2 text-base sm:text-lg lg:text-xl text-white tracking-tight mt-4 sm:mt-6 leading-relaxed text-center lg:text-left px-2 sm:px-0" style={textStyle}>
                        {projects[Number(projectId)].description}
                        </p>
                        <div className="flex flex-wrap gap-5 sm:gap-6 justify-center lg:justify-start mt-10 sm:mt-12 px-6 sm:px-2 lg:px-0 pb-8" >
                            {projects[Number(projectId)].techStack?.map((tech, index) => (
                                <TechStackBox key={index} imagePath={`/${tech}-logo.png`} />
                            ))}
                        </div>
                    
                    </div>
                    {!isMobile && (
                        <Navigation>
                            <>
                                <p className="cursor-pointer" onClick={() => {
                                    if (!isMuted) selectSound.play();
                                    navigate("/");
                                }}> [ESC] BACK TO MENU</p>

                                <p >USE [UP] AND [DOWN] ARROWS TO NAVIGATE</p>
                                <p>[Z] CONFIRM</p>
                            </>
                        </Navigation>
                    )}

            </div>
        </CRT>
      )
}