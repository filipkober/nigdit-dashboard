import React from 'react';
import { GenericComponentProps } from '../../../models/GenericComponentProps';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttons?: JSX.Element[] & { props: { key: React.Key}}[]
} & GenericComponentProps;

export default function Modal({
  className,
  isOpen,
  onClose,
  children,
  title,
  buttons,
}: ModalProps) {
  const overlayClasses = 'fixed inset-0 bg-black opacity-50 z-50';
  const modalClasses =
    'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg p-6 z-50 bg-backgroundL dark:bg-backgroundD border-2 border-white dark:border-black max-h-[90vh] overflow-scroll';

  return (
    <>
      {isOpen && (
        <>
          <div className={overlayClasses} onClick={onClose}></div>
          <div className={modalClasses}>
            <div className="text-lg font-bold mb-4">{title}</div>
            <div className="mb-4">{children}</div>
            <div className="flex gap-2">
              {buttons}
              <button
                className="bg-delete hover:bg-deleteH text-white font-bold py-2 px-4 rounded border-[1px] border-black"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
