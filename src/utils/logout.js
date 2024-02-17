import { supabaseClient } from '@/supabase/client';

export const handleLogOut = async (e, deleteUserInfo, navigate) => {
  e.preventDefault();
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) console.error(error);
    deleteUserInfo();
    navigate('/');
  } catch (error) {
    console.error(error);
  }
};
