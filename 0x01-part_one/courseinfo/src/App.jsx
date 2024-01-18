/* eslint-disable no-unused-vars */

import { useState } from 'react';

const Button = ({ onSmash, text }) => {
  return <button onClick={onSmash}>{text}</button>
};

const Counter = ({ count }) => {
  const [number, setNumber] = useState(count)

  const incrementNumber = () => {
    setNumber(number + 1)
  }

  const decrementNumber = () => {
    if (number > 0) {
      setNumber(number - 1)
    }
    else {
      setNumber(0)
    }
  }

  const reset = () => {
    if (number != 0) {
      setNumber(0);
    }
  }
  return (<>
    <div>{number}</div>
    <Button onSmash={incrementNumber} text="+" />
    <Button onSmash={decrementNumber} text="-" />
    <Button onSmash={reset} text="Reset" />
  </>
  );
}

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <Part part={props.part1} exercise={props.exercise1} />
      <Part part={props.part2} exercise={props.exercise2} />
      <Part part={props.part3} exercise={props.exercise3} />
    </>
  );
};
const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const Person = ({ name, age }) => {
  return (<>
    <div> Hi there {name}, good to see you grown to {age} </div>
  </>);
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header course={course.name} />
      <Content
        part1={course.parts[0].name}
        exercise1={course.parts[0].exercises}
        part2={course.parts[1].name}
        exercise2={course.parts[1].exercises}
        part3={course.parts[2].name}
        exercise3={course.parts[2].exercises}
      />
      <Total
        total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}
      />
      <Person name="John" age={33} />
      <Counter count={21} />
    </>
  );
};

const History = ( { clicks }) => {
  if (clicks.length === 0 ){
    return <div>Click the Buttons to use the application</div>
  } else {
    return <div>{clicks.join('-')}</div>
  }
}
export const Mirror = ({ l, r }) => {

  const [clicks, setClicks] = useState({ left: l, right: r })
  const [allClicks, setallClicks] = useState([])
  const [total, setTotal] = useState(clicks.left + clicks.right)

  const incrementLeftNum = () => {
    setClicks({ ...clicks, left: clicks.left += 1 })
    setallClicks(allClicks.concat('L'))
    setTotal(clicks.left + clicks.right)
  }
  
  const incrementRightNum = () => {
    setClicks({ ...clicks, right: clicks.right += 1 })
    setallClicks(allClicks.concat('R'))
    setTotal(clicks.left + clicks.right)

  }
  return (<>
    <div> Left at {clicks.left}, Right Num at {clicks.right} </div>
    <History clicks={allClicks}/>
    <div>All Buttons clicked {total} times</div>
    <Button onSmash={incrementLeftNum} text="Left" />
    <Button onSmash={incrementRightNum} text="Right" />
  </>);
};

export default App;
