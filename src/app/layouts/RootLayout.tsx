import type { FC, PropsWithChildren } from 'react';

import { Menu } from '@/widgets/menu';

interface IRootLayoutProps {}

export const RootLayout: FC<PropsWithChildren<IRootLayoutProps>> = ({
  children,
}) => {
  return (
    <div className='flex min-h-dvh flex-col bg-canvas font-sans text-ink md:flex-row'>
      <Menu />
      <div className='min-w-0 flex-1'>
        <header className='flex min-h-16 items-center justify-between gap-3 border-b border-border/20 px-5 md:px-8'>
          <p className='min-w-0 truncate text-sm'>
            <span className='mr-2 text-xs font-bold tracking-[0.12em] text-ink/60'>
              PROJECT
            </span>
            <span aria-hidden='true' className='mr-2 text-ink/50'>
              /
            </span>
            web-platform
          </p>
          <span className='shrink-0 rounded-md bg-ink px-2.5 py-1.5 text-xs font-bold tracking-wide text-canvas'>
            LIVE
          </span>
        </header>
        <main className='min-w-0 px-5 py-6 md:px-8 md:py-8'>{children}</main>
      </div>
    </div>
  );
};
