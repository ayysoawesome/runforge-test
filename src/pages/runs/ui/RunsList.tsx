import { useState } from 'react';

import { useRuns } from '@/entities/run';
import type { Run } from '@/entities/run';
import { RunsStatusFilter } from './RunsStatusFilter';
import type { RunsStatusFilterValue } from './RunsStatusFilter';
import { RunsSearch } from './RunsSearch';
import { RunsSort } from './RunsSort';
import type { RunsSortBy, RunsSortDirection } from './RunsSort';
import { RunDetailsModal } from './RunDetailsModal';
import { StatusBadge } from './StatusBadge';
import { formatCreatedAt, formatDuration } from '../lib/formatRun';

const RunsTable = ({ runs, onSelectRun }: { runs: Run[]; onSelectRun: (run: Run) => void }) => {
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
            <tr key={run.id} onClick={() => onSelectRun(run)} className='cursor-pointer hover:bg-canvas/70'>
              <th scope='row' className='px-5 py-5 font-semibold text-ink'>
                <button
                  type='button'
                  aria-haspopup='dialog'
                  className='rounded-sm text-left outline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-ink'
                >
                  {run.name}
                </button>
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

const RunsCards = ({ runs, onSelectRun }: { runs: Run[]; onSelectRun: (run: Run) => void }) => {
  return (
    <ul className='grid gap-3 sm:grid-cols-2 md:hidden'>
      {runs.map((run) => (
        <li key={run.id} className='min-w-0'>
          <article
            onClick={() => onSelectRun(run)}
            className='h-full min-w-0 cursor-pointer rounded-card border border-border/15 bg-white p-5 hover:bg-canvas/70'
          >
            <header className='mb-4 flex flex-wrap items-start justify-between gap-3'>
              <h2 className='min-w-0 text-base font-semibold break-words text-ink'>
                <button
                  type='button'
                  aria-haspopup='dialog'
                  className='rounded-sm text-left outline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-ink'
                >
                  {run.name}
                </button>
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
  const [sortBy, setSortBy] = useState<RunsSortBy>('createdAt');
  const [sortDirection, setSortDirection] = useState<RunsSortDirection>('desc');
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);
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
  const sortedRuns = [...filteredRuns].sort((first, second) => {
    const firstValue = sortBy === 'createdAt' ? Date.parse(first.createdAt) : first.durationSeconds;
    const secondValue = sortBy === 'createdAt' ? Date.parse(second.createdAt) : second.durationSeconds;
    const firstMissing = firstValue === undefined || Number.isNaN(firstValue);
    const secondMissing = secondValue === undefined || Number.isNaN(secondValue);

    if (firstMissing || secondMissing) {
      return Number(firstMissing) - Number(secondMissing);
    }

    return sortDirection === 'desc' ? secondValue - firstValue : firstValue - secondValue;
  });

  return (
    <>
      <search
        aria-label='Search and filter runs'
        className='mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'
      >
        <RunsSearch value={searchQuery} onChange={setSearchQuery} />
        <RunsStatusFilter value={selectedStatus} onChange={setSelectedStatus} />
      </search>
      <RunsSort
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection}
      />
      {filteredRuns.length === 0 ? (
        <div className='rounded-card border border-border/15 bg-white p-6 text-text-muted'>
          <p>
            {data.length === 0
              ? 'No runs yet.'
              : 'No runs match your search or status filter.'}
          </p>
          {data.length > 0 && (
            <button
              type='button'
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('all');
              }}
              className='mt-4 min-h-11 rounded-control bg-ink px-4 py-2 text-sm font-semibold text-white outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink'
            >
              Clear search and filters
            </button>
          )}
        </div>
      ) : (
        <>
          <RunsTable runs={sortedRuns} onSelectRun={setSelectedRun} />
          <RunsCards runs={sortedRuns} onSelectRun={setSelectedRun} />
        </>
      )}
      <RunDetailsModal run={selectedRun} onClose={() => setSelectedRun(null)} />
    </>
  );
};
