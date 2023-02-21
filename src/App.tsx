import './index.css'
import WordleRow from './components/WordleRow'
import { useState, useEffect } from 'react'
import WORDLE_WORDS from '../data/words'

// const randomWordIndex = Math.floor( Math.random() * WORDLE_WORDS.length );
// const wordleWord = WORDLE_WORDS[randomWordIndex];

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
    const [error, setError] = useState('')

    function pushError(string: string) {
        setError(string)
        setTimeout(() => {
            if (!error) setError('')
        }, 2.2 * 1000)
    }

    function handle(event: globalThis.KeyboardEvent) {
        if (event.key === 'Enter') {
            if (currIndex !== 5) {
                return pushError('Not enough words')
            }
            const tileRow = tiles[currRow]
            const currGuess = tileRow.row.join('')

            if (currGuess.toLowerCase() in WORDLE_WORDS) {
                return setError('Not in word list')
            }

            if (currGuess.toUpperCase() === wordleWord) {
                tileRow.guessed = true
                // Do something
            } else {
                tileRow.guessed = true
                setRow(currRow + 1)
                setIndex(0)
                // Do something
            }
            tiles[currRow] = tileRow
            setTiles(tiles)
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
        <div className="w-full h-[100vh] flex flex-col items-center justify-center relative">
            <div className="w-36 bg-transparent absolute p-3 space-y-4 z-10 top-32">
                {error && (
                    <div className="bg-slate-200 p-2 text-center font-semibold rounded-lg delete-after">
                        {error}
                    </div>
                )}
            </div>

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
