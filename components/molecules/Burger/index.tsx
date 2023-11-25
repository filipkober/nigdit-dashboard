import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';

type BurgerProps = {
  burgerOpen: boolean;
  setBurgerOpen: (burgerOpen: boolean) => void;
  dictionary: {
    [key: string]: string;
  };
};

export default function Burger({
  burgerOpen,
  setBurgerOpen,
  dictionary,
}: BurgerProps) {
  return (
    <div>
      <Menu right>
        {Object.entries(dictionary).map(([key, value]) => (
          <div key={key}>
            <Link className="menu-item" href={`${value}`}>
              {key}
            </Link>
            <p onClick={() => setBurgerOpen(false)}>Close</p>
          </div>
        ))}
      </Menu>
    </div>
  );
}
