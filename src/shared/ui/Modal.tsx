import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modalRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected)
        previousFocus.focus();
    };
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4'
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            onClose();
            return;
          }
          if (event.key !== 'Tab') return;

          const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          );
          if (!focusable?.length) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          const current = document.activeElement;
          if (
            event.shiftKey &&
            (current === first || current === modalRef.current)
          ) {
            event.preventDefault();
            last.focus();
          } else if (
            !event.shiftKey &&
            (current === last || current === modalRef.current)
          ) {
            event.preventDefault();
            first.focus();
          }
        }}
        className='max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-panel bg-white p-6 text-ink shadow-xl outline-none'
      >
        <div className='mb-5 flex items-start justify-between gap-4'>
          <h2 id={titleId} className='text-xl font-bold'>
            {title}
          </h2>
          <button
            type='button'
            onClick={onClose}
            aria-label='Закрыть окно'
            className='flex size-9 shrink-0 items-center justify-center rounded-control hover:bg-canvas focus-visible:outline-2 focus-visible:outline-ink cursor-pointer'
          >
            <svg
              aria-hidden='true'
              viewBox='0 0 24 24'
              fill='none'
              className='size-5'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            >
              <path d='M6 6l12 12M18 6L6 18' />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};
