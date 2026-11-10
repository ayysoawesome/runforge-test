import { RunsList } from './RunsList';

export const RunsPage = () => {
  return (
    <section aria-labelledby='runs-heading'>
      <h1
        id='runs-heading'
        className='mb-6 text-2xl font-bold tracking-tight text-ink md:text-3xl'
      >
        Recent runs
      </h1>
      <RunsList />
    </section>
  );
};
