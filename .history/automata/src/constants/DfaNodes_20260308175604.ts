import type { Node } from "@xyflow/react";


const createNode = (
    id: string,
    x: number,
    y: number,
    isAccept: boolean = false,
    label: string = "",
): Node => ({
    id,
    type: 'circle',
    position: {x, y},
    data: {
        label: label,
        isAcceptState: isAccept,
        isHighlighting: false,
        isHighlighted: false,
        isValid: null,
    }
})

export const Dfa01Nodes: Node[] = [
    createNode('q0', 0, 0, false, "-"),
    createNode('q1', 150, -200),
    createNode('q2', 150, 0),
    createNode('q3', 150, 200),
    createNode('q4', 300, 0),
    createNode('q5', 450, 0),
    createNode('q6', 600, -200),
    createNode('q7', 600, 0),
    createNode('q8', 600, 200, true),
    createNode('q9', 750, -100, true),
    createNode('q10', 750, 100),
    createNode('q11', 900, -200, true),
    createNode('q12', 900, 200, true),
]

export const DfaAbNodes: Node[] = [
    createNode('q0', 0, 0),
    createNode('q1', 150, 0),
    createNode('q2', 300, -200),
    createNode('q3', 300, 200),
    createNode('q4', 450, -200),
    createNode('q5', 450, 0),
    createNode('q6', 450, 200),
    createNode('q7', 600, -200),
    createNode('q8', 600, 0),
    createNode('q9', 750, -200),
    createNode('q10', 750, 200),
    createNode('q11', 1350, -200),
    createNode('q12', 900, 0),
    createNode('q13', 900, 200),
    createNode('q14', 1050, 0),
    createNode('q15', 1200, 0, true),
    createNode('q16', 1200, 200, true),
]
