import React from 'react';
import { BaseEdge, EdgeProps, getBazierPath, getStraightPath } from '@xyflow/react'

export default function AnimatedBallEdge({
    id, 
    sourceX, 
    sourceY, 
    targetX, 
    targetY, 
    sourcePostion, 
    targetPosition, 
    style = {}, 
    markerEnd, 
    data
}: EdgeProps) {
    const isStraight = sourceX !== targetX || sourceY !== targetY;

    const [edgePath] = isStraight
    ? getStraightPath({ sourceX, sourceY, targetX, targetY })
    : getBazierPath({ sourceX, sourceY, targetX, targetY, sourcePostion, targetPosition})

    return (
        <>
            <BaseEdge
        </>
    )


}
