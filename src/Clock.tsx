import React, { useState } from 'react';
import './styles/style.css';
import Line from './components/line';
import Input from './components/input';
import { ArrowHour, ArrowMinute, ArrowSecond } from './styles/arrowsStyle';

export interface ITime {
  hours: number;
  minutes: number;
  seconds: number;
}

const date = new Date();

const currentTime = {
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds(),
}

const Clock: React.FC = () => {
  const [degrees, setDegrees] = useState(getDegrees(currentTime));
  const onCityChange = (newTime: ITime) => {
    setDegrees(getDegrees(newTime));
  }
  const lines = [];
  for (let i = 0; i < 60; i++) {
    lines.push(<Line number={i * 6} key={i} />)
  }
  return (
    <div className="clock">
      {lines}
      <ArrowHour className='arrow hour' degree={degrees.hourDegree} ></ArrowHour>
      <ArrowMinute className='arrow minute' degree={degrees.minuteDegree} ></ArrowMinute>
      <ArrowSecond className='arrow second' degree={degrees.secondDegree} ></ArrowSecond>
      <span className='middle-point'></span>
      <Input onCityChange={onCityChange} />
    </div>
  );
}

function getDegrees({ hours, minutes, seconds }: ITime) {
  const secondDegree = 360 / 60 * seconds;
  const minuteDegree = 360 / 60 * minutes + 6 / 60 * seconds;
  const hourDegree = 360 / 12 * hours + 30 / 60 * minutes + 0.5 / 60 * seconds;
  return ({ secondDegree: secondDegree, minuteDegree: minuteDegree, hourDegree: hourDegree });
}

export default Clock;
