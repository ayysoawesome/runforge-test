import type { FC } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/shared/api';
import { RunsPage } from '@/pages/runs';
import { RootLayout } from './layouts/RootLayout';

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout>
        <RunsPage />
      </RootLayout>
    </QueryClientProvider>
  );
};
