import PropTypes from 'prop-types';

const IconButton = ({ children, ...props }) => {
  return (
    <button
      className="p-4 font-semibold text-white bg-slate-700 rounded-lg align-middle hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
      {...props}
    >
      {children}
    </button>
  );
};

IconButton.propTypes = {
    children: PropTypes.node.isRequired,  // Validate that children is required and can be any valid node
  };

export default IconButton;
