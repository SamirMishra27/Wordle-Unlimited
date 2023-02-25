import { useEffect, useState } from 'react'
import { TileRow, TileColor } from '../types'
import WordleTile from './WordleTile'

export default function WordleRow(props: { tileRow: TileRow; wordleWord: string }) {
    const { tileRow, wordleWord } = props
    const [isCorrect, setCorrect] = useState(false)

    useEffect(() => {
        if (tileRow.row.join('') === wordleWord) {
            setTimeout(() => setCorrect(true), 2000)
        }
    }, [tileRow.guessed])
    return (
        <div className="wordle-row w-full flex items-center justify-evenly flex-1 [column-gap:0.625rem] p-1 text-slate-200">
            {tileRow.guessed
                ? tileRow.row.map((letter, index) => {
                      if (
                          wordleWord.includes(letter) &&
                          wordleWord.slice(index, index + 1) === letter
                      ) {
                          return (
                              <WordleTile
                                  tile={letter}
                                  style={TileColor.CORRECT}
                                  index={index}
                                  correct={isCorrect}
                                  roll={true}
                              />
                          )
                      } else if (
                          wordleWord.includes(letter) &&
                          wordleWord.slice(index, index + 1) !== letter
                      ) {
                          return (
                              <WordleTile
                                  tile={letter}
                                  style={TileColor.MISPLACED}
                                  index={index}
                                  correct={isCorrect}
                                  roll={true}
                              />
                          )
                      } else {
                          return (
                              <WordleTile
                                  tile={letter}
                                  style={TileColor.WRONG}
                                  index={index}
                                  correct={isCorrect}
                                  roll={true}
                              />
                          )
                      }
                  })
                : tileRow.row.map((letter, index) => {
                      return (
                          <WordleTile
                              tile={tileRow.row[index]}
                              style={TileColor.MISPLACED}
                              index={index}
                              correct={false}
                              roll={false}
                          />
                      )
                  })}
        </div>
    )
}
