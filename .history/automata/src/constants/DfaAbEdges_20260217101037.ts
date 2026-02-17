import type { Edge } from "@xyflow/react";

type HorizontalSide = 'top' | 'bottom'
type HorizontalPos = 'left' | 'mid' | 'right'
type VerticalSide = 'left' | 'right'
type VerticalPos = 'top' | 'mid' | 'bottom'

const createEdge = (
    id: string,
    sourceHandle: `source-${HorizontalSide}-${HorizontalPos}` | `source-${VerticalSide}-${VerticalPos}`,
    targetHandle: `target-${HorizontalSide}-${HorizontalPos}` | `target-${VerticalSide}-${VerticalPos}`,
): Edge => {

    const [source, label, target] = id.split('-')

    return {
        id,
        source: source,
        target: target,
        label: label,
        sourceHandle,
        targetHandle
    }
}

const DfaAbEdges: Edge[] = [
    createEdge("q0-a,b-q1", "source-right-mid", "target-left-mid"),

    createEdge("q1-a-q2", "source-top-mid", "target-left-mid"),
    createEdge("q1-b-q3", "source-bottom-mid", "target-left-mid"),

    createEdge("q2-b-q3", "source-bottom-right", "target-top-right"),
    createEdge("q2-a-q4", "source-right-mid", "target-left-mid"),

    createEdge("q3-a-q2", "source-top-left", "target-bottom-left"),
    createEdge("q3-b-q6", "source-right-mid", "target-left-mid"),

    createEdge("q4-b-q5", "source-bottom-mid", "target-top-mid"),
    createEdge("q4-a-q7", "source-right-mid", "target-left-mid"),

    createEdge("q5-b-q6", "source-bottom-mid", "target-top-mid"),
    createEdge("q5-a-q9", "source-right-top", "target-left-bottom"),

    createEdge("q6-a-q8", "source-right-top", "target-bottom-left"),
    createEdge("q6-b-q10", "source-right-mid", "target-left-mid"),

    createEdge("q7-a-q7", "source-left-top", "target-top-right"),
    createEdge("q7-b-q7", "source-right-mid", "target-left-mid"),

    createEdge("q8-a-q4", "source-top-left", "target-bottom-right"),
    createEdge("q8-b-q9", "source-top-right", "target-bottom-left"),

    createEdge("q9-a-q11", "source-right-mid", "target-left-mid"),
    createEdge("q0-a,b-q1", "source-right-mid", "target-left-mid"),
    
    createEdge("q0-a,b-q1", "source-right-mid", "target-left-mid"),
    createEdge("q0-a,b-q1", "source-right-mid", "target-left-mid"),
    createEdge("q0-a,b-q1", "source-right-mid", "target-left-mid"),

    
]

const edges: Edge[] = [
// { id: "q0-a-q0", source: "q0", target: "q0", label: "a", markerEnd: { type: MarkerType.ArrowClosed }, style: { strokeWidth: 2 } },
// { id: "q0-b-q1", source: "q0", target: "q1", label: "b", markerEnd: { type: MarkerType.ArrowClosed }, style: { strokeWidth: 2 } },
// { id: "q1-a-q1", source: "q1", target: "q1", label: "a", markerEnd: { type: MarkerType.ArrowClosed }, style: { strokeWidth: 2 } },
// { id: "q1-b-q0", source: "q1", target: "q0", label: "b", markerEnd: { type: MarkerType.ArrowClosed }, style: { strokeWidth: 2 } },
{
    id: "q0-a,b-q1",
    source: "q0",
    target: "q1",
    sourceHandle: "source-right-mid",
    targetHandle: "target-left-mid",
    label: "a, b",
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
},

{
    id: "q1-a-q2",
    source: "q1",
    target: "q2",
    sourceHandle: "source-top-mid",
    targetHandle: "target-left-mid",
    label: "a",
},
{
    id: "q1-b-q3",
    source: "q1",
    target: "q3",
    sourceHandle: "source-bottom-mid",
    targetHandle: "target-left-mid",
    label: "b",
},

{
    id: "q2-b-q3",
    source: "q2",
    target: "q3",
    sourceHandle: "source-bottom-right",
    targetHandle: "target-top-right",
    label: "b",
},
{
    id: "q2-a-q4",
    source: "q2",
    target: "q4",
    sourceHandle: "source-right-mid",
    targetHandle: "target-left-mid",
    label: "a",
},

{
    id: "q3-a-q2",
    source: "q3",
    target: "q2",
    sourceHandle: "source-top-left",
    targetHandle: "target-bottom-left",
    label: "a",
},
{
    id: "q3-b-q6",
    source: "q3",
    target: "q6",
    sourceHandle: "source-right-mid",
    targetHandle: "target-left-mid",
    label: "b",
},

{
    id: "q4-b-q5",
    source: "q4",
    target: "q5",
    sourceHandle: "source-bottom-mid",
    targetHandle: "target-top-mid",
    label: "b",
},
{
    id: "q4-a-q7",
    source: "q4",
    target: "q7",
    sourceHandle: "source-right-mid",
    targetHandle: "target-left-mid",
    label: "a",
},

{
    id: "q5-b-q6",
    source: "q5",
    target: "q6",
    sourceHandle: "source-bottom-mid",
    targetHandle: "target-top-mid",
    label: "b",
},
{
    id: "q5-a-q9",
    source: "q5",
    target: "q9",
    sourceHandle: "source-right-top",
    targetHandle: "target-left-bottom",
    label: "a",
},

{
    id: "q6-a-q8",
    source: "q6",
    target: "q8",
    sourceHandle: "source-right-top",
    targetHandle: "target-bottom-left",
    label: "a",
},
{
    id: "q6-b-q10",
    source: "q6",
    target: "q10",
    sourceHandle: "source-right-mid",
    targetHandle: "target-left-mid",
    label: "b",
},

{
    id: "q7-a-q7",
    source: "q7",
    target: "q7",
    sourceHandle: "source-left-top",
    targetHandle: "target-top-right",
    label: "a",
},
{
    id: "q7-b-q7",
    source: "q7",
    target: "q9",
    sourceHandle: "source-right-mid",
    targetHandle: "target-left-mid",
    label: "b",
},

{
    id: "q8-a-q4",
    source: "q8",
    target: "q4",
    sourceHandle: "source-top-left",
    targetHandle: "target-bottom-right",
    label: "a",
},
{
    id: "q8-b-q9",
    source: "q8",
    target: "q9",
    sourceHandle: "source-top-right",
    targetHandle: "target-bottom-left",
    label: "b",
},

{
    id: "q9-a-q11",
    source: "q9",
    target: "q11",
    sourceHandle: "source-right-mid",
    targetHandle: "target-left-mid",
    label: "a",
},
{
    id: "q9-b-q12",
    source: "q9",
    target: "q12",
    sourceHandle: "source-bottom-right",
    targetHandle: "target-left-mid",
    label: "b",
},

{
    id: "q10-a-q9",
    source: "q10",
    target: "q9",
    sourceHandle: "source-top-mid",
    targetHandle: "target-bottom-mid",
    label: "a",
},
{
    id: "q10-b-q10",
    source: "q10",
    target: "q10",
    sourceHandle: "source-bottom-left",
    targetHandle: "target-right-top",
    label: "b",
},

{
    id: "q11-a-q11",
    source: "q11",
    target: "q11",
    sourceHandle: "source-top-left",
    targetHandle: "target-right-top",
    label: "a",
},
{
    id: "q11-b-q14",
    source: "q11",
    target: "q14",
    sourceHandle: "source-right-mid",
    targetHandle: "target-top-mid",
    label: "b",
},

{
    id: "q12-a-q12",
    source: "q12",
    target: "q12",
    sourceHandle: "source-top-left",
    targetHandle: "target-right-top",
    label: "a",
},
{
    id: "q12-b-q13",
    source: "q12",
    target: "q13",
    sourceHandle: "source-bottom-mid",
    targetHandle: "target-top-mid",
    label: "b",
},

{
    id: "q13-b-q14",
    source: "q13",
    target: "q14",
    sourceHandle: "source-right-top",
    targetHandle: "target-bottom-mid",
    label: "b",
},
{
    id: "q13-a-q16",
    source: "q13",
    target: "q16",
    sourceHandle: "source-right-mid",
    targetHandle: "target-left-mid",
    label: "a",
},

{
    id: "q14-b-q12",
    source: "q14",
    target: "q12",
    sourceHandle: "source-left-mid",
    targetHandle: "target-right-mid",
    label: "b",
},
{
    id: "q14-a-q15",
    source: "q14",
    target: "q15",
    sourceHandle: "source-right-top",
    targetHandle: "target-left-top",
    label: "a",
},

{
    id: "q15-b-q14",
    source: "q15",
    target: "q14",
    sourceHandle: "source-left-bottom",
    targetHandle: "target-right-bottom",
    label: "b",
},
{
    id: "q15-a-q16",
    source: "q15",
    target: "q16",
    sourceHandle: "source-bottom-mid",
    targetHandle: "target-top-mid",
    label: "a",
},
];
