import { SVGProps } from 'react'

export default function DeleteNoteIcon({
  width,
  height,
  fill,
}: SVGProps<SVGElement>) {
  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 22 28"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 24.5C2 26.15 3.35 27.5 5 27.5H17C18.65 27.5 20 26.15 20 24.5V6.5H2V24.5ZM21.5 2H16.25L14.75 0.5H7.25L5.75 2H0.5V5H21.5V2Z"
          fill={fill || 'black'}
        />
    </svg>
  )
}
