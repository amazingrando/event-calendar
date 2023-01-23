import PropTypes from 'prop-types';
import classNames from 'classnames';

const CategoryBadge = ({ id, categories }) => {
  const found = categories.find((v) => v.id === Number(id));

  return (
    <div
      className={classNames(
        'inline-flex items-center rounded-full',
        'bg-kitchensKelly px-3 py-0.5 pb-1 text-sm uppercase text-white'
      )}
    >
      {found && found.title}
    </div>
  );
};

CategoryBadge.propTypes = {
  id: PropTypes.string,
  categories: PropTypes.array,
};

export default CategoryBadge;
