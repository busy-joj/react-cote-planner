import { create } from 'zustand';

export const userStore = create(set => ({
  userInfo: null,
  setUserInfo: data => {
    set({ userInfo: data });
  },
  deleteUserInfo: () => {
    set({ userInfo: null });
  },
}));
