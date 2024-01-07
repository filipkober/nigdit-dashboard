

type VerticalDividerProps = {
  className?: string,
  height: string,
}
export default function VerticalDivider({height, className = ""}: VerticalDividerProps) {
  return (
    <div className={`border-l-2 border-solid border-gray-600 h-[${height}] ` + className} />
  )
}
