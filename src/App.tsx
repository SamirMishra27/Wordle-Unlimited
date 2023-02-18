import './index.css';
import WordleRow from './components/WordleRow';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

export default function App() {
    
    const [wordleState, setWordle] = useState({
        tileData: [
            Array(5).fill( Array(5).fill("") )
        ],
        currRow: 0,
        currIndex: 0
    });
    
    return (
        // <div className="text-slate-800 text-6xl">Hello world!</div>
        <div className="w-full h-[100vh] flex flex-col items-center justify-center">

            <div className="wordle w-[30rem] h-[30rem] flex flex-col items-center justify-evenly">
                <WordleRow wordleState={wordleState}/>
                <WordleRow wordleState={wordleState}/>
                <WordleRow wordleState={wordleState}/>
                <WordleRow wordleState={wordleState}/>
                <WordleRow wordleState={wordleState}/>
            </div>
            
        </div>
    );
};