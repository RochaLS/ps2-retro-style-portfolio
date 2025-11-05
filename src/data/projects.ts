// /src/data/projects.ts
export type Project = {
    title: string,
    imagePath: string,
    id: number 
}

export const projects: Project[] = [
    { id: 0, title: "Baito", imagePath: "/baito-logo.png" },
    { id: 1, title: "My Arubaito", imagePath: "/myarubaito-ilu.png" },
    { id: 2, title: "PetMe", imagePath: "/petme-logo.png" },
    { id: 3, title: "Emoji Cheatsheet", imagePath: "/emoji-logo.png" },
    { id: 4, title: "Roomies Share", imagePath: "/roomies-pay.png" },
    { id: 5, title: "PyonCal", imagePath: "/pyoncal-logo.png" },
    { id: 6, title: "Etch A Sketch", imagePath: "/sketch1.png" }
  ];