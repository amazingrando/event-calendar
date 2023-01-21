import classNames from 'classnames';
import { useState } from 'react';
import AddEventModal from './AddEventModal';

const AddEvent = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen((current) => !current);
  };

  const handleModalClick = () => {
    setModalOpen((current) => !current);
  };

  return (
    <div>
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
        Add Event
      </button>
      <AddEventModal open={modalOpen} onClickFunc={handleModalClick} />
    </div>
  );
};

export default AddEvent;
