// uicafe/src/app.jsx

import { useState } from 'react';

const Header = ({ title }) => {
  return <h1>{title}</h1>
}

const Button = ({ feedBack, text, value }) => {
  return <button onClick={() => feedBack(value)}>{text}</button>
}

const App = () => {
  const [stats, setStats] = useState({ good: 0, bad: 0, neutral: 0 })
  const [totalFB, setTotalFB] = useState(0)
  const [positive, setPositive] = useState(0)
  const [average, setAverage] = useState(0)

  const updateFeedback = (value) => {
    setStats({ ...stats, [value]: stats[value] + 1 })
    setTotalFB(totalFB + 1)
    const calculatedAverage = (stats.good - stats.bad) / totalFB;
    setAverage(isNaN(calculatedAverage) ? 0 : calculatedAverage);
    const positiveFB = (stats.good / totalFB) * 100
    setPositive(isNaN(positive) ? 0 : positiveFB);
  }

  return (<>
    <Header title="Unicafe Feedback Page" />
    <Button feedBack={updateFeedback} text="Good" value="good" />
    <Button feedBack={updateFeedback} text="Neutral" value="neutral" />
    <Button feedBack={updateFeedback} text="Bad" value="bad" />
    <h2>Statistics</h2>
    <div>Good {stats.good} </div>
    <div>Bad {stats.bad} </div>
    <div>Neutral {stats.neutral} </div>
    <div>All {totalFB} </div>
    <div>Average: {average}</div>
    <div>Positive: {positive}%</div>
  </>);
}

export default App;
