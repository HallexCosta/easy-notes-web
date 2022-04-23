import { SVGProps } from 'react'

export default function ViewListIcon({
  width,
  height,
  fill,
}: SVGProps<SVGElement>) {
  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 28 22"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 14H6.5V8H0.5V14ZM0.5 21.5H6.5V15.5H0.5V21.5ZM0.5 6.5H6.5V0.5H0.5V6.5ZM8 14H27.5V8H8V14ZM8 21.5H27.5V15.5H8V21.5ZM8 0.5V6.5H27.5V0.5H8Z" 
        fill={fill || 'black'}
      />
    </svg>
  )
}
