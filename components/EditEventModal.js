import { Fragment, useState, useEffect, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarLinesPen } from '@fortawesome/sharp-solid-svg-icons';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import { supabase } from '../lib/supabaseClient';
import { AuthContext } from '../lib/context/Auth';
import { NewContentContext } from '../lib/context/NewContentAdded';

export default function EditEventModal({ id, modalOpen, setModalOpen }) {
  const auth = useContext(AuthContext);
  // eslint-disable-next-line react/destructuring-assignment
  const userID = auth ? auth.user.id : null;

  const { setNewContentAvailable } = useContext(NewContentContext);

  const [categories, setCategories] = useState([]);
  const [requiredFieldsFilledIn, setRequiredFieldsFilledIn] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [website, setWebsite] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventCategories, setEventCategories] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);

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

  const updateEvent = async () => {
    try {
      const updates = {
        created_by: userID,
        title: eventTitle,
        start_date: startDate,
        end_date: endDate || null,
        url: website,
        categories: categoriesSelected,
      };

      const { error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id);
      if (error) {
        throw error;
      }
      setModalOpen(false);
      setNewContentAvailable(true);
      setEventTitle('');
      setStartDate('');
      setWebsite('');
      setEndDate('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCategoryCheck = (e) => {
    const { id: categoryID, checked } = e.target;

    if (checked) {
      const needleFound = categoriesSelected.find(
        (category) => category === categoryID
      );
      if (!needleFound) {
        setCategoriesSelected((previous) => [...previous, categoryID]);
      }
    } else {
      setCategoriesSelected((previous) => [
        ...previous.filter((item) => item !== categoryID),
      ]);
    }
  };

  useEffect(() => {
    setModalOpen(modalOpen);

    const checkCategories = () => {
      // eventCategories.find(
      //   (item) => parseInt(item) === category.id
      // )
      console.log('handleCategoryLoad fired');
    };

    const getEventData = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select()
          .eq('id', id);
        if (error) {
          throw error;
        }
        setEventTitle(data[0].title);
        setStartDate(data[0].start_date);
        setWebsite(data[0].url);
        setEndDate(data[0].end_date);
        setEventCategories(data[0].categories);

        areRequiredFieldsEntered();
      } catch (error) {
        alert(error.message);
      }
    };

    getEventData();

    const getCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select()
        .order('title', { ascending: true });

      setCategories(data);
    };
    getCategories();
  }, [id, modalOpen, setModalOpen]);

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setModalOpen(false)}
      >
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
              <Dialog.Panel className="relative transform overflow-hidden bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <>
                  <div>
                    <div className="">
                      <Dialog.Title
                        as="h3"
                        className="text-4xl font-medium text-gray-900"
                      >
                        Edit Event
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
                            <div key={category.title}>
                              <input
                                type="checkbox"
                                id={category.id}
                                name={category.id}
                                className="hidden peer"
                                onChange={handleCategoryCheck}
                              />
                              <label
                                htmlFor={category.id}
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
                        onClick={updateEvent}
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
                            icon={faCalendarLinesPen}
                            className="relative mr-2"
                          />
                          Update Event
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

EditEventModal.propTypes = {
  id: PropTypes.number,
  modalOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
};
