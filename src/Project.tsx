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
    let [selectedIndex, setSelectedIndex] = useState(0);
    let { projectId } = useParams();
    let navigate = useNavigate();
    const [isMuted, setIsMuted] = useState(() => {
        const saved = localStorage.getItem("isMuted");
        return saved ? JSON.parse(saved) : true;
      });

      useEffect(() => {
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
            case "Enter":
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
                            flex justify-center items-center gap-36">

                <div className="flex justify-center flex-col">
                    <ProjectDetailsBox project={projects[Number(projectId)]} />
                    
                    {projects[Number(projectId)].repoUrl && (
                <a
                    className={`text-center mt-12 font-ps2 text-2xl transition-colors duration-300 ${
                    selectedIndex === 0 ? "text-[#7bc9ff]" : "text-white hover:text-[#7bc9ff]"
                    }`}
                    href={projects[Number(projectId)].repoUrl}
                    target="_blank"
                    style={textStyle}
                >
                    [See Repository]
                </a>
                )}

                {projects[Number(projectId)].prodUrl && (
                <a
                    className={`text-center font-ps2 text-2xl transition-colors duration-300 ${
                    selectedIndex === 1 ? "text-[#7bc9ff]" : "text-white hover:text-[#7bc9ff]"
                    }`}
                    href={projects[Number(projectId)].prodUrl}
                    target="_blank"
                    style={textStyle}
                >
                    [See it Live]
                </a>
                )}

                {projects[Number(projectId)].linkedinUrl && (
                <a
                    className={`text-center mt-12 font-ps2 text-2xl transition-colors duration-300 ${
                    selectedIndex === 0 ? "text-[#7bc9ff]" : "text-white hover:text-[#7bc9ff]"
                    }`}
                    href={projects[Number(projectId)].linkedinUrl}
                    target="_blank"
                    style={textStyle}
                >
                    [See Linkedin]
                </a>
                )}

                {projects[Number(projectId)].githubUrl && (
                <a
                    className={`text-center font-ps2 text-2xl transition-colors duration-300 ${
                    selectedIndex === 1 ? "text-[#7bc9ff]" : "text-white hover:text-[#7bc9ff]"
                    }`}
                    href={projects[Number(projectId)].githubUrl}
                    target="_blank"
                    style={textStyle}
                >
                    [See Github]
                </a>
                )}
                </div>

                    <div className="max-w-xl">
                        <p className="font-ps2 text-3xl text-white text-center" style={textStyle}>Memory Card [ps2/1]</p>
                        <p className="text-4xl font-black text-center mt-6" style={textStyleSecondary}>{projects[Number(projectId)].title}</p>
                        <p className="font-ps2 text-xl text-white tracking-tight mt-6" style={textStyle}>
                        {projects[Number(projectId)].description}
                        </p>
                        <div className="flex gap-4 justify-center mt-12">
                            {projects[Number(projectId)].techStack?.map((tech, index) => (
                                <TechStackBox key={index} imagePath={`/${tech}-logo.png`} />
                            ))}
                        </div>
                    
                    </div>
                    <Navigation>
                        <>
                            <p className="cursor-pointer" onClick={() => {
                                navigate("/")
                            }}> [ESC] BACK TO MENU</p>
                        </>
                    </Navigation>
            </div>
        </CRT>
      )
}