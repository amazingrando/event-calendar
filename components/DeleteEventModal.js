import { Fragment, useState, useEffect, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/sharp-solid-svg-icons';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { supabase } from '../lib/supabaseClient';
import { NewContentContext } from '../lib/context/NewContentAdded';

const dayjs = require('dayjs');

function dateFormat(startDate, endDate) {
  const start = dayjs(startDate).format('MMM D');
  let end;
  if (endDate) {
    end =
      dayjs(startDate).format('D') !== dayjs(endDate).format('D')
        ? dayjs(endDate).format(' - D')
        : '';
  } else {
    end = '';
  }
  const year = dayjs(startDate).format(', YYYY');

  return start + end + year;
}

export default function DeleteEventModal({ id, modalOpen, setModalOpen }) {
  const { setNewContentAvailable } = useContext(NewContentContext);

  const [eventData, setEventData] = useState('');

  const deleteEvent = async () => {
    try {
      const { error } = await supabase.from('events').delete().eq('id', id);

      if (error) {
        throw error;
      }
      setNewContentAvailable(true);
      setModalOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    setModalOpen(modalOpen);

    const getEventData = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select()
          .eq('id', id);
        if (error) {
          throw error;
        }
        setEventData(data[0]);
      } catch (error) {
        alert(error.message);
      }
    };

    getEventData();
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
                <div>
                  <div className="">
                    <Dialog.Title
                      as="h3"
                      className="text-4xl font-medium text-gray-900"
                    >
                      <span className="block  rounded-lg p-6 pl-10 danger-gradient">
                        <FontAwesomeIcon
                          icon={faTriangleExclamation}
                          className="relative mr-2 text-red-500"
                        />
                        Deleting this event cannot be undone.
                      </span>
                    </Dialog.Title>
                    <div className="mt-2 p-6">
                      <h2 className="text-3xl mb-1">{eventData.title}</h2>
                      <p className="text-xl text-slate-500">
                        {dateFormat(eventData.start_date, eventData.end_date)}
                      </p>
                      <p className="text-xl text-slate-500">{eventData.url}</p>
                      <button
                        onClick={deleteEvent}
                        className={classNames(
                          'block justify-center whitespace-nowrap w-full mt-9',
                          'bg-red-500 text-white text-xl',
                          'px-5 py-2',
                          'uppercase font-bold font-sansDisplay',
                          'transition ease-in-out',
                          'hover:bg-red-600'
                        )}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

DeleteEventModal.propTypes = {
  modalOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
  id: PropTypes.number,
};
