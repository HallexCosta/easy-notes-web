import { SVGProps } from 'react'

export default function FavoriteNoteIcon({
  width,
  height,
  fill,
}: SVGProps<SVGElement>) {
  return (
    <svg width={width || 24}
      height={height || 24}
      viewBox="0 0 30 29"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 22.905L24.27 28.5L21.81 17.955L30 10.86L19.215 9.945L15 0L10.785 9.945L0 10.86L8.19 17.955L5.73 28.5L15 22.905Z"
        fill={fill || 'black'}
      />
    </svg>
  )
}
