import { useState } from 'react';

const Togglable = (props) => {
  const [show, setShow] = useState(false);

  const hideWhenVisible = { display: show ? 'none' : '' };
  const showWhenVisible = { display: show ? '' : 'none' };

  const toggleVisibility = () => {
    setShow(!show);
  };

  return (
    <>
      <div>
        <button onClick={toggleVisibility} style={hideWhenVisible}>{props.label}</button>
      </div>
      <div style={showWhenVisible}>{props.children}</div>

      <button style={showWhenVisible} onClick={() => setShow(false)}>Cancel</button>
    </>
  );
};

export default Togglable;
