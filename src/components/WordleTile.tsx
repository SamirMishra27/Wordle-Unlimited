import { CSSProperties, useRef, MutableRefObject, useEffect } from 'react'
import { seconds } from '../utils'

export default function WordleTile(props: {
    tile: string
    style: string
    index: number
    correct: boolean
    roll: boolean
    guessed: boolean
}) {
    const { tile, style, index, correct, roll, guessed } = props
    const inlineStyle = { '--index': `${index}s`, '--color': style } as CSSProperties

    const tileRef = useRef() as MutableRefObject<HTMLDivElement>
    useEffect(() => {
        if (guessed)
            setTimeout(() => {
                tileRef.current.style.backgroundColor = style
                tileRef.current.classList.remove('roll-tile')
                tileRef.current.classList.add('guessed')
            }, seconds(2))
        else tileRef.current.style.backgroundColor = ''
    })

    return (
        <div
            className={
                'wordle-tile h-full relative text-4xl font-medium ' +
                'flex items-center justify-center flex-1 ' +
                (tile ? 'filled ' : '') +
                (correct ? 'jump bg-correct border-correct ' : '') +
                (roll ? 'roll-tile ' : '')
            }
            style={inlineStyle}
            ref={tileRef}>
            {tile}
        </div>
    )
}
