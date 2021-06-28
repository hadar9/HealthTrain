import React, { useState } from 'react';
import ExreciseCard from './ExreciseCard';
import Countdown from 'react-countdown';
import timer from '../../images/timer.png';
export default function StartWorkOut({ work }) {
  const [currentexc, setexc] = useState({
    index: 0,
    exc: work.exercises[0],
  });
  const { index, exc } = currentexc;

  setTimeout(() => {
    if (index < work.exercises.length) {
      let index1 = index + 1;
      setexc({ ...currentexc, index: index1, exc: work.exercises[index1] });
    } else {
      clearTimeout();
    }
  }, 60 * 1000 * work.exercises[index].time);

  return (
    <div>
      <div className='timer'>
        <img className='timerimage' src={timer} alt='img' />
        <Countdown
          className='timercount'
          date={Date.now() + 60 * 1000 * work.exercises[index].time}
        />
      </div>
      <div className='currentexc'>
        <ExreciseCard exc={exc} parentcomp={'start'} />
      </div>
    </div>
  );
}
