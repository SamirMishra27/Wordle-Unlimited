import { CSSProperties } from 'react'

export default function WordleTile(props: { tile: string; style: string; delay: number }) {
    const { tile, style, delay } = props
    const inlineStyle = { '--delay': `${delay}s` } as CSSProperties
    return (
        <div
            className={
                'h-full flex items-center justify-center flex-1 text-6xl font-medium [user-select:none] ' +
                +style +
                (tile ? ' filled' : '')
            }
            style={inlineStyle}>
            {tile}
        </div>
    )
}
