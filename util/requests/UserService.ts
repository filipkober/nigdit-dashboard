import qs from 'qs';
import { toastDisplay } from '../../components/atoms/Toast';
import StrapiResponse from '../../models/StrapiResponse';
import ToastType from '../../models/ToastType';
import User, { LoginUser, SearchUser, StrapiUser } from '../../models/User';
import RequestService from './RequestService';

export default class UserService {
  private endpoint = 'users';
  private requestService = new RequestService();

  async register(username: string, email: string, pass: string) {
    const user: LoginUser = await this.requestService.post(
      'auth/local/register',
      { data: { username: username, email: email, password: pass } }
    );
    return user;
  }
  async login(id: string, pass: string) {
    const user: LoginUser = await this.requestService.post('auth/local', {
      data: { identifier: id, password: pass },
    });
    return user;
  }

  async getAll() {
    const users: StrapiResponse<StrapiUser[]> = await this.requestService.get(
      this.endpoint
    );
    return users.data;
  }

  async getMe() {
    const query = qs.stringify({
      populate: {
        posts: true,
        subnigdits: {
          populate: ['icon'],
        },
        owned_subnigdit: {
          populate: ['icon'],
        },
        moderates: {
          fields: ['id'],
        },
        comments: true,
        replies: true,
        profilePicture: true,
      },
    });

    const user: User = await this.requestService.get(
      this.endpoint + '/me?' + query,
      { auth: true }
    );
    return user;
  }

  async getOne(id: string) {
    const User: StrapiResponse<StrapiUser> = await this.requestService.get(
      this.endpoint + '/' + id
    );
    return User.data;
  }

  async createNew(user: User) {
    const createdUser: StrapiResponse<StrapiUser> =
      await this.requestService.post(this.endpoint, { data: { data: user } });
    return createdUser.data;
  }

  async update({
    aboutMe,
    email,
    username,
  }: {
    aboutMe?: string;
    email?: string;
    username?: string;
  }) {
    const updatedUser: StrapiResponse<StrapiUser> =
      await this.requestService.put(`${this.endpoint}/me`, {
        data: { aboutMe, email, username },
        auth: true,
      });
    return updatedUser.data;
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
    newPasswordConfirmation: string
  ) {
    const updatedUser: LoginUser = await this.requestService.post(
      'auth/change-password',
      {
        data: {
          password: newPassword,
          currentPassword: oldPassword,
          passwordConfirmation: newPasswordConfirmation,
        },
        auth: true,
        handleError(e) {
          toastDisplay(ToastType.Error, 'Password change failed');
        },
      }
    );
    toastDisplay(ToastType.Success, 'Password changed successfully');
    return updatedUser;
  }

  async delete(id: number) {
    const deletedUser: StrapiResponse<StrapiUser> =
      await this.requestService.delete(this.endpoint + '/' + id);
    return deletedUser.data;
  }

  async setProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('files.profilePicture', file);
    const response: User = await this.requestService.put(
      this.endpoint + '/me' + '/profile-picture',
      { data: formData, auth: true, contentType: 'multipart/form-data' }
    );
    return response;
  }

  async searchUsers(search: string) {
    const query = qs.stringify({
      filters: {
        username: {
          $containsi: search,
        },
      },
      fields: ['username', 'id'],
      populate: ['profilePicture'],
      pagination: {
        limit: 5,
      },
    });

    const users: SearchUser[] = await this.requestService.get(
      `${this.endpoint}?${query}`
    );

    return users;
  }
}
