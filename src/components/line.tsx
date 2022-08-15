import React from 'react';
import '../styles/style.css';

interface ILine {
  number: number,
}

const Line: React.FC<ILine> = ({ number }) => {
  return (number % 5)
    ? <span className='line' style={{ transform: `rotate(${number}deg)` }}></span>
    : <span className='line line-big' style={{ transform: `rotate(${number}deg)` }}></span>
}

export default Line;