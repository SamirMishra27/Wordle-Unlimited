import { useState, useEffect, useRef, MutableRefObject, MouseEvent } from 'react'

import WordleRow from './components/WordleRow'
import KeyboardKey from './components/KeyboardKey'
import EndScreen from './components/EndScreen'
import ClipboardModal from './components/ClipboardModal'

import { createElement, seconds, setLocalData } from './utils'
import { AllTimeStats, TileRow, wordleAction } from './types'

import './index.css'
import WORDLE_WORDS from '../data/words'
import backspace from './assets/backspace.svg'
import share from './assets/share.svg'

function getRandomWordleWord() {
    const randomWordIndex = Math.floor(Math.random() * WORDLE_WORDS.length)
    const wordleWordAns = WORDLE_WORDS[randomWordIndex].toUpperCase()

    return wordleWordAns
}

// Some constants
const ERR_EXP_AFTER = 2.2 * 1000
const ALPHABETS = 'abcdefghijklmnopqrstuvwxyz'
const MAX_WORDLE_ROWS = 6
const MAX_WORDLE_COLUMNS = 5

export default function App(): JSX.Element {
    const [wordleWord, setWordleWord] = useState<string>(getRandomWordleWord())
    const [tiles, setTiles] = useState(
        Array<TileRow | null>(MAX_WORDLE_ROWS)
            .fill(null)
            .map(() => ({ row: ['', '', '', '', ''], guessed: false }))
    )
    const [currRow, setRow] = useState(0)
    const [currIndex, setIndex] = useState(0)

    const [letterStatus, setLetterStatus] = useState({
        wrong: Array<string>(),
        misplaced: Array<string>(),
        correct: Array<string>(),
    })
    const notifSlideRef = useRef() as MutableRefObject<HTMLDivElement>
    const wordleRef = useRef() as MutableRefObject<HTMLDivElement>

    const [allTimeStats, setStats] = useState<AllTimeStats | null>(null)
    const [wordleCopy, setWordleCopy] = useState<Node | null>(null)

    const removeCopy = () => setWordleCopy(null)

    function reset() {
        // Reset and start a new game!
        setWordleWord(getRandomWordleWord())
        setTiles(
            Array<TileRow | null>(MAX_WORDLE_ROWS)
                .fill(null)
                .map(() => ({ row: ['', '', '', '', ''], guessed: false }))
        )
        // Reset index and row
        setRow(0)
        setIndex(0)
        // Resetting letter status to remove keyboard formatting
        setLetterStatus({
            wrong: Array<string>(),
            misplaced: Array<string>(),
            correct: Array<string>(),
        })
        // This method removes all children from element node
        notifSlideRef.current.replaceChildren()
        setStats(null)
    }

    function pushNotif(string: string) {
        const errorChild = createElement(
            'div',
            'bg-slate-200 p-2 text-center font-semibold rounded-lg delete-after',
            string
        )
        notifSlideRef.current.insertBefore(errorChild, notifSlideRef.current.firstChild)
        setTimeout(() => {
            notifSlideRef.current.removeChild(errorChild)
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
        if (currIndex !== MAX_WORDLE_COLUMNS) {
            return pushNotif('Not enough words')
        }
        const tileRow = tiles[currRow]
        const currGuess = tileRow.row.join('')

        // If the word is not in global list
        if (!WORDLE_WORDS.includes(currGuess.toLowerCase())) {
            return pushNotif('Not in word list')
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
                notifSlideRef.current.insertBefore(answerElem, notifSlideRef.current.firstChild)
            }, seconds(2.5))
            updateLetterStatus(tileRow, wordleWord)

            setTimeout(() => {
                const updatedStats = setLocalData('WIN', currRow)
                setStats(updatedStats)
            }, seconds(5))
        } else {
            // The guess is not correct
            tileRow.guessed = true

            // All the guesses are used and player
            // failed to guess the correct word
            // Show the correct word in Error slide
            if (currRow === MAX_WORDLE_ROWS - 1) {
                const answerElem = createElement(
                    'div',
                    'bg-slate-200 p-2 text-center font-semibold rounded-lg text-lg',
                    wordleWord.toUpperCase()
                )
                notifSlideRef.current.insertBefore(answerElem, notifSlideRef.current.firstChild)

                setTimeout(() => {
                    const updatedStats = setLocalData('LOSS', currRow)
                    setStats(updatedStats)
                }, seconds(5))
            }
            updateLetterStatus(tileRow, wordleWord)
        }
        tiles[currRow] = tileRow
        setTiles(tiles)
        setRow(currRow + 1)
        setIndex(0)
    }

    function handleGameAction(action: wordleAction) {
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
            if (currIndex === MAX_WORDLE_COLUMNS) return
            tiles[currRow].row[currIndex] = action.toUpperCase()

            setIndex(currIndex + 1)
            setTiles(tiles)
        }
    }

    // Physical keyboard event handler
    function handleKeyUpEvent(event: globalThis.KeyboardEvent) {
        handleGameAction(event.key as wordleAction)
    }

    // Virtual keyboard event handler
    function onKeyClick(event: MouseEvent<HTMLButtonElement>) {
        if (!(event.target instanceof HTMLButtonElement)) return
        event.target.blur()

        handleGameAction(event.target.dataset.action as wordleAction)
    }
    useEffect(() => {
        document.body.addEventListener('keyup', handleKeyUpEvent)

        return () => document.body.removeEventListener('keyup', handleKeyUpEvent)
    })

    return (
        <div className="w-full tall:h-[100vh] flex flex-col items-center justify-center relative overflow-x-hidden space-y-4">
            <div
                className="w-48 bg-transparent absolute p-3 space-y-4 z-10 top-28"
                ref={notifSlideRef}
            />

            <button
                className={
                    'copy-button w-12 sm:w-16 h-8 sm:h-10 bg-correct absolute top-0 sm:top-4 right-2 sm:right-6 rounded-2xl p-px ' +
                    'text-white text-sm font-medium ' +
                    'hover:bg-[#60a25a] transition active:bg-correct mt-4 outline-transparent'
                }
                data-action="Copy"
                title="Copy Current Tiles">
                <img
                    src={share}
                    alt="Copy Current Tiles"
                    className="bg-transparent w-6 sm:w-8 h-auto"
                    onClick={() => setWordleCopy(wordleRef.current.cloneNode(true))}
                />
            </button>

            {allTimeStats && <EndScreen allTimeStats={allTimeStats} reset={reset} />}
            {wordleCopy && (
                <ClipboardModal
                    wordleCopy={wordleCopy}
                    removeCopy={removeCopy}
                    pushNotif={pushNotif}
                />
            )}

            <div
                className="wordle w-[20rem] h-[24rem] flex flex-col items-center justify-evenly bg-background"
                ref={wordleRef}>
                <WordleRow rowNo={0} tileRow={tiles[0]} wordleWord={wordleWord} />
                <WordleRow rowNo={1} tileRow={tiles[1]} wordleWord={wordleWord} />
                <WordleRow rowNo={2} tileRow={tiles[2]} wordleWord={wordleWord} />
                <WordleRow rowNo={3} tileRow={tiles[3]} wordleWord={wordleWord} />
                <WordleRow rowNo={4} tileRow={tiles[4]} wordleWord={wordleWord} />
                <WordleRow rowNo={5} tileRow={tiles[5]} wordleWord={wordleWord} />
            </div>

            <div className="keyboard w-[99%] sm:w-[30rem] h-48 sm:h-[13rem] flex flex-col items-center justify-evenly">
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
                        className="w-16 h-14 sm:h-16 bg-gray text-white text-sm font-semibold sm:rounded-[4px] rounded-lg text-center flex items-center justify-center"
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
                        className="w-14 h-14 sm:h-16 bg-gray text-white text-base font-semibold sm:rounded-[4px] rounded-lg flex items-center justify-center"
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
