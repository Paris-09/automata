import type { Node } from "@xyflow/react";


const createNode = (
    id: string,
    x: number,
    y: number,
    isAccept: boolean = false
): Node => ({
    id,
    type: 'circle',
    position: {x, y},
    data: {
        label: id,
        ishighlighted: false,
        isAcceptState: isAccept
    }
})

export const DfaAbNodes: Node[] = [
    createNode('q0', 0, 0),
    createNode('q1', 150, 0),
    createNode('q2', 300, -200),
    createNode('q3', 300, 200),
    createNode('q4', 450, -200),
    createNode('q5', 450, -150),
    createNode('q6', 450, 200),
    createNode('q7', 600, -200),
    createNode('q8', 600, 0),
    createNode('q9', 750, -200),
    createNode('q10', 750, 200),
    createNode('q11', 900, -200),
    createNode('q12', 900, 0),
    createNode('q13', 900, 200),
    createNode('q14', 1050, 0),
    createNode('q15', 1200, 0, true),
    createNode('q16', 1200, 200, true),
]

// const nodes: Node[] = [
    // {
    //   id: "q0",
    //   position: { x: 0, y: 150 },
    //   data: { label: "q0" },
    //   style: {
    //     borderRadius: 999,
    //     width: 60,
    //     height: 60,
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     background: "white",
    //     border: "3px solid black",
    //     fontWeight: 700,
    //   },
    // },
    // {
    //   id: "q1",
    //   position: { x: 250, y: 150 },
    //   data: { label: "q1" },
    //   style: {
    //     borderRadius: 999,
    //     width: 60,
    //     height: 60,
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     background: "white",
    //     border: "1px solid #555",
    //     fontWeight: 700,
    //   },
    // },
  //   {
  //     id: "q0",
  //     type: "circle",
  //     position: { x: 0, y: 0 },
  //     data: {
  //         label: "q0",
  //         isHighlighted: false,
  //         isAcceptState: false,
  //     },
  //   },

  //   {
  //     id: "q1",
  //     type: "circle",
  //     position: { x: 150, y: 0 },
  //     data: {
  //         label: "q1",
  //         isHighlighted: false,
  //         isAcceptState: false,
  //     },
  //   },

  //   {
  //     id: "q2",
  //     type: "circle",
  //     position: { x: 300, y: -200 },
  //     data: {
  //         label: "q2",
  //         isHighlighted: false,
  //         isAcceptState: false,
  //     },
  //   },
  //   {
  //     id: "q3",
  //     type: "circle",
  //     position: { x: 300, y: 200 },
  //     data: {
  //         label: "q3",
  //         isHighlighted: false,
  //         isAcceptState: false,
  //     },
  //   },

  //   {
  //     id: "q4",
  //     type: "circle",
  //     position: { x: 450, y: -200 },
  //     data: {
  //         label: "q4",
  //         isHighlighted: false,
  //         isAcceptState: false,
  //     },
  //   },
  //   {
  //       id: "q5",
  //       type: "circle",
  //       position: { x: 450, y: 0 },
  //       data: {
  //           label: "q5",
  //           isHighlighted: false,
  //           isAcceptState: false,
  //       },
  //   },
  //   {
  //     id: "q6",
  //     type: "circle",
  //     position: { x: 450, y: 200 },
  //     data: {
  //         label: "q6",
  //         isHighlighted: false,
  //         isAcceptState: false,
  //     },
  //   },

  //   {
  //     id: "q7",
  //     type: "circle",
  //     position: { x: 600, y: -200 },
  //     data: {
  //         label: "q7",
  //         isHighlighted: false,
  //         isAcceptState: false,
  //     },
  //   },
  //   {
  //     id: "q8",
  //     type: "circle",
  //     position: { x: 600, y: 0 },
  //     data: {
  //         label: "q8",
  //         isHighlighted: false,
  //         isAcceptState: false,
  //     },
  //   },

  //   {
  //     id: "q9",
  //     type: "circle",
  //     position: { x: 750, y: -200 },
  //     data: {
  //         label: "q9",
  //         isHighlighted: false,
  //         isAcceptState: false,
  //     },
  //   },
  //   {
  //     id: "q10",
  //     type: "circle",
  //     position: { x: 750, y: 200 },
  //     data: {
  //         label: "q10",
  //         isHighlighted: false,
  //         isAcceptState: false,
  //     },
  //   },

  //   {
  //     id: "q11",
  //     type: "circle",
  //     position: { x: 900, y: -200 },
  //     data: {
  //         label: "q11",
  //         isHighlighted: false,
  //         isAcceptState: false,
  //     },
  //   },
  //   {
  //     id: "q12",
  //     type: "circle",
  //     position: { x: 900, y: 0 },
  //     data: {
  //         label: "q12",
  //         isHighlighted: false,
  //         isAcceptState: false,
  //     },
  //   },
  //   {
  //     id: "q13",
  //     type: "circle",
  //     position: { x: 900, y: 200 },
  //     data: {
  //         label: "q13",
  //         isHighlighted: false,
  //         isAcceptState: false,
  //     },
  //   },

  //   {
  //     id: "q14",
  //     type: "circle",
  //     position: { x: 1050, y: 0 },
  //     data: {
  //         label: "q14",
  //         isHighlighted: false,
  //         isAcceptState: false,
  //     },
  //   },

  //   {
  //     id: "q15",
  //     type: "circle",
  //     position: { x: 1200, y: 0 },
  //     data: {
  //         label: "q15",
  //         isHighlighted: false,
  //         isAcceptState: true,
  //     },
  //   },
  //   {
  //     id: "q16",
  //     type: "circle",
  //     position: { x: 1200, y: 200 },
  //     data: {
  //         label: "q16",
  //         isHighlighted: false,
  //         isAcceptState: true,
  //     },
  //   },
  // ];