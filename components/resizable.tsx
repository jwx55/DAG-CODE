"use client"

import type React from "react"

import { GripVertical, GripHorizontal } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"
import { cn } from "@/lib/utils"

interface ResizableProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical"
  defaultSize?: {
    width?: number | string
    height?: number | string
  }
}

export function Resizable({
  children,
  direction = "horizontal",
  defaultSize = { width: "100%", height: 300 },
  className,
  ...props
}: ResizableProps) {
  return (
    <div
      className={cn("relative", direction === "horizontal" ? "flex" : "block", className)}
      style={{
        width: typeof defaultSize.width === "number" ? `${defaultSize.width}px` : defaultSize.width,
        height: typeof defaultSize.height === "number" ? `${defaultSize.height}px` : defaultSize.height,
      }}
      {...props}
    >
      <ResizablePrimitive.PanelGroup
        direction={direction === "horizontal" ? "horizontal" : "vertical"}
        className="w-full h-full"
      >
        <ResizablePrimitive.Panel defaultSize={100} className="w-full h-full overflow-hidden">
          {children}
        </ResizablePrimitive.Panel>
        <ResizablePrimitive.PanelResizeHandle
          className={cn(
            "flex items-center justify-center",
            direction === "horizontal"
              ? "w-2 cursor-col-resize border-x border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
              : "h-2 cursor-row-resize border-y border-zinc-700 bg-zinc-800 hover:bg-zinc-700",
          )}
        >
          {direction === "horizontal" ? (
            <GripVertical className="h-4 w-4 text-zinc-500" />
          ) : (
            <GripHorizontal className="h-4 w-4 text-zinc-500" />
          )}
        </ResizablePrimitive.PanelResizeHandle>
      </ResizablePrimitive.PanelGroup>
    </div>
  )
}
