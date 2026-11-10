import { useState } from 'react';

import { useRuns } from '@/entities/run';
import type { Run, RunStatus } from '@/entities/run';
import { RunsStatusFilter } from './RunsStatusFilter';
import type { RunsStatusFilterValue } from './RunsStatusFilter';
import { RunsSearch } from './RunsSearch';
import { runStatusLabels } from '../lib/runStatusLabels';

const statusClasses: Record<RunStatus, string> = {
  queued: 'bg-warning-soft',
  running: 'bg-accent-soft',
  succeeded: 'bg-success-soft',
  failed: 'bg-danger-soft',
};

const statusDotClasses: Record<RunStatus, string> = {
  queued: 'bg-warning',
  running: 'bg-accent',
  succeeded: 'bg-success',
  failed: 'bg-danger',
};

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const formatCreatedAt = (value: string): string => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : dateFormatter.format(date);
};

const formatDuration = (seconds?: number): string => {
  if (seconds === undefined) return '—';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return minutes ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
};

const StatusBadge = ({ status }: { status: RunStatus }) => {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink ${statusClasses[status]}`}
    >
      <span
        aria-hidden='true'
        className={`size-2 rounded-full ${statusDotClasses[status]}`}
      />
      {runStatusLabels[status]}
    </span>
  );
};

const RunsTable = ({ runs }: { runs: Run[] }) => {
  return (
    <div
      role='region'
      aria-label='Recent runs table'
      tabIndex={0}
      className='hidden overflow-x-auto rounded-card border border-border/15 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:block'
    >
      <table className='w-full min-w-[900px] border-collapse text-left text-sm'>
        <caption className='sr-only'>Recent runs</caption>
        <thead className='border-b border-border/15 bg-canvas text-xs uppercase tracking-wide text-text-muted'>
          <tr>
            <th scope='col' className='px-5 py-4 font-semibold'>
              Name
            </th>
            <th scope='col' className='px-5 py-4 font-semibold'>
              Repository
            </th>
            <th scope='col' className='px-5 py-4 font-semibold'>
              Branch
            </th>
            <th scope='col' className='px-5 py-4 font-semibold'>
              Status
            </th>
            <th scope='col' className='px-5 py-4 font-semibold'>
              Created
            </th>
            <th scope='col' className='px-5 py-4 font-semibold'>
              Duration
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-border/10'>
          {runs.map((run) => (
            <tr key={run.id}>
              <th scope='row' className='px-5 py-5 font-semibold text-ink'>
                {run.name}
              </th>
              <td className='px-5 py-5'>{run.repository}</td>
              <td className='px-5 py-5 font-mono text-xs break-all text-text-muted'>
                {run.branch}
              </td>
              <td className='px-5 py-5'>
                <StatusBadge status={run.status} />
              </td>
              <td className='whitespace-nowrap px-5 py-5 text-text-muted'>
                <time dateTime={run.createdAt}>
                  {formatCreatedAt(run.createdAt)}
                </time>
              </td>
              <td className='whitespace-nowrap px-5 py-5 text-text-muted'>
                {formatDuration(run.durationSeconds)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RunsCards = ({ runs }: { runs: Run[] }) => {
  return (
    <ul className='grid gap-3 sm:grid-cols-2 md:hidden'>
      {runs.map((run) => (
        <li key={run.id} className='min-w-0'>
          <article className='h-full min-w-0 rounded-card border border-border/15 bg-white p-5'>
            <header className='mb-4 flex flex-wrap items-start justify-between gap-3'>
              <h2 className='min-w-0 text-base font-semibold break-words text-ink'>
                {run.name}
              </h2>
              <StatusBadge status={run.status} />
            </header>
            <dl className='grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 text-sm'>
              <dt className='text-text-muted'>Repository</dt>
              <dd className='min-w-0 break-words text-right'>
                {run.repository}
              </dd>
              <dt className='text-text-muted'>Branch</dt>
              <dd className='min-w-0 font-mono text-xs break-all text-right'>
                {run.branch}
              </dd>
              <dt className='text-text-muted'>Created</dt>
              <dd className='min-w-0 text-right'>
                <time dateTime={run.createdAt}>
                  {formatCreatedAt(run.createdAt)}
                </time>
              </dd>
              <dt className='text-text-muted'>Duration</dt>
              <dd className='min-w-0 text-right'>
                {formatDuration(run.durationSeconds)}
              </dd>
            </dl>
          </article>
        </li>
      ))}
    </ul>
  );
};

export const RunsList = () => {
  const [selectedStatus, setSelectedStatus] =
    useState<RunsStatusFilterValue>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isPending, isError, refetch } = useRuns();

  if (isPending) {
    return (
      <div className='flex items-center gap-3 rounded-card border border-border/15 bg-white p-6 text-text-muted'>
        <span
          aria-hidden='true'
          className='size-4 animate-spin rounded-full border-2 border-ink/20 border-t-ink motion-reduce:animate-none'
        />
        <span>Loading runs…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='rounded-card border border-danger/30 bg-danger-soft p-6'>
        <p className='mb-4 font-semibold'>Could not load runs.</p>
        <button
          type='button'
          onClick={() => void refetch()}
          className='min-h-11 rounded-control bg-ink px-4 py-2 text-sm font-semibold text-white outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink'
        >
          Retry
        </button>
      </div>
    );
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredRuns = data.filter(
    (run) =>
      (selectedStatus === 'all' || run.status === selectedStatus) &&
      (run.name.toLowerCase().includes(normalizedQuery) ||
        run.repository.toLowerCase().includes(normalizedQuery)),
  );

  return (
    <>
      <search
        aria-label='Search and filter runs'
        className='mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'
      >
        <RunsSearch value={searchQuery} onChange={setSearchQuery} />
        <RunsStatusFilter value={selectedStatus} onChange={setSelectedStatus} />
      </search>
      {filteredRuns.length === 0 ? (
        <div className='rounded-card border border-border/15 bg-white p-6 text-text-muted'>
          {data.length === 0
            ? 'No runs yet.'
            : 'No runs match your search or status filter.'}
        </div>
      ) : (
        <>
          <RunsTable runs={filteredRuns} />
          <RunsCards runs={filteredRuns} />
        </>
      )}
    </>
  );
};
