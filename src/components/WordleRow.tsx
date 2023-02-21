import { TileRow } from '../types'
import WordleTile from './WordleTile'

export default function WordleRow(props: { tileRow: TileRow; wordleWord: string }) {
    const { tileRow, wordleWord } = props
    return (
        <div className="wordle-row w-full flex items-center justify-evenly flex-1 [column-gap:0.625rem] p-1 text-slate-200">
            {tileRow.guessed
                ? tileRow.row.map((letter, index) => {
                      if (
                          wordleWord.includes(letter) &&
                          wordleWord.slice(index, index + 1) === letter
                      ) {
                          return (
                              <WordleTile tile={letter} style={'bg-correct'} delay={index * 0.25} />
                          )
                      } else if (
                          wordleWord.includes(letter) &&
                          wordleWord.slice(index, index + 1) !== letter
                      ) {
                          return (
                              <WordleTile
                                  tile={letter}
                                  style={'bg-misplaced'}
                                  delay={index * 0.25}
                              />
                          )
                      } else {
                          return (
                              <WordleTile tile={letter} style={'bg-wrong'} delay={index * 0.25} />
                          )
                      }
                  })
                : tileRow.row.map((letter, index) => {
                      return (
                          <WordleTile
                              tile={tileRow.row[index]}
                              style={'bg-default'}
                              delay={index * 0.25}
                          />
                      )
                  })}
        </div>
    )
}
