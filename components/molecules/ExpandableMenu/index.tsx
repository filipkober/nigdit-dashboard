import { Menu } from '@headlessui/react';
import { GenericComponentProps } from '../../../models/GenericComponentProps';
import { useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { twMerge } from 'tailwind-merge';
import { FiMoreVertical } from 'react-icons/fi';

export type Button = {
  text: string;
  onClick: () => void;
  icon?: JSX.Element;
  disasbled?: boolean;
  id: string;
};

type ExpandableMenuProps = {
  buttons: Button[];
} & GenericComponentProps;

export default function ExpandableMenu({
  buttons,
  className,
}: ExpandableMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    menuRef.current && autoAnimate(menuRef.current);
  }, [menuRef]);

  return (
    <Menu ref={menuRef} as={'div'} className={twMerge('relative', className)}>
      <div className='flex h-full'>
        <Menu.Button className="hover:bg-backgroundL dark:hover:bg-experimentB rounded-lg">
          <FiMoreVertical />
        </Menu.Button>
      </div>
      <Menu.Items className="flex flex-col absolute z-20 bg-backgroundL dark:bg-experimentB rounded-lg mt-1">
        {buttons.map((button, index) => {
          const buttonClasses = twMerge(
            'flex flex-row items-center justify-start p-2 hover:bg-foregroundL dark:hover:bg-gray-500 transition duration-100 ease-in-out',
            button.disasbled ? 'cursor-not-allowed' : 'hover:cursor-pointer',
            buttons.length === 1
              ? 'rounded-lg'
              : index === 0
              ? 'rounded-t-lg'
              : index === buttons.length - 1
              ? 'rounded-b-lg'
              : ''
          );

          return (
            <Menu.Item key={button.id} disabled={button.disasbled}>
              {({ active }) => (
                <button className={buttonClasses} onClick={button.onClick}>
                  {button.icon && <div className="mr-2">{button.icon}</div>}
                  {button.text}
                </button>
              )}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}
