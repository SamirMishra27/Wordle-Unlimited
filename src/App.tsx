import { useState, useEffect, useRef, MutableRefObject, MouseEvent } from 'react'

import WordleRow from './components/WordleRow'
import KeyboardKey from './components/KeyboardKey'
import EndScreen from './components/EndScreen'

import { createElement, setLocalData } from './utils'
import { AllTimeStats, TileRow } from './types'

import './index.css'
import WORDLE_WORDS from '../data/words'
import backspace from './assets/backspace.svg'

const randomWordIndex = Math.floor(Math.random() * WORDLE_WORDS.length)
const wordleWord = WORDLE_WORDS[randomWordIndex].toUpperCase()

const ERR_EXP_AFTER = 2.2 * 1000
const ALPHABETS = 'abcdefghijklmnopqrstuvwxyz'

export default function App(): JSX.Element {
    // const wordleWord = 'SAMIR'
    // let allTimeStats;

    const [tiles, setTiles] = useState([
        { row: ['', '', '', '', ''], guessed: false },
        { row: ['', '', '', '', ''], guessed: false },
        { row: ['', '', '', '', ''], guessed: false },
        { row: ['', '', '', '', ''], guessed: false },
        { row: ['', '', '', '', ''], guessed: false },
        { row: ['', '', '', '', ''], guessed: false },
    ])
    const [currRow, setRow] = useState(0)
    const [currIndex, setIndex] = useState(0)

    const [letterStatus, setLetterStatus] = useState({
        wrong: Array<string>(),
        misplaced: Array<string>(),
        correct: Array<string>(),
    })
    const errorSlideRef = useRef() as MutableRefObject<HTMLDivElement>
    const [allTimeStats, setStats] = useState<AllTimeStats | null>(null)

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

    function updateLetterStatus(tileRow: TileRow, wordleWord: string) {
        tileRow.row.forEach((letter, index) => {
            if (
                letterStatus.correct.includes(letter) ||
                letterStatus.misplaced.includes(letter) ||
                letterStatus.wrong.includes(letter)
            )
                return

            if (
                wordleWord.split('').indexOf(letter) === index &&
                !letterStatus.correct.includes(letter)
            ) {
                letterStatus.correct.push(letter)
            } else if (
                wordleWord.split('').indexOf(letter) === -1 &&
                !letterStatus.wrong.includes(letter)
            ) {
                letterStatus.wrong.push(letter)
            } else if (
                wordleWord.split('').indexOf(letter) !== index &&
                !letterStatus.misplaced.includes(letter)
            ) {
                letterStatus.misplaced.push(letter)
            }
        })
        setLetterStatus(letterStatus)
    }

    function evaluateRow() {
        if (currIndex !== 5) {
            return pushError('Not enough words')
        }
        const tileRow = tiles[currRow]
        const currGuess = tileRow.row.join('')

        // If the word is not in global list
        if (!WORDLE_WORDS.includes(currGuess.toLowerCase())) {
            return pushError('Not in word list')
        }

        // If the guess is correct
        if (currGuess.toUpperCase() === wordleWord) {
            tileRow.guessed = true
            setTimeout(() => {
                const answerElem = createElement(
                    'div',
                    'bg-slate-200 p-2 text-center font-semibold rounded-lg text-lg',
                    'Well Done!'
                )
                errorSlideRef.current.insertBefore(answerElem, errorSlideRef.current.firstChild)
            }, 2.5 * 1000)
            updateLetterStatus(tileRow, wordleWord)

            setTimeout(() => {
                const updatedStats = setLocalData('WIN', currRow)
                setStats(updatedStats)
            }, 5 * 1000)
        } else {
            // The guess is not correct
            tileRow.guessed = true

            if (currRow === 5) {
                // All the guesses are used and player failed to guess the correct word
                // Show the correct word in Error slide
                const answerElem = createElement(
                    'div',
                    'bg-slate-200 p-2 text-center font-semibold rounded-lg text-lg',
                    wordleWord.toUpperCase()
                )
                errorSlideRef.current.insertBefore(answerElem, errorSlideRef.current.firstChild)

                setTimeout(() => {
                    const updatedStats = setLocalData('LOSS', currRow)
                    setStats(updatedStats)
                }, 5 * 1000)
            }
            updateLetterStatus(tileRow, wordleWord)
        }
        tiles[currRow] = tileRow
        setTiles(tiles)
        setRow(currRow + 1)
        setIndex(0)
    }

    function handleGameAction(action: string | undefined) {
        if (!action) return

        // Check and evaluate the guess
        if (action === 'Enter') {
            evaluateRow()
        }

        // Delete a letter from row
        if (action === 'Backspace') {
            if (currIndex === 0) return

            const prevIndex = currIndex
            tiles[currRow].row[prevIndex - 1] = ''

            setIndex(currIndex - 1)
            setTiles(tiles)
        }

        // It's an alphabet, insert it in the row
        if (ALPHABETS.includes(action.toLowerCase())) {
            if (currIndex === 5) return
            tiles[currRow].row[currIndex] = action.toUpperCase()

            setIndex(currIndex + 1)
            setTiles(tiles)
        }
    }
    function handleKeyUpEvent(event: globalThis.KeyboardEvent) {
        handleGameAction(event.key)
    }

    function onKeyClick(event: MouseEvent<HTMLButtonElement>) {
        if (!(event.target instanceof HTMLButtonElement)) return
        event.target.blur()

        handleGameAction(event.target.dataset.action)
    }
    useEffect(() => {
        document.body.addEventListener('keyup', handleKeyUpEvent)
        return () => document.body.removeEventListener('keyup', handleKeyUpEvent)
    })

    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center relative overflow-hidden space-y-4">
            <div
                className="w-48 bg-transparent absolute p-3 space-y-4 z-10 top-28"
                ref={errorSlideRef}></div>

            {allTimeStats && <EndScreen allTimeStats={allTimeStats} />}
            {/* <EndScreen allTimeStats={allTimeStats} /> ?? */}

            <div className="wordle w-[20rem] h-[24rem] flex flex-col items-center justify-evenly">
                <WordleRow tileRow={tiles[0]} wordleWord={wordleWord} />
                <WordleRow tileRow={tiles[1]} wordleWord={wordleWord} />
                <WordleRow tileRow={tiles[2]} wordleWord={wordleWord} />
                <WordleRow tileRow={tiles[3]} wordleWord={wordleWord} />
                <WordleRow tileRow={tiles[4]} wordleWord={wordleWord} />
                <WordleRow tileRow={tiles[5]} wordleWord={wordleWord} />
            </div>

            <div className="keyboard w-[30rem] h-[13rem] flex flex-col items-center justify-evenly">
                <div className="keyboard-row w-full h-1/3 flex items-center justify-evenly">
                    {'QWERTYUIOP'.split('').map((alphabet) => {
                        return (
                            <KeyboardKey
                                alphabet={alphabet}
                                onKeyClick={onKeyClick}
                                letterStatus={letterStatus}
                            />
                        )
                    })}
                </div>
                <div className="keyboard-row w-full h-1/3 flex items-center justify-evenly px-6">
                    {'ASDFGHJKL'.split('').map((alphabet) => {
                        return (
                            <KeyboardKey
                                alphabet={alphabet}
                                onKeyClick={onKeyClick}
                                letterStatus={letterStatus}
                            />
                        )
                    })}
                </div>
                <div className="keyboard-row w-full h-1/3 flex items-center justify-evenly">
                    <button
                        className="w-16 h-16 bg-gray text-white text-sm font-semibold rounded-[4px] text-center flex items-center justify-center"
                        data-action="Enter"
                        onClick={(event) => {
                            onKeyClick(event)
                        }}>
                        ENTER
                    </button>

                    {'ZXCVBNM'.split('').map((alphabet) => {
                        return (
                            <KeyboardKey
                                alphabet={alphabet}
                                onKeyClick={onKeyClick}
                                letterStatus={letterStatus}
                            />
                        )
                    })}

                    <button
                        className="w-14 h-16 bg-gray text-white text-base font-semibold rounded-[4px] flex items-center justify-center"
                        data-action="Backspace"
                        onClick={(event) => {
                            onKeyClick(event)
                        }}>
                        <img
                            src={backspace}
                            alt="Backspace key"
                            className="bg-transparent"
                            onClick={(event) => {
                                const target = event.target as HTMLImageElement
                                target.parentElement?.click()
                            }}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}
