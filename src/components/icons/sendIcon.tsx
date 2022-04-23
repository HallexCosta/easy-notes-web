import { SVGProps } from 'react'

export default function SendIcon({
  width,
  height,
  fill
}: SVGProps<SVGElement>) {
  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 28 32"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.5 31.985L14 0.500002L0.5 31.985L11 32L14 9.5L17 32L27.5 31.985Z"
        fill={fill || 'black'}
      />
    </svg>
  )
}
