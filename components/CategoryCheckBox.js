import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const CategoryCheckbox = ({
  id,
  handleCategoryCheck,
  eventCategories,
  setNewContentAvailable,
}) => {
  const [checkedBox, setCheckedBox] = useState(false);

  const handleChange = (e) => {
    setCheckedBox(e.target.checked);
    handleCategoryCheck(e);
    setNewContentAvailable(true);
  };

  useEffect(() => {
    if (eventCategories) {
      const needleFound = eventCategories.find(
        (category) => parseInt(category) === id
      );
      if (needleFound) {
        setCheckedBox(true);
      }
    }
  }, [eventCategories, id]);

  return (
    <input
      type="checkbox"
      id={id}
      name={id}
      className="hidden peer"
      checked={checkedBox}
      onChange={handleChange}
    />
  );
};

CategoryCheckbox.propTypes = {
  id: PropTypes.number,
  eventCategories: PropTypes.array,
  handleCategoryCheck: PropTypes.func,
  setNewContentAvailable: PropTypes.func,
};

export default CategoryCheckbox;
