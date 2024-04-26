import { renderHook, act } from '@testing-library/react';
import { useAuthService } from '@/hooks/supabase/auth/useAuthService'; // 경로는 실제 상황에 맞게 조정
import { supabaseClient } from '@/supabase/client';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@/supabase/client', () => ({
  // mock 객체를 각 테스트 케이스가 실행될 때마다 초기화 후 새로 생성
  supabaseClient: {
    auth: {
      signUp: vi.fn().mockResolvedValue({ error: null }),
    },
  },
}));

const dependencies = {
  setIsLoadingSignup: vi.fn(),
  navigate: vi.fn(),
};

const inputData = {
  email: 'test@example.com',
  pw: 'password123',
  confirmPw: 'password123',
  username: 'testuser',
  baekjoonID: '12345',
};

describe('useAuthService signUp', () => {
  beforeEach(() => {
    // act 래퍼 내부에서 signUp 함수를 호출하기 전에 모의 함수를 초기화
    dependencies.setIsLoadingSignup.mockClear();
    dependencies.navigate.mockClear();
  });

  it('setIsLoadingSignup 함수를 boolean 값을 인수로 호출한다', async () => {
    const { result } = renderHook(() => useAuthService());
    await act(async () => {
      await result.current.signUp(dependencies)(inputData);
    });

    expect(dependencies.setIsLoadingSignup).toHaveBeenCalledWith(true);
  });

  it('navigate 함수를 한 번 호출한다 ', async () => {
    const { result } = renderHook(() => useAuthService());
    await act(async () => {
      await result.current.signUp(dependencies)(inputData);
    });

    expect(dependencies.navigate).toHaveBeenCalledTimes(1);
  });

  it('navigate 함수를 /signup/confirm 을 인자로 호출한다', async () => {
    const { result } = renderHook(() => useAuthService());
    await act(async () => {
      await result.current.signUp(dependencies)(inputData);
    });

    expect(dependencies.navigate).toHaveBeenCalledWith('/signup/confirm');
  });

  it('supabase.auth.signUp 함수를 호출한다', async () => {
    const { result } = renderHook(() => useAuthService());
    await act(async () => {
      await result.current.signUp(dependencies)(inputData);
    });

    expect(supabaseClient.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      options: {
        data: {
          user_name: 'testuser',
          avatar_url: null,
          baekjoon_id: '12345',
        },
      },
    });
  });
});
