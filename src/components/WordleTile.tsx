import { MutableRefObject } from "react";

export default function WordleTile(props: { tile: String }) {
    return (
        // <div className="h-full flex items-center justify-center bg-green-700 flex-1">A</div>
        <div className="h-full flex items-center justify-center bg-green-700 flex-1">
            {props.tile}
        </div>
    );
};