export default function IconFemale ({ name, className = 'icon', width = 24, height = 24 }: { 
    name: string; className: string; width?: number; height?: number 
}) {
    return (
        <svg className={className} width={width} height={height}>
          <use xlinkHref={`/sprite.svg#${name}`} />
        </svg>
    );   
}
