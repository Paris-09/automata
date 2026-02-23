import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp } from "lucide-react"; 

import { ReactFlow, Background, BackgroundVariant, Controls, MarkerType, useReactFlow, useNodesState, useEdgesState } from "@xyflow/react";
import type { Edge, Node } from "@xyflow/react";

import { CircleNode } from "./CircleNode";
import { AnimatedBallEdge } from './AnimatedBallEdge' 
import { DfaAbNodes, Dfa01Nodes } from "../constants/DfaNodes"
import { DfaAbEdges, Dfa01Edges } from "../constants/DfaEdges"

import "@xyflow/react/dist/style.css";

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

type ValidateDfaProps = {
  q0: string,
  sigma: Set<string>,
  delta: Record<string, string>,
  F: Set<string>
  word: string
}

const nodeTypes = {
    circle: CircleNode,
};

const edgeTypes = {
  animatedBallEdge: AnimatedBallEdge
}

const defaultEdgeOptions = {
    // type: "smoothstep", // Gives those nice right-angle bends for DFAs
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#333",
    },
    type: 'straight'
};


/**
 * DEMO graph generator.
 */
function getDemoGraph(selectedRegex: RegexChoice) {
  if (selectedRegex === "regex1") {
    const nodes = Dfa01Nodes
    const edges = Dfa01Edges

    return { nodes, edges };
  }
  // For regex2
  const nodes = DfaAbNodes
  const edges = DfaAbEdges

  return { nodes, edges };
}


const DfaAbValues = {
  q0: "q0",
  sigma: new Set(['a','b']),
  delta: {
    'q0,a': 'q1', 'q0,b': 'q1',
    'q1,a': 'q2', 'q1,b': 'q3',
    'q2,a': 'q4', 'q2,b': 'q3',
    'q3,a': 'q2', 'q3,b': 'q6',
    'q4,a': 'q7', 'q4,b': 'q5',
    'q5,a': 'q9', 'q5,b': 'q6',
    'q6,a': 'q8', 'q6,b': 'q10',
    'q7,a': 'q7', 'q7,b': 'q9',
    'q8,a': 'q4', 'q8,b': 'q9',
    'q9,a': 'q11', 'q9,b': 'q12',
    'q10,a': 'q9', 'q10,b': 'q10',
    'q11,a': 'q11', 'q11,b': 'q14',
    'q12,a': 'q13', 'q12,b': 'q12',
    'q13,a': 'q16', 'q13,b': 'q14',
    'q14,a': 'q15', 'q14,b': 'q12',
    'q15,a': 'q16', 'q15,b': 'q14',
    'q16,a': 'q11', 'q16,b': 'q14',
  },
  F: new Set(['q15', 'q16'])
}


const Dfa01Values = {
  q0: "q0",
  sigma: new Set(['0','1']),
  delta: {
    'q0,0': 'q1', 'q0,1': 'q3',
    'q1,0': 'q4', 'q1,1': 'q2',
    'q2,0': 'q2', 'q2,1': 'q2',
    'q3,0': 'q2', 'q3,1': 'q4',
    'q4,0': 'q5', 'q4,1': 'q4',
    'q5,0': 'q5', 'q5,1': 'q7',
    'q6,0': 'q9', 'q6,1': 'q11',
    'q7,0': 'q6', 'q7,1': 'q10',
    'q8,0': 'q5', 'q8,1': 'q7',
    'q9,0': 'q9', 'q9,1': 'q11',
    'q10,0': 'q8', 'q10,1': 'q12',
    'q11,0': 'q6', 'q11,1': 'q12',
    'q12,0': 'q8', 'q12,1': 'q12',
  },
  F: new Set(['q8', 'q9', 'q11', 'q12'])
}




function validateDfa({q0, sigma, delta, F, word}: ValidateDfaProps){
  console.log("i got this values", q0, sigma, delta, F, word)
  let q = q0
    let path = []
    for (const w of word) {
        
        if (!sigma.has(w)){ // catches invalid symbol
            return {isValid: false, path: path, info: 'char not in the symbol'}
        }
        
        let old_q = q
        q = delta[`${q},${w}`]
        let edge_path = `${old_q}-${w}-${q}`
        path.push([edge_path, q])
    }
    
    if (F.has(q)) {
        return {isValid: true, path: path, info: 'Succesfully compiled the whole string with the final result of an Valid String'}
    } else {
        return {isValid: false, path: path, info: "Succesfully compiled the whole string with the final result of an Invalid String"}
    }
}


export function AutomataSimulator({ selectedRegex, selectedModel, handleNavigate }: Props) {
  const initialGraph = useMemo(() => getDemoGraph(selectedRegex), [selectedRegex]);
  const [displayNodes, setNodes, onNodesChange] = useNodesState(initialGraph.nodes)
  const [displayEdges, setEdges, onEdgesChange] = useEdgesState(initialGraph.edges)

  // Keep the state sync in case of regex changes
  useEffect (() => {
    setNodes(initialGraph.nodes)
    setEdges(initialGraph.edges)
  }, [initialGraph, setNodes, setEdges])

  
  // Defines the number of test rows
  const [rows, setRows] = useState<TestRow[]>(
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      input: "",
      status: "No string",
    }))
  );

  const dfaValues = useMemo(() => {
    if (selectedRegex == 'regex2')  return DfaAbValues
    if (selectedRegex == 'regex1') return Dfa01Values

    // default value is Dfa01Values
    return Dfa01Values

  }, [selectedRegex]);

  // -- Graph FitView --
  const { fitView } = useReactFlow();

  // Refit view when the window size change
  useEffect(() => {
    const handleResize = () => fitView();

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [fitView])

  // Refit view when Regex changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({duration: 400}); // Adds a Transition
    }, 50);

    return () => clearTimeout(timer);
  }, [selectedRegex, fitView])


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

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSimulate = async (rowId: number, input: string) => {
    let status: TestRow["status"] = "No string";
    
    if (input.length === 0) {
      status = "No string";
    } else {
      let {isValid, path, info} = validateDfa({...dfaValues, word: input} )

      // For debugging purposes
      console.log(isValid)
      console.log(path)
      console.log(info)

      // Clear Previous Animation
      setNodes((nds) => nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          isHighlighting: false,
          isHighlighted: false
        }
      })))

      setEdges((dgs) => dgs.map((d) => ({
        ...d,
        animated: false,
        style: {...d.style, stroke: '#57565657', strokeWidth: 3}
      })))

      // Highlight Starting state
      setNodes((nds) => nds.map((n) =>
        n.id === dfaValues.q0 ? { ...n, data: {...n.data, isHighlighting: true}} : n
      ))

      await sleep(400)

      // Start Traversal

      
      for (const [edgePath, targetId] of path) {
        // TODO: I may need to remove targetID since I may not need it after all
        const sourceId = edgePath.split('-')[0];

        // Find the edge connecting source to target
        const edgeToAnimate = displayEdges.find(e => e.source === sourceId && e.target === targetId);
        
        // Animate the edge
        if (edgeToAnimate) {
          // Animate Edge
          setEdges((dgs) => dgs.map((e) => 
            e.id === edgeToAnimate.id
              // ? {...e, animated: true, style: { ...e.style, stroke: '#74DCFF', strokeWidth: 5 } }
              // : e
              ? {
                ...e,
                data: {...e.data, isAnimating: true},
                style: {...e.style, stroke: '#74DCFF', strokeWidth: 5}
              }
              : e
          ));
        }

        await sleep(250);

        // Update Nodes (Old Nodes -> isHighlighted, Target Nodes -> isHighlighting)
        setNodes((nds) => nds.map((n) => {
          

          if (n.id === targetId) {
            return { ...n, data: { ...n.data, isHighlighting: true } }
          }

          if (n.id === sourceId){
            return { ...n, data: { ...n.data, isHighlighting: false, isHighlighted: true } }
          }

          return n

        }));

        // Stop edge pulse, but keep the color
        if (edgeToAnimate) {
          setEdges((dgs) => dgs.map((e) => 
            e.id === edgeToAnimate.id 
              ? { 
                ...e,
                data: {...e.data, isAnimating: false}
                // animated: false, style: {...e.style, stroke: '#3b82f6'}} : e
          ))
        }

        await sleep(150)
      }

      status = isValid ? "VALID" : "INVALID";

    } 
    setRows((prev) =>
      prev.map((r) => (r.id === rowId ? { ...r, status } : r))
    );
  };

  

  

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
                nodes={displayNodes}
                nodeTypes = {nodeTypes}
                edges={displayEdges}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                panOnDrag 
                zoomOnScroll 
                zoomOnPinch 
                nodesConnectable={false}
                defaultEdgeOptions={defaultEdgeOptions}
                fitView
                fitViewOptions={{ padding: 20}}
              >
                <Background 
                  color="#d1d1d13f" // This is the color of the dots/lines
                  variant={BackgroundVariant.Dots} 
                  style={{ backgroundColor: '#000000' }} // This is the actual canvas color
                />
                <Controls />
              </ReactFlow>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}