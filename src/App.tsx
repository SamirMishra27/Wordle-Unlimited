import './index.css'
import WordleRow from './components/WordleRow'
import { useState, useEffect, useRef, MutableRefObject } from 'react'
import WORDLE_WORDS from '../data/words'
import { createElement } from './utils'

// const randomWordIndex = Math.floor( Math.random() * WORDLE_WORDS.length );
// const wordleWord = WORDLE_WORDS[randomWordIndex];
const ERR_EXP_AFTER = 2.2 * 1000

export default function App(): JSX.Element {
    const wordleWord = 'SAMIR'

    const [tiles, setTiles] = useState([
        { row: ['', '', '', '', ''], guessed: false },
        { row: ['', '', '', '', ''], guessed: false },
        { row: ['', '', '', '', ''], guessed: false },
        { row: ['', '', '', '', ''], guessed: false },
        { row: ['', '', '', '', ''], guessed: false },
    ])
    const [currRow, setRow] = useState(0)
    const [currIndex, setIndex] = useState(0)

    const errorSlideRef = useRef() as MutableRefObject<HTMLDivElement>

    function pushError(string: string) {
        const errorChild = createElement(
            'div',
            'bg-slate-200 p-2 text-center font-semibold rounded-lg delete-after',
            string
        )
        errorSlideRef.current.insertBefore(errorChild, errorSlideRef.current.firstChild)
        setTimeout(() => {
            errorSlideRef.current.removeChild(errorChild)
        }, ERR_EXP_AFTER)
    }

    function handle(event: globalThis.KeyboardEvent) {
        if (event.key === 'Enter') {
            if (currIndex !== 5) {
                return pushError('Not enough words')
            }
            const tileRow = tiles[currRow]
            const currGuess = tileRow.row.join('')

            if (!WORDLE_WORDS.includes(currGuess.toLowerCase())) {
                return pushError('Not in word list')
            }

            if (currGuess.toUpperCase() === wordleWord) {
                tileRow.guessed = true
                // Do something
            } else {
                tileRow.guessed = true
                // Do something
                if (currRow === 4) {
                    const answerElem = createElement(
                        'div',
                        'bg-slate-200 p-2 text-center font-semibold rounded-lg text-lg',
                        wordleWord.toUpperCase()
                    )
                    errorSlideRef.current.insertBefore(answerElem, errorSlideRef.current.firstChild)
                }
            }
            tiles[currRow] = tileRow
            setTiles(tiles)
            setRow(currRow + 1)
            setIndex(0)
        }

        if (event.key === 'Backspace') {
            if (currIndex === 0) return

            const prevIndex = currIndex
            tiles[currRow].row[prevIndex - 1] = ''

            setIndex(currIndex - 1)
            setTiles(tiles)
        }
        const alphabets = 'abcdefghijklmnopqrstuvwxyz'
        if (alphabets.includes(event.key)) {
            if (currIndex === 5) return
            tiles[currRow].row[currIndex] = event.key.toUpperCase()
            setIndex(currIndex + 1)
            setTiles(tiles)
        }
    }
    useEffect(() => {
        document.body.addEventListener('keyup', handle)
        return () => document.body.removeEventListener('keyup', handle)
    })

    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center relative overflow-hidden">
            <div
                className="w-48 bg-transparent absolute p-3 space-y-4 z-10 top-28"
                ref={errorSlideRef}></div>

            <div className="wordle w-[30rem] h-[30rem] flex flex-col items-center justify-evenly">
                <WordleRow tileRow={tiles[0]} wordleWord={wordleWord} />
                <WordleRow tileRow={tiles[1]} wordleWord={wordleWord} />
                <WordleRow tileRow={tiles[2]} wordleWord={wordleWord} />
                <WordleRow tileRow={tiles[3]} wordleWord={wordleWord} />
                <WordleRow tileRow={tiles[4]} wordleWord={wordleWord} />
            </div>
        </div>
    )
}
