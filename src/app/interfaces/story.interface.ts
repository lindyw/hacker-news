export interface Story {
    id: number
    by: string
    // total comment count
    descendants: number
    dead?: boolean
    kids: number[]
    score: number
    time: number
    title: string
    type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt'
    url: string
}
    