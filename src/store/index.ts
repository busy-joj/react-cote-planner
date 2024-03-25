import { create } from 'zustand';

export interface IUserInfo {
    avatar_url: string
    email: string
    email_verified: boolean
    full_name: string
    iss: string
    name: string
    phone_verified: boolean
    preferred_username: string
    provider_id: string
    sub: string
    user_name: string
  }

interface IUserStore {
  userInfo: IUserInfo | null
  setUserInfo: (data: IUserInfo) => void
  deleteUserInfo: () => void
}

export const userStore = create<IUserStore>(set => ({
  userInfo: null,
  setUserInfo: data => {
    set({ userInfo: data });
  },
  deleteUserInfo: () => {
    set({ userInfo: null });
  },
}));
