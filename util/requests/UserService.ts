import User, {StrapiUser, LoginUser} from "../../models/User";
import StrapiResponse from "../../models/StrapiResponse";
import RequestService from "./RequestService";

export default class UserService {
    
    private endpoint = 'users';
    private requestService = new RequestService();

    async register(username: string, email: string, pass: string){
        const user: LoginUser = await this.requestService.post("auth/local/register", {data: {username: username, email: email, password: pass}});
        return user;
    }
    async login(id: string, pass: string){
        const user: LoginUser = await this.requestService.post("auth/local", {data: {identifier: id, password: pass}});
        return user;
    }

    async getAll() {
        const users: StrapiResponse<StrapiUser[]> =  await this.requestService.get(this.endpoint);
        return users.data;
    }

    async getOne(id: string) {
        const User: StrapiResponse<StrapiUser> = await this.requestService.get(this.endpoint + '/' + id);
        return User.data;
    }

    async createNew(user: User) {
        const createdUser: StrapiResponse<StrapiUser> = await this.requestService.post(this.endpoint, {data: {data: user}});
        return createdUser.data;
    }

    async update(id: number, user: User) {
        const updatedUser: StrapiResponse<StrapiUser> = await this.requestService.put(this.endpoint + '/' + id, {data: {data: user}});
        return updatedUser.data;
    }

    async delete(id: number) {
        const deletedUser: StrapiResponse<StrapiUser> = await this.requestService.delete(this.endpoint + '/' + id);
        return deletedUser.data;
    }

}