export type Story = {
    by: string,
    id: number,
    descendants: number,
    score: number,
    time: number,
    title: string,
    type: string,
    url: string
}

export type Comment = {
    by: string,
    id: number,
    kids: number[] | Comment[],
    parent: number | Comment,
    text: string,
    type: string,
    showChildComments?: boolean
}