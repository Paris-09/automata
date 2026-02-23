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
    data,
    pathOptions
}: EdgeProps) {
    const isSelfLoop = data?.isSelfLoop;

    const [edgePath] = isSelfLoop
    ? getBezierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, curvature: pathOptions?.curvature as number })
    : getStraightPath({ sourceX, sourceY, targetX, targetY })

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />

            {/* !! checks if it's a number (timestamp) or true */}
            {!!data?.isAnimating && edgePath && (
                <circle 
                    key={data.isAnimating as React.Key} 
                    r='7' 
                    fill='#74DCFF' 
                    style={{ filter: 'drop-shadow(0 0 6px #74DCFF)' }}
                >
                    <animateMotion
                        dur='0.8s' /* Slowed down to see it move */
                        repeatCount='1'
                        path={edgePath}
                        fill='freeze'
                    />
                </circle>
            )}
        </>
    )
}