import React, { useEffect, useState } from 'react';
import './styles/style.css';
import Line from './components/line';
import Input from './components/input';
import { ArrowHour, ArrowMinute, ArrowSecond } from './styles/arrowsStyle';
import { getTime } from './components/input';

export interface ITime {
  hours: number;
  minutes: number;
  seconds: number;
}

const initDegree = { 
  secondDegree: 0, 
  minuteDegree: 0, 
  hourDegree: 0 
}

const Clock: React.FC = () => {
  const [degrees, setDegrees] = useState(initDegree);
  useEffect(() => {
    getCurrentCity().then(async (res) => {
      const time = await getTime(res);
      const newDegrees = getDegrees(time);
      setDegrees(newDegrees);
    })
  }, []);

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

async function getCurrentCity() {
  try {
    const request = await fetch("https://ipinfo.io/json?token=b078a87c1f8ed8");
    const json = await request.json();
    return json.city;
  } catch (err) {};
}

export default Clock;