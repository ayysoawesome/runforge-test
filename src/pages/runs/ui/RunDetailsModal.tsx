import type { Run } from '@/entities/run';
import { Modal } from '@/shared/ui';

import { formatCreatedAt, formatDuration } from '../lib/formatRun';
import { StatusBadge } from './StatusBadge';

type RunDetailsModalProps = {
  run: Run | null;
  onClose: () => void;
};

export const RunDetailsModal = ({ run, onClose }: RunDetailsModalProps) => {
  return (
    <Modal isOpen={run !== null} onClose={onClose} title={run?.name ?? 'Run details'}>
      {run && (
        <>
          <dl className='grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 text-sm'>
            <dt className='text-text-muted'>Run ID</dt>
            <dd className='min-w-0 break-all font-mono'>{run.id}</dd>
            <dt className='text-text-muted'>Repository</dt>
            <dd className='min-w-0 break-words'>{run.repository}</dd>
            <dt className='text-text-muted'>Branch</dt>
            <dd className='min-w-0 break-all font-mono'>{run.branch}</dd>
            <dt className='text-text-muted'>Status</dt>
            <dd>
              <StatusBadge status={run.status} />
            </dd>
            <dt className='text-text-muted'>Created</dt>
            <dd>
              <time dateTime={run.createdAt}>{formatCreatedAt(run.createdAt)}</time>
            </dd>
            <dt className='text-text-muted'>Duration</dt>
            <dd>{formatDuration(run.durationSeconds)}</dd>
          </dl>

          <section className='mt-6'>
            <h3 className='mb-2 font-semibold'>Logs</h3>
            {run.logs.length > 0 ? (
              <pre className='max-h-64 overflow-auto rounded-control bg-ink p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words text-white'>
                {run.logs.join('\n')}
              </pre>
            ) : (
              <p className='text-sm text-text-muted'>No logs yet.</p>
            )}
          </section>

          {run.result !== undefined && (
            <section className='mt-6'>
              <h3 className='mb-2 font-semibold'>Result</h3>
              <p className='whitespace-pre-wrap break-words text-sm'>{run.result}</p>
            </section>
          )}
        </>
      )}
    </Modal>
  );
};
