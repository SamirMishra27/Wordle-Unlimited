import { CSSProperties } from 'react'

export default function WordleTile(props: {
    tile: string
    style: string
    index: number
    correct: boolean
    roll: boolean
}) {
    const { tile, style, index, correct, roll } = props
    const inlineStyle = { '--index': `${index}s`, '--color': style } as CSSProperties
    return (
        <div
            className={
                'wordle-tile h-full relative text-4xl font-medium ' +
                'flex items-center justify-center flex-1 ' +
                (tile ? 'filled ' : '') +
                (correct ? 'jump bg-correct border-correct ' : '') +
                (roll ? 'roll-tile ' : '')
            }
            style={inlineStyle}>
            {tile}
        </div>
    )
}
