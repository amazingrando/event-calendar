import classNames from 'classnames';
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusLarge } from '@fortawesome/sharp-solid-svg-icons';
import AddEventModal from './AddEventModal';
import { AuthContext } from '../lib/context/Auth';

const AddEvent = () => {
  const auth = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen((current) => !current);
  };

  const handleModalClick = () => {
    setModalOpen((current) => !current);
  };

  return (
    <div>
      {auth && (
        <>
          <button
            type="button"
            className={classNames(
              'inline-block py-2 px-4',
              'border border-kitchensKelly border-solid',
              'text-base font-medium text-white',
              'hover:bg-leafyGreen-light'
            )}
            onClick={handleModal}
          >
            <FontAwesomeIcon
              icon={faPlusLarge}
              className="relative mr-2 text-kitchensKelly"
            />
            Add Event
          </button>
          <AddEventModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            onClickFunc={handleModalClick}
          />
        </>
      )}
    </div>
  );
};

export default AddEvent;
