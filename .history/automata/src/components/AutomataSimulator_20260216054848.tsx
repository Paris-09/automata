import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp } from "lucide-react"; 

import ReactFlow, { Background, Controls, MarkerType } from "reactflow";
import type { Edge, Node } from "reactflow";

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
    {
      id: "q1",
      position: { x: 250, y: 150 },
      data: { label: "q1" },
      style: {
        borderRadius: 999,
        width: 60,
        height: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        border: "1px solid #555",
        fontWeight: 700,
      },
    },
  ];

  const edges: Edge[] = [
    { id: "q0-a-q0", source: "q0", target: "q0", label: "a", markerEnd: { type: MarkerType.ArrowClosed }, style: { strokeWidth: 2 } },
    { id: "q0-b-q1", source: "q0", target: "q1", label: "b", markerEnd: { type: MarkerType.ArrowClosed }, style: { strokeWidth: 2 } },
    { id: "q1-a-q1", source: "q1", target: "q1", label: "a", markerEnd: { type: MarkerType.ArrowClosed }, style: { strokeWidth: 2 } },
    { id: "q1-b-q0", source: "q1", target: "q0", label: "b", markerEnd: { type: MarkerType.ArrowClosed }, style: { strokeWidth: 2 } },
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
                edges={edges} 
                fitView 
                panOnDrag 
                zoomOnScroll 
                zoomOnPinch 
                nodesConnectable={false}
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