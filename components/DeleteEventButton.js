import classNames from 'classnames';
import { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteEventModal from './DeleteEventModal';

const DeleteEventButton = ({ id }) => {
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
          'inline-flex items-center justify-center gap-1',
          'border border-red-500 border-solid',
          'uppercase font-bold text-red-500',
          'px-3 py-1 text-sm',
          'hover:bg-red-500 hover:text-white'
        )}
        onClick={handleModal}
      >
        Delete
      </button>
      <DeleteEventModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onClickFunc={handleModalClick}
        id={id}
      />
    </div>
  );
};

DeleteEventButton.propTypes = {
  id: PropTypes.number,
};

export default DeleteEventButton;
