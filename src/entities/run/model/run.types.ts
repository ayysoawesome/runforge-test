import type { z } from 'zod';
import { runSchema } from './run.schemas';

export type Run = z.infer<typeof runSchema>;
export type RunStatus = Run['status'];
