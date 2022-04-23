import { SVGProps } from 'react'

export default function AddNoteIcon({
  width,
  height,
  fill,
}: SVGProps<SVGElement>) {
  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 36 36"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36 20.5714H20.5714V36H15.4286V20.5714H0V15.4286H15.4286V0H20.5714V15.4286H36V20.5714Z"
        fill={fill || 'black'}
      />
    </svg>
  )
}
