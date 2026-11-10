import { z } from 'zod';

export const runSchema = z.object({
  id: z.string(),
  name: z.string(),
  repository: z.string(),
  branch: z.string(),
  status: z.enum(['queued', 'running', 'succeeded', 'failed']),
  createdAt: z.string(),
  durationSeconds: z.number().optional(),
  logs: z.array(z.string()),
  result: z.string().optional(),
});
