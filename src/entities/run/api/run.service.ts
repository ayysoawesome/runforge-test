import { baseService } from '@/shared/api';
import { runSchema } from '../model/run.schemas';
import type { Run } from '../model/run.types';

const MOCK_DELAY_MS = 600;

const delay = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

class RunService {
  readonly #baseService: typeof baseService;

  constructor(service: typeof baseService) {
    this.#baseService = service;
  }

  async getRuns(): Promise<Run[]> {
    await delay();

    const response = await this.#baseService.get('/runs.json');

    return runSchema.array().parse(response);
  }

  async getRunById(id: string): Promise<Run> {
    const runs = await this.getRuns();
    const run = runs.find((item) => item.id === id);

    if (!run) {
      throw new Error(`Run ${id} not found`);
    }

    return run;
  }
}

export const runService = new RunService(baseService);
