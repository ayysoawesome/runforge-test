import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

import type { Run } from '../model/run.types';
import { runService } from './run.service';

export const useRun = (id: string): UseQueryResult<Run, Error> =>
  useQuery({
    queryKey: ['runs', id],
    queryFn: () => runService.getRunById(id),
    enabled: id.length > 0,
  });
