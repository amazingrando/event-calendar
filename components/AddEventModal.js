import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/sharp-solid-svg-icons';
import PropTypes from 'prop-types';
import { supabase } from '../lib/supabaseClient';

export default function AddEventModal({ open }) {
  const [isOpen, setIsOpen] = useState(open);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [loginEmailSent, setLoginEmailSent] = useState(false);
  const [usernameError, setusernameError] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setIsOpen(open);

    const getCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select()
        .order('title', { ascending: true });

      setCategories(data);
    };
    getCategories();
  }, [open]);

  const handleUsernameChange = (e) => {
    if (e.target.value.includes('@')) {
      setusernameError(true);
    } else {
      setUsername(e.target.value);
      setusernameError(false);
    }
  };

  const handleLogin = async (user) => {
    const email = `${user}@fourkitchens.com`;

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      setLoginEmailSent(true);
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-leafyGreen bg-opacity-90 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                {!loginEmailSent ? (
                  <>
                    <div>
                      <div className="">
                        <Dialog.Title
                          as="h3"
                          className="text-4xl font-medium text-gray-900"
                        >
                          Add Event
                        </Dialog.Title>
                      </div>
                    </div>

                    <form className="space-y-6 mt-10" action="#" method="POST">
                      <div>
                        <label
                          htmlFor="email"
                          className="block uppercase text-subhead text-base font-bold"
                        >
                          Title
                        </label>
                        <input
                          className={classNames(
                            'block w-full appearance-none px-3 py-2 text-background placeholder:text-muted border border-solid border-gray-300 border-r-0',
                            {
                              'border-kitchensKelly': username !== '',
                            }
                          )}
                          type="text"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block uppercase text-subhead text-base font-bold"
                        >
                          Website
                        </label>
                        <input
                          className={classNames(
                            'block w-full appearance-none px-3 py-2 text-background placeholder:text-muted border border-solid border-gray-300 border-r-0',
                            {
                              'border-kitchensKelly': username !== '',
                            }
                          )}
                          type="url"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block uppercase text-subhead text-base font-bold"
                        >
                          Start Date
                        </label>
                        <input
                          className={classNames(
                            'block w-full appearance-none px-3 py-2 text-background placeholder:text-muted border border-solid border-gray-300 border-r-0',
                            {
                              'border-kitchensKelly': username !== '',
                            }
                          )}
                          type="date"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block uppercase text-subhead text-base font-bold"
                        >
                          End Date
                        </label>
                        <p className="text-gray-500 text-sm mb-1">
                          Leave empty for single day events.
                        </p>
                        <input
                          className={classNames(
                            'block w-full appearance-none px-3 py-2 text-background placeholder:text-muted border border-solid border-gray-300 border-r-0',
                            {
                              'border-kitchensKelly': username !== '',
                            }
                          )}
                          type="date"
                        />
                      </div>

                      <div>
                        <p className="block uppercase text-subhead text-base font-bold">
                          Categories
                        </p>
                        <div className="flex">
                          {categories &&
                            categories.map((category) => (
                              <div
                                className={classNames(
                                  'inline-block items-center rounded-full',
                                  'bg-kitchensKelly px-3 py-0.5 pb-1 text-sm uppercase text-white'
                                )}
                              >
                                <input
                                  type="checkbox"
                                  id={category.title}
                                  name={category.title}
                                />
                                <label htmlFor={category.title}>
                                  {category.title}
                                </label>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleLogin(username);
                          }}
                          className={classNames(
                            'block justify-center whitespace-nowrap w-full',
                            'bg-kitchensKelly',
                            'px-5 py-2',
                            'uppercase font-bold font-sansDisplay',
                            'transition ease-in-out',
                            'hover:bg-kitchensKelly-light'
                          )}
                          disabled={loading}
                          type="button"
                        >
                          <span>
                            {loading ? 'Loading' : 'Send magic link'}
                            {!loading && (
                              <FontAwesomeIcon
                                icon={faPaperPlane}
                                className="relative ml-2"
                              />
                            )}
                          </span>
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium text-gray-900"
                    >
                      Login email sent!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-base text-gray-500">
                        You will be emailed a magic link to confirm your email
                        address and log you into the site.
                      </p>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

AddEventModal.propTypes = {
  open: PropTypes.bool,
};
