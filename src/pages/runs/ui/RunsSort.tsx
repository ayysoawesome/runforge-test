export type RunsSortBy = 'createdAt' | 'durationSeconds';
export type RunsSortDirection = 'asc' | 'desc';

interface RunsSortProps {
  sortBy: RunsSortBy;
  sortDirection: RunsSortDirection;
  onSortByChange: (sortBy: RunsSortBy) => void;
  onSortDirectionChange: (sortDirection: RunsSortDirection) => void;
}

interface RunsSortOption {
  label: string;
  sortBy: RunsSortBy;
  sortDirection: RunsSortDirection;
}

const sortOptions: RunsSortOption[] = [
  { label: 'Earlier', sortBy: 'createdAt', sortDirection: 'asc' },
  { label: 'Later', sortBy: 'createdAt', sortDirection: 'desc' },
  { label: 'Longer', sortBy: 'durationSeconds', sortDirection: 'desc' },
  { label: 'Shorter', sortBy: 'durationSeconds', sortDirection: 'asc' },
];

export const RunsSort = ({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}: RunsSortProps) => {
  return (
    <div className='mb-4 flex items-center justify-end gap-3'>
      <label htmlFor='runs-sort' className='text-sm font-semibold text-text-muted'>
        Sort by
      </label>
      <select
        id='runs-sort'
        value={`${sortBy}-${sortDirection}`}
        onChange={(event) => {
          const selectedOption = sortOptions.find(
            (option) => `${option.sortBy}-${option.sortDirection}` === event.currentTarget.value,
          );
          if (selectedOption) {
            onSortByChange(selectedOption.sortBy);
            onSortDirectionChange(selectedOption.sortDirection);
          }
        }}
        className='min-h-11 rounded-control border border-border/20 bg-white px-3 py-2 text-sm text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink'
      >
        {sortOptions.map((option) => (
          <option
            key={`${option.sortBy}-${option.sortDirection}`}
            value={`${option.sortBy}-${option.sortDirection}`}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
