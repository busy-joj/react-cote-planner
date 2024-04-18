import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { supabaseClient } from '../client';
import { IFormValues } from '@/types/form/login';

export const useAuthService = () => {
  const authService: SupabaseAuthClient = supabaseClient.auth;

  const signUp = async () => {
    // 로직 구현
  };

  const signOut = async () => {
    // 로직 구현
  };

  const signInWithPassword = async (data: IFormValues) => {
    const { userEmail, userPW } = data;
    return await authService.signInWithPassword({
      email: userEmail,
      password: userPW,
    });
  };

  const signInWithKakao = async () => {
    return await authService.signInWithOAuth({
      provider: 'kakao',
    });
  };

  const getSession = async () => {
    // 로직 구현
  };

  const onAuthStateChange = async () => {
    // 로직 구현
  };

  const updateUser = async () => {
    // 로직 구현
  };

  const resetPasswordForEmail = async () => {
    // 로직 구현
  };

  return {
    signUp,
    signOut,
    signInWithPassword,
    signInWithKakao,
    getSession,
    onAuthStateChange,
    updateUser,
    resetPasswordForEmail,
  };
};
