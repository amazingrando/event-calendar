import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const NewContentContext = createContext(false);

const NewContentAvailable = ({ children }) => {
  const [newContentAvailable, setNewContentAvailable] = useState(false);

  const newContentValue = useMemo(
    () => ({ newContentAvailable, setNewContentAvailable }),
    [newContentAvailable]
  );

  return (
    <NewContentContext.Provider value={newContentValue}>
      {children}
    </NewContentContext.Provider>
  );
};

NewContentAvailable.propTypes = {
  children: PropTypes.any,
};

export default NewContentAvailable;
