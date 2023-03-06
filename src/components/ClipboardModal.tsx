import { MutableRefObject, useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'
import { seconds } from '../utils'

export default function ClipboardModal(props: {
    wordleCopy: Node | null
    removeCopy: () => void
    pushError: (s: string) => void
}) {
    const { wordleCopy, removeCopy, pushError } = props
    const copyableRef = useRef() as MutableRefObject<HTMLDivElement>
    const selfRef = useRef() as MutableRefObject<HTMLDivElement>

    async function copyTilesToClipboard() {
        // Render the elements into a canvas
        const canvas = await html2canvas(copyableRef.current)

        // Convert to a blob type then append to Clipboard
        canvas.toBlob((blob) => {
            if (!blob) return
            const clipboardItem = new ClipboardItem({ 'image/png': blob })
            navigator.clipboard.write([clipboardItem])
        })
        // Send notification
        pushError('Copied to clipboard!')

        // Clean up
        disappear()
    }

    function disappear() {
        selfRef.current.classList.remove('appear')
        setTimeout(() => removeCopy(), seconds(1))
    }

    useEffect(() => {
        if (wordleCopy) copyableRef.current.appendChild(wordleCopy)
        return
    }, [])
    return (
        <div
            className="clipboard-modal w-2/6 h-4/5 bg-default absolute z-10 rounded-lg flex flex-col items-center justify-center space-y-4 opacity-0 translate-y-[-40px] appear"
            ref={selfRef}>
            <div
                className="copyable-wordle h-auto flex flex-col items-center justify-evenly bg-default"
                ref={copyableRef}>
                <p className="p-2 text-center font-semibold text-slate-100">
                    Can you help me solve this Wordle? 🤔
                </p>
            </div>
            <button
                className={
                    'reset-button w-36 h-10 bg-correct rounded-2xl text-white text-sm font-medium p-px ' +
                    'hover:bg-[#60a25a] transition active:bg-correct mt-4'
                }
                onClick={() => copyTilesToClipboard()}>
                Copy to clipboard!
            </button>
            <button
                className="w-10 h-auto absolute top-3 right-3 fill-white hover:fill-slate-200 active:fill-white"
                onClick={() => disappear()}>
                <svg
                    width="48px"
                    height="48px"
                    viewBox="0 0 1.44 1.44"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto bg-transparent">
                    <path x="0" fill="none" width="24" height="24" d="M0 0H1.44V1.44H0V0z" />
                    <g>
                        <path d="M1.062 0.462l-0.085 -0.085L0.72 0.635 0.462 0.378l-0.085 0.085L0.635 0.72l-0.258 0.258 0.085 0.085L0.72 0.805l0.258 0.258 0.085 -0.085L0.805 0.72l0.258 -0.258z" />
                    </g>
                </svg>
            </button>
        </div>
    )
}
