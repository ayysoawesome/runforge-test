import type { FC } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/shared/api';
import { RunsPage } from '@/pages/runs';

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RunsPage />
    </QueryClientProvider>
  );
};
