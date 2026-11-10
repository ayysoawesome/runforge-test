import { MenuNavigation } from './MenuNavigation';
import { MobileMenu } from './MobileMenu';

export const Menu = () => {
  return (
    <>
      <aside className='hidden w-56 shrink-0 flex-col border-r border-border-inverse bg-ink px-4 py-6 text-white md:flex'>
        <p className='mb-5 text-xs font-bold tracking-[0.12em] text-white/70'>
          WORKSPACE
        </p>
        <MenuNavigation />
        <span className='mt-auto border-t border-border-inverse px-3 pt-5 text-sm text-white/70'>
          Settings
        </span>
      </aside>
      <MobileMenu />
    </>
  );
};
