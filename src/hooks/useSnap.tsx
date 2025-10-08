
"use client"

import * as React from "react"
import {
  motion,
  useMotionValue,
  useDragControls,
  useAnimate,
  type PanInfo,
} from "framer-motion"

type SnapPoint = number | string

type UseSnapProps<T> = {
  snapPoints?: SnapPoint[]
  initialSnap?: T
  constraints?: React.RefObject<Element> | false
  config?: {
    mass: number
    damping: number
    stiffness: number
  }
}

const defaultSpring = {
  mass: 0.2,
  damping: 25,
  stiffness: 180,
}

export function useSnap<T extends HTMLElement>({
  snapPoints: rawSnapPoints,
  constraints: constraintsBoxRef,
  config = defaultSpring,
}: UseSnapProps<T>) {
  const [scope, animate] = useAnimate<T>()
  const ref = scope.current
  const x = useMotionValue(0)
  const dragControls = useDragControls()
  const [hasMeasured, setHasMeasured] = React.useState(false)

  const resolveConstraints = React.useCallback(() => {
    if (constraintsBoxRef === false) {
      return { right: 0, left: 0 }
    } else {
      const constraints =
        "current" in constraintsBoxRef
          ? constraintsBoxRef.current
          : constraintsBoxRef
      if (!constraints) {
        throw new Error("Constraints wasn't measured")
      }

      const { right, left } = constraints.getBoundingClientRect()
      return { right, left }
    }
  }, [constraintsBoxRef])

  const onDragStart = React.useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent) => {
      dragControls.start(event, { snapToCursor: true })
    },
    [dragControls]
  )

  const convertSnappoints = React.useCallback(
    (snapPoints: SnapPoint[]) => {
      const { right, left } = resolveConstraints()
      const width = right - left
      const result = snapPoints.map((snapPoint) => {
        if (typeof snapPoint === "string") {
          const point = parseFloat(snapPoint)
          if (snapPoint.endsWith("%")) {
            return (point / 100) * width
          }
          return point
        }
        return snapPoint
      })
      return result
    },
    [resolveConstraints]
  )

  const snapTo = React.useCallback(
    (index: number) => {
      if (!rawSnapPoints) {
        return
      }

      const snapPoint = convertSnappoints(rawSnapPoints)[index]
      animate(scope.current, { x: snapPoint }, config)
    },
    [rawSnapPoints, animate, scope, config, convertSnappoints]
  )

  const onDragEnd = React.useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!rawSnapPoints) {
        return
      }

      const snapPoints = convertSnappoints(rawSnapPoints)
      const point = info.point.x
      const { right: r, left: l } = resolveConstraints()
      const right = r ?? 0
      const left = l ?? 0
      const position = right - left - point + left
      const nearest = snapPoints.reduce((prev, curr) => {
        return Math.abs(curr - position) < Math.abs(prev - position)
          ? curr
          : prev
      })

      const snapToIndex = snapPoints.indexOf(nearest)
      snapTo(snapToIndex)
    },
    [rawSnapPoints, resolveConstraints, convertSnappoints, snapTo]
  )

  React.useLayoutEffect(() => {
    if (constraintsBoxRef && "current" in constraintsBoxRef && constraintsBoxRef.current) {
      setHasMeasured(true)
    } else if (constraintsBoxRef !== false) {
      setHasMeasured(true)
    }
  }, [constraintsBoxRef])

  return {
    ref: scope,
    x,
    snapTo,
    onDragStart,
    onDragEnd,
    dragControls,
    hasMeasured
  }
}
