// uicafe/src/app.jsx

import { useState } from 'react';

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const StatisticLine = ({ statName, statVal }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{statName}</td>
          <td>{statVal}</td>
        </tr>
      </tbody>
    </table>
  );
};

const Statistic = ({ props }) => {
  return (
    <>
      <StatisticLine statName='Good' statVal={props.stats.good} />
      <StatisticLine statName='Bad' statVal={props.stats.bad} />
      <StatisticLine statName='Neutral' statVal={props.stats.neutral} />
      <StatisticLine statName='All' statVal={props.totalFB} />
      <StatisticLine statName='Average' statVal={props.average} />
      <StatisticLine statName='Positive' statVal={props.positive + '%'} />
    </>
  );
};

const Button = ({ feedBack, text, value }) => {
  return <button onClick={() => feedBack(value)}>{text}</button>;
};

const App = () => {
  const [stats, setStats] = useState({ good: 0, bad: 0, neutral: 0 });
  const [totalFB, setTotalFB] = useState(0);
  const [positive, setPositive] = useState(0);
  const [average, setAverage] = useState(0);

  const updateFeedback = (value) => {
    setStats({ ...stats, [value]: stats[value] + 1 });
    setTotalFB(totalFB + 1);
    const calculatedAverage = (stats.good - stats.bad) / totalFB;
    setAverage(isNaN(calculatedAverage) ? 0 : calculatedAverage);
    const positiveFB = (stats.good / totalFB) * 100;
    setPositive(isNaN(positive) ? 0 : positiveFB);
  };

  const stateInfo = {
    stats,
    totalFB,
    positive,
    average
  };
  return (
    <>
      <Header title='Unicafe Feedback Page' />
      <Button feedBack={updateFeedback} text='Good' value='good' />
      <Button feedBack={updateFeedback} text='Neutral' value='neutral' />
      <Button feedBack={updateFeedback} text='Bad' value='bad' />
      <h2>Statistics</h2>
      {totalFB > 0
        ? (
          <Statistic props={stateInfo} />
          )
        : (
          <div>No feedback given</div>
          )}
    </>
  );
};

export default App;
