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

    const [edgePath] = i
    ? getStraightPath({ sourceX, sourceY, targetX, targetY })
    : getBazierPath({ sourceX, sourceY, targetX, targetY, sourcePostion, targetPosition})

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style = {style} />

            <cirlce 


        </>
    )


}
