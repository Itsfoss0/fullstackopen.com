import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  const hideWhenVisible = { display: show ? 'none' : '' };
  const showWhenVisible = { display: show ? '' : 'none' };

  const toggleVisibility = () => {
    setShow(!show);
  };

  useImperativeHandle(ref, () => {
    return {
      close () {
        setShow(false);
      }
    };
  });

  return (
    <>
      <div>
        <button onClick={toggleVisibility} style={hideWhenVisible}>
          {props.label}
        </button>
      </div>
      <div style={showWhenVisible}>{props.children}</div>

      <button style={showWhenVisible} onClick={() => setShow(false)}>
        Cancel
      </button>
    </>
  );
});

Togglable.propTypes = {
  props: PropTypes.object.isRequired,
  ref: PropTypes.object.isRequired
};

export default Togglable;
