// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { runService } from '@/entities/run';
import type { Run } from '@/entities/run';

import { RunsList } from './RunsList';

const runs: Run[] = [
  {
    id: 'run-queued',
    name: 'Update dependencies',
    repository: 'api-service',
    branch: 'chore/dependencies',
    status: 'queued',
    createdAt: '2026-11-10T09:05:00Z',
    logs: ['Waiting for a runtime'],
  },
  {
    id: 'run-running',
    name: 'Auth refactor',
    repository: 'web-platform',
    branch: 'feature/auth',
    status: 'running',
    createdAt: '2026-11-10T08:42:00Z',
    logs: ['Running authentication tests'],
  },
  {
    id: 'run-succeeded',
    name: 'Fix checkout tests',
    repository: 'payments',
    branch: 'fix/checkout',
    status: 'succeeded',
    createdAt: '2026-11-10T07:18:00Z',
    durationSeconds: 184,
    logs: ['Preparing isolated runtime', 'All 42 tests passed'],
    result: 'All checkout tests pass.',
  },
  {
    id: 'run-failed',
    name: 'Investigate build failure',
    repository: 'web-platform',
    branch: 'fix/build',
    status: 'failed',
    createdAt: '2026-11-09T16:31:00Z',
    logs: ['Build failed'],
  },
];

const renderRuns = () => {
  vi.spyOn(runService, 'getRuns').mockResolvedValue(runs);

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <RunsList />
    </QueryClientProvider>,
  );
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('RunsList', () => {
  it('filters runs by status', async () => {
    renderRuns();
    const table = await screen.findByRole('table');

    fireEvent.click(screen.getByRole('button', { name: 'Failed' }));

    expect(screen.getByRole('button', { name: 'Failed' }).getAttribute('aria-pressed')).toBe('true');
    expect(within(table).getByRole('button', { name: 'Investigate build failure' })).toBeTruthy();
    expect(within(table).queryByRole('button', { name: 'Auth refactor' })).toBeNull();
  });

  it('searches by name and repository together with the status filter', async () => {
    renderRuns();
    const table = await screen.findByRole('table');
    const search = screen.getByRole('searchbox', { name: 'Search runs' });

    fireEvent.change(search, { target: { value: 'checkout' } });
    expect(within(table).getByRole('button', { name: 'Fix checkout tests' })).toBeTruthy();
    expect(within(table).queryByRole('button', { name: 'Auth refactor' })).toBeNull();

    fireEvent.change(search, { target: { value: 'web-platform' } });
    fireEvent.click(screen.getByRole('button', { name: 'Failed' }));
    expect(within(table).getByRole('button', { name: 'Investigate build failure' })).toBeTruthy();
    expect(within(table).queryByRole('button', { name: 'Auth refactor' })).toBeNull();
  });

  it('opens run details with logs and result', async () => {
    renderRuns();
    const table = await screen.findByRole('table');

    fireEvent.click(within(table).getByRole('button', { name: 'Fix checkout tests' }));

    const dialog = screen.getByRole('dialog', { name: 'Fix checkout tests' });
    expect(within(dialog).getByText(/All 42 tests passed/)).toBeTruthy();
    expect(within(dialog).getByText('All checkout tests pass.')).toBeTruthy();

    fireEvent.click(within(dialog).getByRole('button', { name: 'Закрыть окно' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
