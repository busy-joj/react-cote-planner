import { create } from 'zustand';

export const userStore = create(set => ({
  userInfo: {},
  setUserInfo: data => {
    set({ userInfo: data });
  },
  deleteUserInfo: () => {
    set({ userInfo: {} });
  },
}));
