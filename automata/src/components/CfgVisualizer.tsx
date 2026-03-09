import React, { useEffect, useRef } from "react";
import { AlertTriangle, TerminalSquare, BookOpen, Activity, CheckCircle2 } from "lucide-react";
import "../CfgVisualizer.css";
import { type TraceStep } from "../lib/CfgEngine";

interface CfgVisualizerProps {
    steps: TraceStep[];
    grammarFormal: {
        V: string[];
        T: string[];
        P: string[];
        S: string;
    };
    currentStepIndex: number;
    errorMsg: string | null;
    isSimulationComplete: boolean;
}

export const CfgVisualizer: React.FC<CfgVisualizerProps> = ({
    steps,
    grammarFormal,
    currentStepIndex,
    errorMsg,
    isSimulationComplete,
}) => {
    // Auto-scroll the trace panel so the active step is always visible
    const traceListRef = useRef<HTMLDivElement>(null);
    const activeItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeItemRef.current && traceListRef.current) {
            const container = traceListRef.current;
            const item = activeItemRef.current;

            // Calculate the position: 
            // Move the container's scroll so the item is roughly in the middle
            const scrollTarget = item.offsetTop - container.clientHeight / 2 + item.clientHeight / 2;

            container.scrollTo({
                top: scrollTarget,
                behavior: "smooth",
            });
        }
    }, [currentStepIndex]);

    return (
        <div className="cfg-container">
            {/* Left Panel: Grammar Formal Definition (VTPS) */}
            <div className="cfg-panel rules-panel">
                <h3 className="panel-title">
                    <BookOpen size={16} />
                    Grammar Definition
                </h3>
                <div className="vtps-content">
                    <div className="vtps-section">
                        <span className="vtps-label">V (Variables):</span>
                        <span className="vtps-value">{"{"} {grammarFormal.V.join(", ")} {"}"}</span>
                    </div>
                    
                    <div className="vtps-section">
                        <span className="vtps-label">T (Terminals):</span>
                        <span className="vtps-value">{"{"} {grammarFormal.T.join(", ")} {"}"}</span>
                    </div>
                    
                    <div className="vtps-section">
                        <span className="vtps-label">S (Start Symbol):</span>
                        <span className="vtps-value">{grammarFormal.S}</span>
                    </div>

                    <div className="vtps-section production-section">
                        <span className="vtps-label">P (Production Rules):</span>
                        <div className="production-list">
                            {grammarFormal.P.map((rule, idx) => {
                                const parts = rule.split("->");
                                return (
                                    <div key={idx} className="rule-line">
                                        <span className="lhs">{parts[0].trim()}</span>
                                        <span className="arrow">→</span>
                                        <span className="rhs">{parts[1]?.trim() || "ε"}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: Derivation Trace */}
            <div className="cfg-panel trace-panel" ref={traceListRef}>
                <h3 className="panel-title">
                    <Activity size={16} />
                    Derivation Trace
                </h3>
                
                {/* Error State */}
                {errorMsg ? (
                    <div className="trace-error">
                        <div className="error-icon">
                            <AlertTriangle size={36} color="#ef4444" strokeWidth={1.5} />
                        </div>
                        <div className="error-text">String Rejected</div>
                        <div className="error-subtext">{errorMsg}</div>
                    </div>
                ) : steps.length === 0 ? (
                    /* Empty State (Waiting for Simulation) */
                    <div className="trace-empty">
                        <TerminalSquare size={42} color="#333" strokeWidth={1.2} className="empty-icon" />
                        <p>Waiting for simulation...</p>
                        <p className="trace-empty-sub">Enter a valid string and click Simulate.</p>
                    </div>
                ) : (
                    /* Active Trace List */
                    <div className="trace-list">
                        {steps.map((s, idx) => {
                            const isActive = idx === currentStepIndex;
                            const isPast = idx < currentStepIndex;
                            
                            // Prevent rendering future steps until they are active
                            if (idx > currentStepIndex) return null;

                            const isFinalValid = isSimulationComplete && idx === steps.length - 1;

                            return (
                                <div
                                    key={idx}
                                    ref={isActive ? activeItemRef : null}
                                    className={`trace-item ${isActive ? "active" : ""} ${isPast ? "past" : ""} ${isFinalValid ? "valid-final" : ""}`}
                                >
                                    <div className="step-header">
                                        <span className="step-number">Step {s.step}</span>
                                        {isFinalValid && (
                                            <CheckCircle2 size={16} color="#4ade80" strokeWidth={2.5} />
                                        )}
                                    </div>
                                    <div className="derivation-string">
                                        <span className="done">{s.processed}</span>
                                        <span className="current-focus">
                                            {idx === 0 ? (
                                                s.activeNonTerminal && (
                                                    <span className="current-focus">
                                                        ({s.activeNonTerminal})
                                                    </span>
                                                )
                                            ) : (
                                                s.activeTerminal && (
                                                    <span className="current-focus">
                                                        ({s.activeTerminal})
                                                    </span>
                                                )
                                            )}
                                        </span>
                                        <span className="future">
                                            {s.futureNonTerminal}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};