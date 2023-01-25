import classNames from 'classnames';
import { useState, useContext, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/sharp-solid-svg-icons';
import PropTypes from 'prop-types';
import LoginModal from './LoginModal';
import Pattern from './Pattern';
import { AuthContext } from '../lib/context/Auth';
import Logo from '../assets/logo.svg';
import { supabase } from '../lib/supabaseClient';

const LogoutPopover = ({ children }) => {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                text-base font-medium text-white/70 px-6 py-3`}
            >
              <span>{children}</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-[200px] max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="relative bg-leafyGreen border border-solid border-kitchensKelly/50 text-white px-5 py-3"
                  >
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="relative mr-2 text-kitchensKelly"
                    />
                    Logout
                  </button>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

LogoutPopover.propTypes = {
  children: PropTypes.any,
};

export default function Header() {
  const auth = useContext(AuthContext);
  // eslint-disable-next-line react/destructuring-assignment
  const userEmail = auth ? auth.user.email : null;

  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen((current) => !current);
  };

  const handleModalClick = () => {
    setModalOpen((current) => !current);
  };

  return (
    <header className="bg-leafyGreen-dark relative">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          <div className="flex items-center">
            <a href="https://fourkitchens.com">
              <span className="sr-only">Four Kitchens</span>
              {/* <Logo /> */}
            </a>
            <div className="ml-10 hidden space-x-8 lg:block">
              <h1 className="text-white text-4xl font-fragment">
                Events Calendar
              </h1>
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {!userEmail ? (
              <>
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
                <LoginModal open={modalOpen} onClickFunc={handleModalClick} />
              </>
            ) : (
              <div>
                <LogoutPopover>{userEmail}</LogoutPopover>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
          <h1 className="text-white text-4xl font-bold">
            Four Kitchens Events Calendar
          </h1>
        </div>
      </nav>
    </header>
  );
}
