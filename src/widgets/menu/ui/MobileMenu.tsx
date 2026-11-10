import { useEffect, useRef } from 'react';

import { MenuNavigation } from './MenuNavigation';

const desktopMediaQuery = '(min-width: 48rem)';

export const MobileMenu = () => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia(desktopMediaQuery);
    const closeOnDesktop = () => {
      if (desktop.matches && menuRef.current?.matches(':popover-open')) {
        menuRef.current.hidePopover();
      }
    };

    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <>
      <div className='flex min-h-16 items-center justify-between border-b border-border-inverse bg-ink px-5 text-white md:hidden'>
        <span className='text-lg font-bold'>Runforge</span>
        <button
          type='button'
          aria-label='Открыть меню'
          aria-controls='mobile-menu'
          popoverTarget='mobile-menu'
          className='flex size-11 items-center justify-center rounded-lg border border-border-inverse outline-offset-2 focus-visible:outline-2 focus-visible:outline-white'
        >
          <svg
            aria-hidden='true'
            viewBox='0 0 24 24'
            fill='none'
            className='size-6'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          >
            <path d='M4 7h16M4 12h16M4 17h16' />
          </svg>
        </button>
      </div>

      <div
        ref={menuRef}
        id='mobile-menu'
        popover='auto'
        className='fixed inset-0 m-0 hidden h-dvh max-h-none w-screen max-w-none flex-col overflow-y-auto overscroll-contain border-0 bg-ink px-5 text-white [&:popover-open]:flex'
      >
        <div className='flex min-h-16 shrink-0 items-center justify-between border-b border-border-inverse'>
          <span className='text-lg font-bold'>Runforge</span>
          <button
            type='button'
            aria-label='Закрыть меню'
            popoverTarget='mobile-menu'
            popoverTargetAction='hide'
            className='flex size-11 items-center justify-center rounded-lg border border-border-inverse text-2xl outline-offset-2 focus-visible:outline-2 focus-visible:outline-white'
          >
            ×
          </button>
        </div>

        <div className='flex flex-1 flex-col py-7'>
          <h2 className='mb-5 text-xs font-bold tracking-[0.12em] text-white/70'>
            WORKSPACE
          </h2>
          <MenuNavigation fullscreen />
          <span className='mt-auto border-t border-border-inverse px-4 pt-6 text-lg text-white/70'>
            Settings
          </span>
        </div>
      </div>
    </>
  );
};
