import classNames from 'classnames';
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Modal from './Modal';
import Pattern from './Pattern';
import { AuthContext } from '../lib/context/Auth';
import Logo from '../assets/logo.svg';

const navigation = [
  { name: 'Events', href: '#' },
  { name: 'How to Use', href: '#' },
  { name: 'About', href: '#' },
];

export default function Header() {
  const auth = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen((current) => !current);
  };

  const handleModalClick = () => {
    setModalOpen((current) => !current);
  };

  useEffect(() => {
    console.log('auth effect', auth);
  }, [auth]);

  return (
    <header className="bg-leafyGreen-dark relative">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Four Kitchens</span>
              <Logo />
            </a>
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-white hover:text-indigo-50"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <button
              type="button"
              onClick={handleModal}
              className={classNames(
                'inline-block py-2 px-4',
                'border border-kitchensKelly border-solid',
                'text-base font-medium text-white',
                'hover:bg-leafyGreen-light'
              )}
            >
              Sign in
            </button>
            <Modal open={modalOpen} onClickFunc={handleModalClick} />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
      <div className="w-full overflow-hidden">
        <Pattern />
      </div>
    </header>
  );
}
