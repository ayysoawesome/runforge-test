import { useEffect, useRef } from 'react';

import { MenuNavigation } from './MenuNavigation';

const desktopMediaQuery = '(min-width: 48rem)';

export const MobileMenu = () => {
  const menuRef = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef<string | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia(desktopMediaQuery);
    const menu = menuRef.current;
    if (!menu) return;

    const restoreScroll = () => {
      if (menu.open || previousOverflow.current === null) return;
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    };
    const closeOnDesktop = () => {
      if (desktop.matches && menu.open) {
        menu.close();
      }
    };

    menu.addEventListener('close', restoreScroll);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      desktop.removeEventListener('change', closeOnDesktop);
      menu.removeEventListener('close', restoreScroll);
      if (menu.open) {
        menu.close();
        restoreScroll();
      }
    };
  }, []);

  const openMenu = () => {
    const menu = menuRef.current;
    if (!menu || menu.open) return;

    if (previousOverflow.current === null) {
      previousOverflow.current = document.body.style.overflow;
    }
    menu.showModal();
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <div className='flex min-h-16 items-center justify-between border-b border-border-inverse bg-ink px-5 text-white md:hidden'>
        <span className='text-lg font-bold'>Runforge</span>
        <button
          type='button'
          aria-label='Открыть меню'
          aria-controls='mobile-menu'
          onClick={openMenu}
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

      <dialog
        ref={menuRef}
        id='mobile-menu'
        aria-label='Меню'
        className='fixed inset-0 m-0 hidden h-dvh max-h-none w-screen max-w-none flex-col overflow-y-auto overscroll-contain border-0 bg-ink px-5 py-0 text-white [&[open]]:flex'
      >
        <div className='flex min-h-16 shrink-0 items-center justify-between border-b border-border-inverse'>
          <span className='text-lg font-bold'>Runforge</span>
          <button
            type='button'
            aria-label='Закрыть меню'
            autoFocus
            onClick={() => menuRef.current?.close()}
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
      </dialog>
    </>
  );
};
