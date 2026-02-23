import React from 'react';
import { BaseEdge, EdgeProps, getBazierPath, getStraightPath } from '@xyflow/react'

export default function AnimatedBallEdge({
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
    ? getBazierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition})
    : getStraightPath({ sourceX, sourceY, targetX, targetY })

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style = {style} />

            {data.isAnimating && (
                <circle r='6' fill='#74DCFF'></circle>
            )}


        </>
    )


}
