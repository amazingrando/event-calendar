import classNames from 'classnames';
import { useState } from 'react';
import PropTypes from 'prop-types';
import EditEventModal from './EditEventModal';

const EditEventButton = ({ id }) => {
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
          'border border-kitchensKelly border-solid',
          'uppercase font-bold text-leafyGreen',
          'px-3 py-1 text-sm',
          'hover:bg-kitchensKelly/10'
        )}
        onClick={handleModal}
      >
        Edit
      </button>
      <EditEventModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onClickFunc={handleModalClick}
        id={id}
      />
    </div>
  );
};

EditEventButton.propTypes = {
  id: PropTypes.number,
};

export default EditEventButton;
