type User = {
    id?: number,
    username?: string,
    email?: string,
}
type StrapiUser = {
    id: number,
    attributes: {
        username: string,
        email: string,
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