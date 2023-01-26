import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faArrowUpRightFromSquare,
  faCompass,
  faTag,
  faPartyHorn,
} from '@fortawesome/sharp-solid-svg-icons';
import { useEffect, useState, useContext } from 'react';
import classNames from 'classnames';
import { supabase } from '../lib/supabaseClient';
import { NewContentContext } from '../lib/context/NewContentAdded';
import { dateFormat } from '../lib/helpers/dateFormat';
import EditEventButton from './EditEventButton';
import DeleteEventButton from './DeleteEventButton';
import CategoryBadge from './CategoryBadge';
import { AuthContext } from '../lib/context/Auth';
import AddEventButton from './AddEventButton';

const EventList = () => {
  const auth = useContext(AuthContext);
  const { newContentAvailable, setNewContentAvailable } =
    useContext(NewContentContext);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState('');
  const [eventsRendered, setEventsRendered] = useState('');
  const [textSearchValue, setTextSearchValue] = useState('');
  const [categorySearchValue, setCategorySearchValue] = useState();

  const resetCategorySearchValue = () => {
    setCategorySearchValue('');
  };

  const resetTextSearchFilterEvents = () => {
    setTextSearchValue('');
  };

  const handleTextSearchFilterEvents = (e) => {
    resetCategorySearchValue();
    setTextSearchValue(e.target.value);

    if (e.target.value !== '') {
      setTextSearchValue(e.target.value);

      const filteredEventList = events.filter((event) =>
        event.title.includes(textSearchValue)
      );
      setEventsRendered(filteredEventList);
    } else {
      setEventsRendered(events);
    }
  };

  const handleCategoryFilter = (e) => {
    resetTextSearchFilterEvents();
    setEventsRendered(events);
    setCategorySearchValue(e.target.value);

    if (e.target.value !== '') {
      const filteredEventList = events.filter((event) => {
        if (!event.categories) return null;
        return event.categories.find((category) => category === e.target.value);
      });
      setEventsRendered(filteredEventList);
    } else {
      setEventsRendered(events);
    }
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select()
          .order('start_date', { ascending: true });
        if (error) {
          throw error;
        }
        setEvents(data);
        setEventsRendered(data);
      } catch (error) {
        alert(error.message);
      }
    };

    getEvents();

    if (newContentAvailable) {
      getEvents();
      setNewContentAvailable(false);
    }

    const getCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select()
        .order('title', { ascending: true });

      setCategories(data);
    };
    getCategories();
  }, [newContentAvailable, setNewContentAvailable]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl my-11 w-full">
      <div className="flex flex-row gap-8 items-end">
        <div className="block max-w-[500px]">
          <label
            htmlFor="search"
            className="block uppercase text-subhead text-sm font-bold text-white mb-2"
          >
            Search for events
          </label>
          <input
            className={classNames(
              'block w-full appearance-none px-3 py-2 bg-leafyGreen-dark',
              'text-white',
              'placeholder:text-muted border border-solid border-kitchensKelly'
            )}
            type="text"
            placeholder="Event name..."
            onChange={handleTextSearchFilterEvents}
            value={textSearchValue}
          />
        </div>
        <div>
          <label
            htmlFor="categorySelect"
            className="block uppercase text-subhead text-sm font-bold text-white mb-2"
          >
            Choose a category:
          </label>
          {categories && (
            <select
              name="categorySelect"
              id="categorySelect"
              onChange={handleCategoryFilter}
              value={categorySearchValue}
              className="bg-leafyGreen-dark text-white border border-solid border-kitchensKelly"
            >
              <option value="">Choose...</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="ml-auto">
          <AddEventButton />
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
              <table
                className="min-w-full border-separate bg-whippedCream"
                style={{ borderSpacing: 0 }}
              >
                <thead className="bg-whippedCream">
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-bold uppercase text-leafyGreen backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      <FontAwesomeIcon
                        icon={faPartyHorn}
                        className="text-sm mr-1"
                      />
                      Event Title
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-bold uppercase text-leafyGreen backdrop-blur backdrop-filter sm:table-cell"
                    >
                      <FontAwesomeIcon
                        icon={faCalendar}
                        className="text-sm mr-1"
                      />
                      Dates
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-bold uppercase text-leafyGreen backdrop-blur backdrop-filter lg:table-cell"
                    >
                      <FontAwesomeIcon
                        icon={faCompass}
                        className="text-sm mr-1"
                      />
                      Website
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-bold uppercase text-leafyGreen backdrop-blur backdrop-filter"
                    >
                      <FontAwesomeIcon icon={faTag} className="text-sm mr-1" />
                      Categories
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8 text-right"
                    >
                      &nbsp;
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-whippedCream">
                  {eventsRendered &&
                    eventsRendered.map((event, eventIdx) => (
                      <tr
                        key={event.title + eventIdx}
                        className={
                          eventIdx % 2 === 0
                            ? undefined
                            : 'bg-whippedCream-dark'
                        }
                      >
                        <td
                          className={classNames(
                            eventIdx !== events.length - 1
                              ? 'border-b border-gray-200'
                              : '',
                            'whitespace-nowrap py-4 pl-4 pr-3 font-semibold text-leafyGreen sm:pl-6 lg:pl-8'
                          )}
                        >
                          <span className="text-xl">{event.title}</span>
                        </td>
                        <td
                          className={classNames(
                            eventIdx !== events.length - 1
                              ? 'border-b border-gray-200'
                              : '',
                            'whitespace-nowrap px-3 py-4 text-lg text-leafyGreen'
                          )}
                        >
                          {dateFormat(event.start_date, event.end_date)}
                        </td>
                        <td
                          className={classNames(
                            eventIdx !== events.length - 1
                              ? 'border-b border-gray-200'
                              : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-ellipsis overflow-hidden'
                          )}
                        >
                          {event.url ? (
                            <Link
                              href={event.url}
                              className="text-kitchensKelly-dark underline"
                            >
                              {event.url}
                              <FontAwesomeIcon
                                icon={faArrowUpRightFromSquare}
                                className="ml-1"
                              />
                            </Link>
                          ) : (
                            <span className="text-gray-500">
                              No website provided.
                            </span>
                          )}
                        </td>
                        <td
                          className={classNames(
                            eventIdx !== events.length - 1
                              ? 'border-b border-gray-200'
                              : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-leafyGreen'
                          )}
                        >
                          {event.categories ? (
                            <div className="flex flex-row gap-1">
                              {event.categories.map((category) => (
                                <CategoryBadge
                                  id={category}
                                  categories={categories}
                                  key={category}
                                />
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-500">
                              No categories provided.
                            </span>
                          )}
                        </td>
                        <td
                          className={classNames(
                            eventIdx !== events.length - 1
                              ? 'border-b border-gray-200'
                              : '',
                            'relativewhitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8'
                          )}
                        >
                          <div className="flex flex-row gap-1 place-content-end">
                            {auth && (
                              <>
                                <EditEventButton
                                  id={event.id}
                                  setNewContentAvailable={
                                    setNewContentAvailable
                                  }
                                />
                                <DeleteEventButton id={event.id} />
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
