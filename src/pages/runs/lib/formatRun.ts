const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export const formatCreatedAt = (value: string): string => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : dateFormatter.format(date);
};

export const formatDuration = (seconds?: number): string => {
  if (seconds === undefined) return '—';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return minutes ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
};
