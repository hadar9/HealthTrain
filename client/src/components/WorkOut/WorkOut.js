import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import ShowWorkOut from './ShowWorkOut';
import axios from 'axios';
import { getWorkOuts } from '../../redux/reducers/workoutReducer';
import { useDispatch, useSelector } from 'react-redux';

export function WorkOut() {
  const dispatch = useDispatch();

  const getWorkOutss = async () => {
    try {
      const res = await axios.get('/api/workout');
      dispatch(getWorkOuts({ workout: res.data }));
      console.log(res.data)
    } catch (e) {
      console.log(e);
    }
  };
  const workout = useSelector((state) => state.workoutReducer.workout);

  useEffect(() => {
    getWorkOutss();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };



  const workouts = workout.length ? workout.map((work, index) => (
    <div key={work._id}>
      <div className='workout-title'>
        <h1 style={{ textAlign: 'center' }}>{work.name}</h1>
        <h3 style={{ textAlign: 'center' }}>Total Time: {work.totaltime}</h3>
      </div>
      <ShowWorkOut work={work} index={index} />
    </div>
  )) : null

  return (
    <div className='workout'>
      {workouts ? <Slider {...settings}>{workouts}</Slider> : null}
    </div>
  );
}
