import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  const hideWhenVisible = { display: show ? "none" : "" };
  const showWhenVisible = { display: show ? "" : "none" };

  const toggleVisibility = () => {
    setShow(!show);
  };

  useImperativeHandle(ref, () => ({
    close() {
      setShow(false);
    },
    open() {
      setShow(true);
    },
  }));

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
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Togglable;
