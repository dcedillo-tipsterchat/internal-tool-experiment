import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted flex items-center justify-center text-gray-700", className)}
      {...props}
    />
  )
}

export { Skeleton }
