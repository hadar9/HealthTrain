import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import ShowWorkOut from './ShowWorkOut';
import StartWorkOut from './StartWorkOut';
import axios from 'axios';
import { getWorkOuts } from '../../redux/reducers/workoutReducer';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import AlarmIcon from '@material-ui/icons/Alarm';

export function WorkOut() {
  const [chooseworkout, setworkout] = useState(null);

  useEffect(() => {
    const getWorkOutss = async () => {
      try {
        const res = await axios.get('/api/workout');
        dispatch(getWorkOuts({ workout: res.data }));
      } catch (e) {
        console.log(e);
      }
    };
    getWorkOutss();
  }, [chooseworkout]);
  const dispatch = useDispatch();

  let workout = useSelector((state) => state.workoutReducer.workout);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const workouts =
    workout !== null
      ? workout.workout.map((work, index) => (
          <div key={work._id}>
            <div className='workout-title'>
              <h1 style={{ textAlign: 'center' }}>{work.name}</h1>
              <h3 style={{ textAlign: 'center' }}>
                Total Time: {work.totaltime} mintues
              </h3>
              <Button
                variant='contained'
                style={{ marginLeft: '30%', marginBottom: '10px' }}
                onClick={(e) => setworkout(work)}
              >
                Start WorkOut
                <AlarmIcon style={{ marginLeft: '4px' }} />
              </Button>
            </div>
            <ShowWorkOut work={work} index={index} />
          </div>
        ))
      : null;

  let ret = null;
  if (workouts !== null && chooseworkout === null) {
    ret = <Slider {...settings}>{workouts}</Slider>;
  } else if (workouts !== null && chooseworkout !== null) {
    ret = <StartWorkOut work={chooseworkout} />;
  }
  return <div className='workout'>{ret}</div>;
}
