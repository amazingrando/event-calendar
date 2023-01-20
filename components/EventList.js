import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faArrowUpRightFromSquare,
} from '@fortawesome/sharp-solid-svg-icons';

const dayjs = require('dayjs');

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function dateFormat(startDate, endDate) {
  const start = dayjs(startDate).format('MMM D');
  const end =
    dayjs(startDate).format('D') !== dayjs(endDate).format('D')
      ? dayjs(endDate).format(' - D')
      : '';
  const year = dayjs(endDate).format(', YYYY');

  return start + end + year;
}

export default function EventList({ events }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl my-11">
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
                      Event Title
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-bold uppercase text-leafyGreen backdrop-blur backdrop-filter sm:table-cell"
                    >
                      <FontAwesomeIcon icon={faCalendar} className="text-sm" />
                      Dates
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-bold uppercase text-leafyGreen backdrop-blur backdrop-filter lg:table-cell"
                    >
                      Website
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-bold uppercase text-leafyGreen backdrop-blur backdrop-filter"
                    >
                      Submitted by
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-whippedCream">
                  {events.map((event, eventIdx) => (
                    <tr
                      key={event.title + eventIdx}
                      className={
                        eventIdx % 2 === 0 ? undefined : 'bg-whippedCream-dark'
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
                        {event.url && (
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
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800">
                          person.role
                        </span>
                        <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
                          person.role
                        </span>
                      </td>
                      <td
                        className={classNames(
                          eventIdx !== events.length - 1
                            ? 'border-b border-gray-200'
                            : '',
                          'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8'
                        )}
                      >
                        <button
                          type="button"
                          className={classNames(
                            'inline-flex items-center justify-center gap-1',
                            'border border-kitchensKelly border-solid',
                            'uppercase font-bold text-leafyGreen',
                            'px-3 py-1 text-sm',
                            'hover:bg-kitchensKelly/10'
                          )}
                        >
                          Edit
                        </button>
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
}
