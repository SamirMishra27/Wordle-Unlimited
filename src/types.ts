export interface TileRow {
    row: string[]
    guessed: boolean
}

export enum TileColor {
    CORRECT = '#538d4e',
    MISPLACED = '#b59f3b',
    WRONG = '#3a3a3c',
    DEFAULT = '#121213',
}
