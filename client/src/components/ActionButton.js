import React from 'react';
import classnames from 'classnames';
import Loader from './Loader';

const BUTTON_STYLES = {
  display: 'inline-flex',
  '-webkit-box-align': 'center',
  '-ms-flex-align': 'center',
  'align-items': 'center',
  'justify-content': 'space-around',
};

const LOADER_STYLES = {
  'margin-left': '0.8rem',
};

function Button({ label, loading, className, onClick, loaderStyles }) {
  return (
    <button
      className={classnames('flex', className, {
        'actionBtn--loading': loading,
      })}
      onClick={onClick}
      style={BUTTON_STYLES}
    >
      {label}
      {loading ? (
        <Loader className='actionBtn--loader' style={loaderStyles} />
      ) : null}
    </button>
  );
}

Button.defaultProps = {
  loaderStyles: LOADER_STYLES,
};

export default Button;
