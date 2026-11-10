import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

import type { Run } from '../model/run.types';
import { runService } from './run.service';

export const useRuns = (): UseQueryResult<Run[], Error> =>
  useQuery({
    queryKey: ['runs'],
    queryFn: () => runService.getRuns(),
  });
