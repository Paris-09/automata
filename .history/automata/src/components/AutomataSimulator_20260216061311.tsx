import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp } from "lucide-react"; 

import ReactFlow, { Background, Controls, MarkerType } from "reactflow";
import type { Edge, Node } from "reactflow";

import { CircleNode } from "./CircleNode";
import "reactflow/dist/style.css";

type ModelType = "dfa" | "cfg" | "pda";
type RegexChoice = "regex1" | "regex2";

interface TestRow {
  id: number;
  input: string;
  status: "VALID" | "INVALID" | "READY" | "No string";
}

type Props = {
  selectedRegex: RegexChoice;
  selectedModel: ModelType;
  handleNavigate: (id: string) => void; 
};

const nodeTypes = {
    circle: CircleNode,
};

const defaultEdgeOptions = {
    // type: "smoothstep", // Gives those nice right-angle bends for DFAs
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#333",
    },
};

/**
 * DEMO graph generator.
 */
function getDemoGraph(selectedRegex: RegexChoice) {
  if (selectedRegex === "regex1") {
    const nodes: Node[] = [
      {
        id: "q0",
        position: { x: 0, y: 150 },
        data: { label: "q0" },
        style: {
          borderRadius: 999,
          width: 60,
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "white",
          border: "3px solid black",
          fontWeight: 700,
        },
      },
    ];

    const edges: Edge[] = [
      {
        id: "q0-A-q0",
        source: "q0",
        target: "q0",
        label: "A",
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { strokeWidth: 2 },
      },
    ];

    return { nodes, edges };
  }

  const nodes: Node[] = [
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
    {
      id: "q0",
      type: "circle",
      position: { x: 0, y: 0 },
      data: {
          label: "q0",
          isHighlighted: false,
          isAcceptState: false,
      },
    },

    {
      id: "q1",
      type: "circle",
      position: { x: 150, y: 0 },
      data: {
          label: "q1",
          isHighlighted: false,
          isAcceptState: false,
      },
    },

    {
      id: "q2",
      type: "circle",
      position: { x: 300, y: -200 },
      data: {
          label: "q2",
          isHighlighted: false,
          isAcceptState: false,
      },
    },
    {
      id: "q3",
      type: "circle",
      position: { x: 300, y: 200 },
      data: {
          label: "q3",
          isHighlighted: false,
          isAcceptState: false,
      },
    },

    {
      id: "q4",
      type: "circle",
      position: { x: 450, y: -200 },
      data: {
          label: "q4",
          isHighlighted: false,
          isAcceptState: false,
      },
    },
    {
        id: "q5",
        type: "circle",
        position: { x: 450, y: 0 },
        data: {
            label: "q5",
            isHighlighted: false,
            isAcceptState: false,
        },
    },
    {
      id: "q6",
      type: "circle",
      position: { x: 450, y: 200 },
      data: {
          label: "q6",
          isHighlighted: false,
          isAcceptState: false,
      },
    },

    {
      id: "q7",
      type: "circle",
      position: { x: 600, y: -200 },
      data: {
          label: "q7",
          isHighlighted: false,
          isAcceptState: false,
      },
    },
    {
      id: "q8",
      type: "circle",
      position: { x: 600, y: 0 },
      data: {
          label: "q8",
          isHighlighted: false,
          isAcceptState: false,
      },
    },

    {
      id: "q9",
      type: "circle",
      position: { x: 750, y: -200 },
      data: {
          label: "q9",
          isHighlighted: false,
          isAcceptState: false,
      },
    },
    {
      id: "q10",
      type: "circle",
      position: { x: 750, y: 200 },
      data: {
          label: "q10",
          isHighlighted: false,
          isAcceptState: false,
      },
    },

    {
        id: "q11",
        type: "circle",
        position: { x: 900, y: -200 },
        data: {
            label: "q11",
            isHighlighted: false,
            isAcceptState: false,
        },
    },
    {
        id: "q12",
        type: "circle",
        position: { x: 900, y: 0 },
        data: {
            label: "q12",
            isHighlighted: false,
            isAcceptState: false,
        },
    },
    {
        id: "q13",
        type: "circle",
        position: { x: 900, y: 200 },
        data: {
            label: "q13",
            isHighlighted: false,
            isAcceptState: false,
        },
    },

    {
        id: "q14",
        type: "circle",
        position: { x: 1050, y: 0 },
        data: {
            label: "q14",
            isHighlighted: false,
            isAcceptState: false,
        },
    },

    {
        id: "q15",
        type: "circle",
        position: { x: 1200, y: 0 },
        data: {
            label: "q15",
            isHighlighted: false,
            isAcceptState: true,
        },
    },
    {
        id: "q16",
        type: "circle",
        position: { x: 1200, y: 200 },
        data: {
            label: "q16",
            isHighlighted: false,
            isAcceptState: true,
        },
    },
  ];

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

  return { nodes, edges };
}

export function AutomataSimulator({ selectedRegex, selectedModel, handleNavigate }: Props) {
  const [rows, setRows] = useState<TestRow[]>(
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      input: "",
      status: "No string",
    }))
  );

  const handleInputChange = (id: number, value: string) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            input: value,
            status: value.length === 0 ? "No string" : "READY",
          };
        }
        return row;
      })
    );
  };

  const handleSimulate = (rowId: number, input: string) => {
    let status: TestRow["status"] = "No string";
    if (input.length === 0) status = "No string";
    else status = /^[A]+$/.test(input) ? "VALID" : "INVALID";

    setRows((prev) =>
      prev.map((r) => (r.id === rowId ? { ...r, status } : r))
    );
  };

  const { nodes, edges } = useMemo(() => {
    return getDemoGraph(selectedRegex);
  }, [selectedRegex]);

  useEffect(() => {
    setRows((prev) =>
      prev.map((r) => ({
        ...r,
        status: r.input.length === 0 ? "No string" : r.status,
      }))
    );
  }, [selectedRegex, selectedModel]);

  return (
    <div>
      {/* Header Container with Arrow pointing Up */}
      <div className="flex items-center gap-3 ml-7 mb-10 mt-35 group">
        <h2 id="configuration" className="text-2xl font-semibold text-left tracking-wide">
          Regex & Automata Configuration
        </h2>
        <button
          onClick={() => handleNavigate("selector")} // Go to selector
          className="p-1 rounded-full hover:bg-gray-100 transition-all duration-200 group-hover:-translate-y-1 cursor-pointer"
          aria-label="Scroll to Selector"
        >
          <ChevronUp size={28} className="text-[#74DCFF]" strokeWidth={3} />
        </button>
      </div>

      <div className="grid grid-cols-[360px_1fr] gap-12 w-full max-w-full bg-white py-4 px-7 pt-1 overflow-x-hidden">
        {/* Left Column */}
        <div className="min-w-0">
          <div className="grid grid-cols-[1.2fr_0.8fr_1fr] gap-4 mb-6">
            <span className="font-semibold text-md tracking-wider text-center text-gray-400">Enter Strings</span>
            <span className="font-semibold text-md tracking-wider text-center text-gray-400">Status</span>
            <span></span>
          </div>

          <div className="space-y-5">
            {rows.map((row) => (
              <div key={row.id} className="grid grid-cols-[1.2fr_0.8fr_1fr] gap-4 items-center">
                <Input
                  placeholder="Type a string"
                  value={row.input}
                  onChange={(e) => handleInputChange(row.id, e.target.value)}
                  className="bg-gray-100 border-none rounded-none h-10 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-300"
                />
                <span className={`text-[12px] font-bold tracking-tight truncate ${
                  row.status === "VALID" ? "text-green-600" : row.status === "INVALID" ? "text-red-600" : row.status === "READY" ? "text-yellow-600" : "text-gray-300"
                }`}>
                  {row.status === "No string" ? "NO STRING" : row.status}
                </span>
                <Button
                  variant="secondary"
                  disabled={row.input === ""}
                  onClick={() => handleSimulate(row.id, row.input)}
                  className="text-s bg-[#1a1a1a] text-white hover:bg-[#74DCFF] hover:text-black rounded-lg h-10 shadow-sm cursor-pointer transition-all disabled:opacity-20"
                >
                  Simulate
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="min-w-0">
          <span className="font-semibold text-md tracking-wider block mb-6 text-left text-gray-400">Transition Diagram</span>
          <div className="w-full h-[580px] bg-[#D9D9D9] border border-gray-200 overflow-hidden">
            {selectedModel !== "dfa" ? (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-lg text-black font-normal tracking-tight text-center px-4">
                  Graph rendering for {selectedModel.toUpperCase()} will be implemented soon...
                </p>
              </div>
            ) : (
              <ReactFlow 
                nodes={nodes}
                nodeTypes = {nodeTypes}
                edges={edges}
                fitView 
                panOnDrag 
                zoomOnScroll 
                zoomOnPinch 
                nodesConnectable={false}
                defaultEdgeOptions={defaultEdgeOptions}
              >
                <Background />
                <Controls />
              </ReactFlow>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}