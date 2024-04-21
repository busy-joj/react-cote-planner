export const queryKeys = {
  baekjoonController: {
    idCheck: (baekjoonId: string) => ['userCheck', baekjoonId] as const,
    solved: (baekjoonId: string) => ['solved', baekjoonId] as const,
    updateData: (baekjoonId: string) =>
      ['update', 'crawling', baekjoonId] as const,
  },
};
