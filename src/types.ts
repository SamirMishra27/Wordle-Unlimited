export interface TileRow {
    row: string[]
    guessed: boolean
}

// export enum LetterStatus {
//     CORRECT = 4,
//     MISPLACED = 3,
//     WRONG = 2,
//     DEFAULT = 1,
// }
export interface LetterStatus {
    wrong: string[]
    misplaced: string[]
    correct: string[]
}

export enum TileColor {
    CORRECT = '#538d4e',
    MISPLACED = '#b59f3b',
    WRONG = '#3a3a3c',
    DEFAULT = '#121213',
}
