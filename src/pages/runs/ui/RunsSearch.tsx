interface RunsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const RunsSearch = ({ value, onChange }: RunsSearchProps) => {
  return (
    <div className='w-full lg:max-w-64'>
      <label
        htmlFor='runs-search'
        className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-text-muted'
      >
        Search runs
      </label>
      <input
        id='runs-search'
        name='runs-search'
        type='search'
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder='Name or repository'
        autoCapitalize='none'
        spellCheck={false}
        className='min-h-11 w-full rounded-control border border-border/20 bg-white px-4 py-2 text-base text-ink outline-offset-2 placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-ink'
      />
    </div>
  );
};
