const people = [
  { name: 'The Engineering Design System Forum', title: 'Sept 9-11, 2023', email: 'https://www.meetup.com/hella-design-systems/events/288063357/', role: 'Member' },
  { name: 'The Engineering Design System Forum', title: 'Sept 9-11, 2023', email: 'https://www.meetup.com/hella-design-systems/events/288063357/', role: 'Member' },
  { name: 'The Engineering Design System Forum', title: 'Sept 9-11, 2023', email: 'https://www.meetup.com/hella-design-systems/events/288063357/', role: 'Member' },
  { name: 'The Engineering Design System Forum', title: 'Sept 9-11, 2023', email: 'https://www.meetup.com/hella-design-systems/events/288063357/', role: 'Member' },
  { name: 'The Engineering Design System Forum', title: 'Sept 9-11, 2023', email: 'https://www.meetup.com/hella-design-systems/events/288063357/', role: 'Member' },
  { name: 'The Engineering Design System Forum', title: 'Sept 9-11, 2023', email: 'https://www.meetup.com/hella-design-systems/events/288063357/', role: 'Member' },
  { name: 'The Engineering Design System Forum', title: 'Sept 9-11, 2023', email: 'https://www.meetup.com/hella-design-systems/events/288063357/', role: 'Member' },
  { name: 'The Engineering Design System Forum', title: 'Sept 9-11, 2023', email: 'https://www.meetup.com/hella-design-systems/events/288063357/', role: 'Member' },
  { name: 'The Engineering Design System Forum', title: 'Sept 9-11, 2023', email: 'https://www.meetup.com/hella-design-systems/events/288063357/', role: 'Member' },
  { name: 'The Engineering Design System Forum', title: 'Sept 9-11, 2023', email: 'https://www.meetup.com/hella-design-systems/events/288063357/', role: 'Member' },
  { name: 'The Engineering Design System Forum', title: 'Sept 9-11, 2023', email: 'https://www.meetup.com/hella-design-systems/events/288063357/', role: 'Member' },
  { name: 'The Engineering Design System Forum', title: 'Sept 9-11, 2023', email: 'https://www.meetup.com/hella-design-systems/events/288063357/', role: 'Member' },
  { name: 'The Engineering Design System Forum', title: 'Sept 9-11, 2023', email: 'https://www.meetup.com/hella-design-systems/events/288063357/', role: 'Member' },
  { name: 'The Engineering Design System Forum', title: 'Sept 9-11, 2023', email: 'https://www.meetup.com/hella-design-systems/events/288063357/', role: 'Member' },
  { name: 'The Engineering Design System Forum', title: 'Sept 9-11, 2023', email: 'https://www.meetup.com/hella-design-systems/events/288063357/', role: 'Member' },
  
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl my-11">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Events</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Event
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
              <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Event Title
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Dates
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      URL
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
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
                <tbody className="bg-white">
                  {people.map((person, personIdx) => (
                    <tr key={person.email} className={personIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                      <td
                        className={classNames(
                          personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                        )}
                      >
                        <span className="text-lg">
                          {person.name}
                        </span>
                        <span className="text-slate-400 text-xs block">
                          {person.email}
                        </span>
                      </td>
                      <td
                        className={classNames(
                          personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                        )}
                      >
                        {person.title}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell'
                        )}
                      >
                        {person.email}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800">
                          {person.role}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
                          {person.role}
                        </span>
                      </td>
                      <td
                        className={classNames(
                          personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                          'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8'
                        )}
                      >
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
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
  )
}
