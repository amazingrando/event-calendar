import classNames from 'classnames';
import { useContext } from 'react';
import { AuthContext } from '../lib/context/Auth';

const AddEvent = () => {
  const auth = useContext(AuthContext);

  return (
    <div>
      {auth && (
        <button
          type="button"
          className={classNames(
            'inline-block py-2 px-4',
            'border border-kitchensKelly border-solid',
            'text-base font-medium text-white',
            'hover:bg-leafyGreen-light'
          )}
        >
          Add Event
        </button>
      )}
    </div>
  );
};

export default AddEvent;
