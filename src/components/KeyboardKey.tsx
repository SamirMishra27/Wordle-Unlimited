import { MouseEvent } from 'react'
import { LetterStatus } from '../types'

export default function KeyboardKey(props: {
    alphabet: string
    onKeyClick: (event: MouseEvent<HTMLButtonElement>) => void
    letterStatus: LetterStatus
}) {
    const { alphabet, onKeyClick, letterStatus } = props
    let bgColor = 'bg-gray'

    if (letterStatus.correct.includes(alphabet)) bgColor = 'bg-correct'
    else if (letterStatus.misplaced.includes(alphabet)) bgColor = 'bg-misplaced'
    else if (letterStatus.wrong.includes(alphabet)) bgColor = 'bg-wrong'

    return (
        <div
            className={
                'w-10 h-16 text-white text-base font-semibold rounded-[4px] text-center flex items-center justify-center ' +
                bgColor
            }>
            <button
                className="w-full h-full"
                data-action={alphabet}
                onClick={(event) => {
                    onKeyClick(event)
                }}>
                {alphabet}
            </button>
        </div>
    )
}
