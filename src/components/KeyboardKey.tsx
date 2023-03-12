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
                'sm:w-10 w-9 h-14 sm:h-16 text-white text-base font-semibold sm:rounded-[4px] rounded-lg text-center flex items-center justify-center ' +
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
