type Reply = {
    id?: number,
    content?: string,
    votes?: number,
    created_at?: string,
}

type StrapiReply = {
    id: number,
    attributes: {
        content: string,
        votes: number,
        created_at: string,
    },
}

export default Reply
export type { StrapiReply };