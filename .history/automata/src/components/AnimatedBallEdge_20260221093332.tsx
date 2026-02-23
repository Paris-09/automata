import React from 'react';
import { BaseEdge, type EdgeProps, getBezierPath, getStraightPath } from '@xyflow/react'

export function AnimatedBallEdge({
    id, 
    sourceX, 
    sourceY, 
    targetX, 
    targetY, 
    sourcePosition,
    targetPosition, 
    style = {}, 
    markerEnd, 
    data
}: EdgeProps) {
    const isSelfLoop = data?.isSelfLoop;

    const [edgePath] = isSelfLoop
    ? getBezierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition})
    : getStraightPath({ sourceX, sourceY, targetX, targetY })

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style = {style} />

            {data?.isAnimating && (
                <circle r='6' fill='#74DCFF'>
                    <animateMotion
                        dur='0.4s'
                        repeatCount='1'
                        path={edgePath}
                        fill='freeze'
                    />
                </circle>
            )}
        </>
    )
}
