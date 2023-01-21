import { Fragment, useState, useEffect, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCirclePlus } from '@fortawesome/sharp-solid-svg-icons';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import { supabase } from '../lib/supabaseClient';
import { AuthContext } from '../lib/context/Auth';
import { NewContentContext } from '../lib/context/NewContentAdded';

export default function AddEventModal({ open }) {
  const auth = useContext(AuthContext);
  // eslint-disable-next-line react/destructuring-assignment
  const userID = auth ? auth.user.id : null;

  const { setNewContentAvailable } = useContext(NewContentContext);

  const [isOpen, setIsOpen] = useState(open);
  const [categories, setCategories] = useState([]);
  const [requiredFieldsFilledIn, setRequiredFieldsFilledIn] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [website, setWebsite] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleTitleChange = (e) => {
    setEventTitle(sanitizeHtml(e.target.value));
    areRequiredFieldsEntered();
  };

  const handleStartDateChange = (e) => {
    setStartDate(sanitizeHtml(e.target.value));
    areRequiredFieldsEntered();
  };

  const handleEndDateChange = (e) => {
    setEndDate(sanitizeHtml(e.target.value));
  };

  const handleWebsiteChange = (e) => {
    setWebsite(sanitizeHtml(e.target.value));
  };

  const areRequiredFieldsEntered = () => {
    if (eventTitle !== '' && startDate !== '') {
      setRequiredFieldsFilledIn(true);
    } else {
      setRequiredFieldsFilledIn(false);
    }
  };

  const createEvent = async () => {
    try {
      const updates = {
        created_by: userID,
        title: eventTitle,
        start_date: startDate,
        end_date: endDate || null,
        url: website,
      };

      const { error } = await supabase.from('events').upsert(updates);
      if (error) {
        throw error;
      }
      setIsOpen(false);
      setNewContentAvailable(true);
      setEventTitle('');
      setStartDate('');
      setWebsite('');
      setEndDate('');
    } catch (error) {
      alert(error.message);
    }
  };

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
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
                        <span className="uppercase text-xs text-red-500 ml-1 font-normal">
                          Required
                        </span>
                      </label>
                      <input
                        className={classNames(
                          'block w-full appearance-none px-3 py-2 text-background placeholder:text-muted border border-solid border-gray-300'
                        )}
                        type="text"
                        onChange={handleTitleChange}
                        value={eventTitle}
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
                          'block w-full appearance-none px-3 py-2 text-background placeholder:text-muted border border-solid border-gray-300'
                        )}
                        type="url"
                        onChange={handleWebsiteChange}
                        value={website}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block uppercase text-subhead text-base font-bold"
                      >
                        Start Date
                        <span className="uppercase text-xs text-red-500 ml-1 font-normal">
                          Required
                        </span>
                      </label>
                      <input
                        className={classNames(
                          'block w-full appearance-none px-3 py-2 text-background placeholder:text-muted border border-solid border-gray-300'
                        )}
                        type="date"
                        onChange={handleStartDateChange}
                        value={startDate}
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
                          'block w-full appearance-none px-3 py-2 text-background placeholder:text-muted border border-solid border-gray-300'
                        )}
                        type="date"
                        onChange={handleEndDateChange}
                        value={endDate}
                      />
                    </div>

                    <div>
                      <p className="block uppercase text-subhead text-base font-bold mb-3">
                        Categories
                      </p>
                      <div className="flex flex-col gap-2 items-start">
                        {categories &&
                          categories.map((category) => (
                            <div>
                              <input
                                type="checkbox"
                                id={category.title}
                                name={category.title}
                                className="hidden peer"
                              />
                              <label
                                htmlFor={category.title}
                                className={classNames(
                                  'rounded-full',
                                  'bg-whippedCream px-3 py-0.5 pb-1 text-sm uppercase text-leafyGreen',
                                  'hover:bg-whippedCream-dark',
                                  'border border-whippedCream-dark border-solid',
                                  'peer-checked:bg-kitchensKelly-light peer-checked:border-kitchensKelly-light',
                                  'group'
                                )}
                              >
                                {category.title}
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={createEvent}
                        className={classNames(
                          'block justify-center whitespace-nowrap w-full mt-9',
                          'bg-kitchensKelly',
                          'px-5 py-2',
                          'uppercase font-bold font-sansDisplay',
                          'transition ease-in-out',
                          'hover:bg-kitchensKelly-light',
                          {
                            'bg-slate-300 text-slate-500 hover:bg-slate-300 cursor-not-allowed':
                              !requiredFieldsFilledIn,
                          }
                        )}
                        type="button"
                        disabled={!requiredFieldsFilledIn}
                      >
                        <span>
                          <FontAwesomeIcon
                            icon={faCalendarCirclePlus}
                            className="relative mr-2"
                          />
                          Add Event
                        </span>
                      </button>
                    </div>
                  </form>
                </>
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
