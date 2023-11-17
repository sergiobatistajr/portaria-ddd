import { Skeleton } from "./ui/skeleton"

export default function SkeletonDataTable() {
  return (
    <div className="flex flex-col items-center space-y-0.5">
      <div className="flex justify-end items-end w-full">
        <Skeleton className="h-[32px] w-[70px]" />
      </div>
      <Skeleton className="h-[56px] w-full" />
      <Skeleton className="h-[56px] w-full" />
      <Skeleton className="h-[56px] w-full" />
      <Skeleton className="h-[56px] w-full" />
      <Skeleton className="h-[56px] w-full" />
      <Skeleton className="h-[56px] w-full" />
      <Skeleton className="h-[56px] w-full" />
      <Skeleton className="h-[56px] w-full" />
      <Skeleton className="h-[56px] w-full" />
      <Skeleton className="h-[56px] w-full" />
      <Skeleton className="h-[56px] w-full" />
      <Skeleton className="h-[56px] w-full" />
    </div>
  )
}
