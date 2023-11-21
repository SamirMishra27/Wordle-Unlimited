import WordleTile from './WordleTile'
import { useEffect, useState } from 'react'
import { TileRow, TileColor } from '../types'
import { seconds } from '../utils'

export default function WordleRow(props: { rowNo: number; tileRow: TileRow; wordleWord: string }) {
    const { rowNo, tileRow, wordleWord } = props
    const [isCorrect, setCorrect] = useState(false)

    useEffect(() => {
        if (tileRow.row.join('') === wordleWord) {
            setTimeout(() => setCorrect(true), seconds(2))
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
                                  key={`tile-${rowNo}-${index}`}
                                  correct={isCorrect}
                                  roll={true}
                                  guessed={true}
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
                                  key={`tile-${rowNo}-${index}`}
                                  correct={isCorrect}
                                  roll={true}
                                  guessed={true}
                              />
                          )
                      } else {
                          return (
                              <WordleTile
                                  tile={letter}
                                  style={TileColor.WRONG}
                                  index={index}
                                  key={`tile-${rowNo}-${index}`}
                                  correct={isCorrect}
                                  roll={true}
                                  guessed={true}
                              />
                          )
                      }
                  })
                : tileRow.row.map((letter, index) => {
                      return (
                          <WordleTile
                              tile={letter}
                              style={TileColor.MISPLACED}
                              index={index}
                              key={`tile-${rowNo}-${index}`}
                              correct={false}
                              roll={false}
                              guessed={false}
                          />
                      )
                  })}
        </div>
    )
}
