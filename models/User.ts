import Post, { StrapiPost } from "./Post"
import Reply from "./Reply"
import Comment from "./Comment"
import Media, { StrapiMedia, mediaAdapter } from "./Media"

type User = {
    id?: number,
    username: string,
    email?: string,
    posts?: Post[],
    comments?: Comment[],
    replies?: Reply[],
    profilePicture?: Media,
    votes: UserVotes,
    aboutMe?: string,
    provider: string,
    subnigdits?: {id: number, name: string}[],
}
type StrapiUser = {
    id: number,
    attributes: {
        username: string,
        email: string,
        posts?: Post[],
        comments?: Comment[],
        replies?: Reply[],
        profilePicture?: StrapiMedia,
        votes: UserVotes,
        aboutMe?: string,
        provider: string,
    },
}
type LoginUser = {
    jwt: string,
    user: {
        id: string,
        username: string,
        email: string,
        provider: string,
        confirmed: boolean,
        blocked: boolean,
        votes: UserVotes,
        aboutMe?: string,
    }
}
type UserVotes = {
    upvotes: {
        posts: string[],
        comments: string[],
        replies: string[],
    }
    downvotes: {
        posts: string[],
        comments: string[],
        replies: string[],
    }
}

type SearchUser = {
    id: number,
    username: string,
    profilePicture?: Media,
}

const userAdapter = (user: StrapiUser): User => {
    return {
        id: user.id,
        username: user.attributes.username,
        email: user.attributes.email,
        posts: user.attributes.posts,
        comments: user.attributes.comments,
        replies: user.attributes.replies,
        profilePicture: user.attributes.profilePicture ? mediaAdapter(user.attributes.profilePicture) : undefined,
        votes: user.attributes.votes,
        aboutMe: user.attributes.aboutMe,
        provider: user.attributes.provider,
    }
}

export default User
export type {StrapiUser, LoginUser, UserVotes, SearchUser};
export {userAdapter}