// /src/data/projects.ts
export type Project = {
    title: string,
    description: string,
    imagePath: string,
    id: number, 
    techStack?: string[]
    repoUrl?: string
    prodUrl?: string
    linkedinUrl?: string
    githubUrl?: string
}

export const projects: Project[] = [
    {   
        id: 0,
        title: "Baito", 
        description: "Baito helps part-time workers stay on top of their shifts and earnings with AI-powered schedule imports, calendar sync, and sleek home screen widgets.", 
        imagePath: "/baito-logo.png", 
        techStack: ["swift", "java", "springboot", "mysql"], 
        repoUrl: "https://github.com/RochaLS/MyArubaitoDashboard", 
        prodUrl: "https://baito.app" 
    },
    {  
        id: 1,
        title: "My Arubaito", 
        description: "A full-stack web app that helps part-time workers track shifts, predict income, and manage multiple jobs effortlessly with automation and clean visual insights.", 
        imagePath: "/myarubaito-ilu.png", 
        techStack: ["react", "next", "java", "springboot", "mysql"], 
        repoUrl: "https://github.com/RochaLS/MyArubaitoDashboard", 
        prodUrl: "https://myarubaito.com" 
    },
    { 
        id: 2, 
        title: "PetMe", 
        description: "PetMe! — a collaborative pet care app that lets you store, manage, and share your pet’s health and well-being information with family, friends, or roommates.", 
        imagePath: "/petme-logo.png", 
        techStack: ["swift", "firebase"], 
        repoUrl: "https://github.com/RochaLS/PetMe" 
    },
    { 
        id: 3, 
        title: "Emoji Cheatsheet", 
        description: "A lightweight web tool that lets you browse, filter, and copy emojis instantly through a clean and searchable interface.", 
        imagePath: "/emoji-logo.png", 
        techStack: ["react", "next"], 
        repoUrl: "https://github.com/RochaLS/emoji-cheatsheet", 
        prodUrl: "https://emoji-cheatsheet.vercel.app/" 
    },
    { 
        id: 4, 
        title: "Roomies Share", 
        description: "A web app for roommates to share their expenses in an easy and clean way.", 
        imagePath: "/roomies-pay.png", 
        techStack: ["react", "mongo-db"], 
        repoUrl: "https://github.com/RochaLS/roomies-share" 
    },
    { 
        id: 5, 
        title: "Etch A Sketch", 
        description: "Draw, shake, and start again just like the classic!", 
        imagePath: "/sketch1.png", 
        techStack: ["html", "css", "js"], 
        repoUrl: "https://github.com/RochaLS/Etch-A-Sketch", 
        prodUrl: "https://rochals.github.io/Etch-A-Sketch/" 
    },
    { 
        id: 6, 
        title: "PyonCal", 
        description: "An AI-powered tool that reads work schedule screenshots and automatically adds shifts to Google Calendar with one click", 
        imagePath: "/pyoncal-logo.png", 
        techStack: ["java", "springboot"], 
        repoUrl: "https://github.com/RochaLS/pyoncal" 
    },
    { 
        id: 7, 
        title: "About Me", 
        description: "I’m a developer with a product-first mindset, passionate about building tools that simplify and improve people’s lives including my own. I love turning ideas into polished, user-focused products that blend design and functionality. With experience across Java (Spring Boot), JavaScript (React, Next.js, Node.js), and Swift, I enjoy exploring every layer of development. Outside of coding, you’ll probably find me gaming or studying Japanese.", 
        imagePath: "/me.png",
        linkedinUrl: "https://www.linkedin.com/in/lucas-srocha/",
        githubUrl: "https://github.com/RochaLS"
    }
    
  ];