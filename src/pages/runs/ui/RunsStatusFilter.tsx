import type { RunStatus } from '@/entities/run';
import { runStatusLabels } from '../lib/runStatusLabels';

export type RunsStatusFilterValue = RunStatus | 'all';

interface RunsStatusFilterProps {
  value: RunsStatusFilterValue;
  onChange: (value: RunsStatusFilterValue) => void;
}

const filters: RunsStatusFilterValue[] = [
  'all',
  'queued',
  'running',
  'succeeded',
  'failed',
];

export const RunsStatusFilter = ({
  value,
  onChange,
}: RunsStatusFilterProps) => {
  return (
    <div
      role='group'
      aria-label='Filter runs by status'
      className='flex flex-wrap gap-2'
    >
      {filters.map((filter) => {
        const isSelected = value === filter;

        return (
          <button
            key={filter}
            type='button'
            aria-pressed={isSelected}
            onClick={() => onChange(filter)}
            className={`min-h-10 cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink ${
              isSelected
                ? 'border-ink bg-ink text-white'
                : 'border-border/20 bg-white text-ink hover:border-ink/50 hover:bg-canvas'
            }`}
          >
            {filter === 'all' ? 'All' : runStatusLabels[filter]}
          </button>
        );
      })}
    </div>
  );
};
