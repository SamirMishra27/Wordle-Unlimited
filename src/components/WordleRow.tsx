import WordleTile from "./WordleTile";
import { MutableRefObject } from "react";
import { wordleState } from "../types";

export default function WordleRow(props: { wordleState: wordleState }) {
    return (
        <div className="wordle-row w-full flex items-center justify-evenly flex-1 [column-gap:0.625rem] p-1 text-slate-200">
            <WordleTile tile={wordleState.tileData[0]}/>
            <WordleTile tile={wordleState.tileData[1]}/>
            <WordleTile tile={wordleState.tileData[2]}/>
            <WordleTile tile={wordleState.tileData[3]}/>
            <WordleTile tile={wordleState.tileData[4]}/>
        </div>
    );
};