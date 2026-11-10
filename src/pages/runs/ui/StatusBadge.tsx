import type { RunStatus } from '@/entities/run';

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

export const StatusBadge = ({ status }: { status: RunStatus }) => {
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
