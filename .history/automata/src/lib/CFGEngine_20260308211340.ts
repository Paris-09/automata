interface TraceStep {
    step: number;
    processed: string; // the processed string so far
    activeTerminal: string; // the characters that are currently being processed
    activeNonTerminal: string; // the non-terminals that are currently being processed
    futureNonTerminal: string; // the non-terminals that are yet to be processed
    derivation: string; // the derivation of the current step (combine strings)
}


class CfgEngine {
    private grammar: Record<string, string[][]>; // the grammar rules
    private blockSequence: string[];
    private stateToBlock: Record<string, string>;


    constructor(
        grammar: Record<string, string[][]>,
        sequence: string[],
        stateMapping: Record<string, string>
    ) {
        this.grammar = grammar;
        this.blockSequence = sequence; // store the expected block order of the grammar
        this.stateToBlock = stateMapping // state to block label (so multiple state can belong to the same block)
    }

    // I'm not sure if we really need the stateToBlock, i think we can just get the first string of a character
    private getVisualName(state: string) {
        // the accept state has no visual non temrinal
        if (state === "ACCEPT") return "";
        return this.stateToBlock[state] || state[0];   
    }

    public trace(inputString: string) {
        
        // Recursive Parser (DFS)
        const solve = (
            blockIndex: number, // the block we are currently in ["A", "B", "C"]
            currentState: string, // the grammar state we are currently in
            remainingInput: string, // portion of the string that is not yet processed
            path: TraceStep[], // list of derivative steps
            completedPrefix: string, // part of the string that belongs to the finished blocks
            currentBlockTerminals: string, // terminals curren
        ) : { success: boolean; finalPath: TraceStep[] } | null => {
            
            // If there's no longer remaining input by the time we reach ACCEPT, then the string is valid (return validation, and path)
            if (currentState === "ACCEPT") {
                return remainingInput === "" ? {success: true, finalPath: path} : null;
            }

            const rules = this.grammar[currentState] || [];
            // Sorts the rules to avoid greedy matching
            const sortedRules = [...rules].sort((a, b) => b[0].length - a[0].length);

            // Then try each rule
            for (const [ terminal, nextState ] of sortedRules) {
                
                // Valid if the terminal matches beggining of the input, or if the terminal is epsilon
                if (terminal === "" || remainingInput.startsWith(terminal)) {
                    
                    // IDK: Find the block which the current state belongs to
                    const currentBlock = this.stateToBlock[currentState];

                    // IDK: Find the next block
                    const nextBlock = this.stateToBlock[nextState] || "ACCEPT";


                    // Detect Block Transition
                    const isTransitioning = currentBlock !== nextBlock;
                    // Update Block Index (if transitioning)
                    const nextBlockIndex = isTransitioning ? blockIndex + 1 : blockIndex;
                    // Updated Completed Prefix (if transitioning)
                    const nextCompletedPrefix = isTransitioning ? completedPrefix + currentBlockTerminals + terminal : completedPrefix;
                    // Reset Block Terminals (if transitioning, else update it)
                    const nextBlockTerminals = isTransitioning ? "" : currentBlockTerminals + terminal;
                    
                    // Removed matched Terminal
                    const nextRemainingInput = remainingInput.slice(terminal.length);



                    // --- Formatting the Pieces ---
                    const processedString = nextCompletedPrefix;
                    const activeNonTerminal = this.getVisualName(nextState);
                    const futureNonTerminal = this.blockSequence.slice(nextBlockIndex + 1). join("");
                    const activeTerminal = activeNonTerminal ? `${nextBlockTerminals}${activeNonTerminal}` : nextBlockTerminals;
                    const derivation = `${processedString}(${activeTerminal})${futureNonTerminal}`;

                    // --- Pushing the New Object ---
                    const newPath = [...path, {
                        step: path.length,
                        processed: processedString,
                        activeTerminal: activeTerminal,
                        activeNonTerminal: activeNonTerminal,
                        futureNonTerminal: futureNonTerminal,
                        derivation: derivation
                    }];

                    // Recursive Call (attempt the next step)
                    const result = solve (
                        nextBlockIndex,
                        nextState,
                        nextRemainingInput,
                        newPath,
                        nextCompletedPrefix,
                        nextBlockTerminals
                    );

                    if (result) return result;

                }

            }

            return null;
        };

        // --- Initial Derivation ---

        // Get first non terminal
        const firstStateVisual = this.getVisualName(this.blockSequence[0]);
        
        // Get remaining blocks
        const futureStateVisual = this.blockSequence.slice(1).join("");

        // Initial Deviation
        const initialDeviation = `(${firstStateVisual})${futureStateVisual}`


        // --- Initial Trace Step ---
        
        // create Step 0
        const initialPath: TraceStep[] = [{
            step: 0,
            processed: "",
            activeTerminal: "",
            activeNonTerminal: firstStateVisual,
            futureNonTerminal: futureStateVisual,
            derivation: initialDeviation
        }]


        // --- Start Solving ---
        const firstState = this.blockSequence[0];

        // Start recursive search
        const finalResult = solve(0, firstState, inputString, initialPath, "", "");

        return finalResult ? 
            {success: true, steps: finalResult.finalPath} :
            {success: false, error: `Rejected: ${inputString}`}
    }
}



// --- 01 CFG ---
const cfg01Rules = {
    "A": [["11", "B"], ["00", "B"]], 
    "B": [["1", "B"], ["0", "B"], ["", "C"]],
    "C": [["101", "D"], ["111", "D"], ["01", "D"]],
    "D": [["0", "E"], ["1", "F"]], 
    "E": [["0", "E"], ["", "G"]], 
    "F": [["1", "F"], ["", "G"]], 
    "G": [["1", "ACCEPT"], ["0", "ACCEPT"], ["11", "ACCEPT"]]
};

const sequence01 = ["A", "B", "C", "D", "G"]

const stateToBlock01: Record<string, string> = {
    "A": "A",
    "B": "B", 
    "C": "C", 
    "D": "D", 
    "E": "D", 
    "F": "D", 
    "G": "G", 
    "ACCEPT": "ACCEPT"
};

export const engine01 = new CfgEngine(cfg01Rules, sequence01, stateToBlock01)

// // Test String 1
// const testInput1 = "1101010100011";
// console.log(`--- TRACING: ${testInput1} ---`);
// const res1 = engine01.trace(testInput1);

// if (res1.success) {
//     // Logging the actual object to show you the separated fields
//     res1.steps!.forEach(s => {
//         console.log(`Step ${s.step}:`, {
//             processed: s.processed,
//             activeTerminal: s.activeTerminal,
//             activeNT: s.activeNonTerminal,
//             future: s.futureNonTerminal,
//             derivative: s.derivation
//         });
//     });
// } else {
//     console.log(res1.error);
// }



console.log("\n------------------------------------------------\n");

// --- AB CFG ---
const cfgABRules = {
    "A": [["a", "B1"], ["b", "B1"]],
    "B1": [["a", "B1"], ["b", "B1"], ["", "C"]],
    "C": [["aa", "D"], ["bb", "D"]],
    "D": [["ab", "B2"], ["ba", "B2"]],
    "B2": [["a", "B2"], ["b", "B2"], ["", "E"]],
    "E": [["aba", "ACCEPT"], ["baa", "ACCEPT"]]
};

const sequenceAB = ["A", "B", "C", "D", "B", "E"]

const StateToBlockAB: Record<string, string> = {
    "A": "A",
    "B1": "B",
    "C": "C",
    "D": "D",
    "B2": "B", 
    "E": "E", 
    "ACCEPT": "ACCEPT"
};


const engineAB = new CfgEngine(cfgABRules, sequenceAB, StateToBlockAB);

// // Test String 2
// const testInput2 = "aaaaaaabbbbaba";
// console.log(`--- TRACING: ${testInput2} ---`);
// const res2 = engineAB.trace(testInput2);

// if (res2.success) {
//     // Logging the actual object here as well
//     res2.steps!.forEach(s => {
//         console.log(`Step ${s.step}:`, {
//             done: s.processed,
//             activeTerminals: s.activeTerminal,
//             activeNT: s.activeNonTerminal,
//             future: s.futureNonTerminal,
//             derivative: s.derivation
//         });
//     });
// } else {
//     console.log(res2.error);
// }