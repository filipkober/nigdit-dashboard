import Post, { StrapiPost } from "./Post"
import Reply from "./Reply"
import Comment from "./Comment"
import Media from "./Media"

type User = {
    id: number,
    username: string,
    email: string,
    posts: Post[],
    comments: Comment[],
    replies: Reply[],
    profilePicture: Media,
}
type StrapiUser = {
    id: number,
    attributes: {
        username: string,
        email: string,
        posts?: Post[],
        comments?: Comment[],
        replies?: Reply[],
        profilePicture?: Media,
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
    }
}

export default User
export type {StrapiUser, LoginUser};