import { CSSProperties } from 'react'

export default function WordleTile(props: {
    tile: string
    style: string
    index: number
    correct: boolean
}) {
    const { tile, style, index, correct } = props
    const inlineStyle = { '--index': `${index}s` } as CSSProperties
    return (
        <div
            className={
                'h-full flex items-center justify-center flex-1 text-6xl font-medium [user-select:none] ' +
                (tile ? 'filled ' : '') +
                (correct ? 'jump ' : '') +
                style
            }
            style={inlineStyle}>
            {tile}
        </div>
    )
}
