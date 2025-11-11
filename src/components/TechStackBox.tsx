interface TechStackBoxProps {
    imagePath: string
}

export function TechStackBox({imagePath}: TechStackBoxProps) {
    return (
        <div
          className="
            w-16 h-16 bg-white
            rounded-md
          "
          style={{
            boxShadow: '5px 5px 10px rgba(0,0,0,0.7)',
            backgroundImage: `url(${imagePath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
            )
}