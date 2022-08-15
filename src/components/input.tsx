import React, { useState } from 'react';
import '../styles/style.css'
import { ITime } from '../Clock';

interface IInput {
  onCityChange: (newTime: ITime) => void
}

const Input: React.FC<IInput> = ({ onCityChange }) => {
  const [city, setCity] = useState('');
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }
  const handleOnSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (city === '') return;
    const time: ITime = await getTime(city);
    onCityChange(time);
    setCity('');
  }
  return (
    <>
      <form onSubmit={(handleOnSubmit)}>
        <input className='city-input' placeholder='Enter city...' onChange={handleOnChange} value={city}></input>
        <button className='city-submit' onClick={handleOnSubmit}>Submit</button>
      </form>
    </>
  )
}

async function getTime(city: string): Promise<ITime> {
  const response = await fetch(`https://timezone.abstractapi.com/v1/current_time/?api_key=15d7798fd1054f0dace9daef5dabb380&location=${city}`);
  const cityResponse = await response.json();
  const time = cityResponse.datetime.slice(11);
  return ({
    hours: Number(time.slice(0, 2)),
    minutes: Number(time.slice(3, 5)),
    seconds: Number(time.slice(6, 8))
  })
}

export default Input;