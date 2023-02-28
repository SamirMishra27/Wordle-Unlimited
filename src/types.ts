export interface TileRow {
    row: string[]
    guessed: boolean
}

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

export interface AllTimeStats {
    played: number
    wins: number
    winsByAttempts: number[]
    streak: number
    highestStreak: number
    lastPlayed: number
}
