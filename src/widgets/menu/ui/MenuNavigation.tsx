interface IMenuNavigationProps {
  fullscreen?: boolean;
}

const navigation = [
  { label: 'Runs', href: '/' },
  { label: 'Projects' },
  { label: 'Devboxes' },
  { label: 'Previews' },
  { label: 'Snapshots' },
];

export const MenuNavigation = ({ fullscreen = false }: IMenuNavigationProps) => {
  const itemClassName = fullscreen
    ? 'flex min-h-14 items-center rounded-lg px-4 text-lg'
    : 'flex min-h-10 items-center rounded-lg px-3 text-sm';

  return (
    <nav aria-label='Навигация по рабочей области'>
      <ul className={fullscreen ? 'space-y-2' : 'space-y-1'}>
        {navigation.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <a
                href={item.href}
                aria-current='page'
                className={`${itemClassName} bg-canvas font-semibold text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-white`}
              >
                {item.label}
              </a>
            ) : (
              <span className={`${itemClassName} text-white/70`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
