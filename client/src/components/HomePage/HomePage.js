import React, { useEffect, useState } from 'react';
import { getuserdata } from '../../redux/reducers/UserDataReducer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AlarmIcon from '@material-ui/icons/Alarm';
import StartWorkOut from '../WorkOut/StartWorkOut';

export const HomePage = () => {
  const [start, setstart] = useState(false);

  const dispatch = useDispatch();
  const userstate = useSelector((state) => state.userReducer.user);
  const caloriesSum = useSelector((state) => state.userReducer.caloriesSum);
  const userdata = useSelector(
    (state) => state.UserDataReducer.userdata.userdata
  );

  useEffect(() => {
    const getData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      let user = userstate.user;
      const body = JSON.stringify({
        user,
      });
      const res = await axios.post('/api/userdata/getdata', body, config);
      dispatch(getuserdata({ userdata: res.data }));
    };

    getData();
  }, []);

  return (
    <div className='Homepage'>
      {userdata ? (
        <>
          {start === false ? (
            <div>
              <div className='homepagedata'>
                <h2>Weight: {userdata.weight}</h2>
                <h2>Today caluries to eat: {caloriesSum} 🥦</h2>
              </div>
              <div className='homepagehistory'>
                <div className='workout-title'>
                  <h2 style={{ textAlign: 'center' }}>
                    This is the last workout you have done 👇🏻
                  </h2>
                  <h1 style={{ textAlign: 'center' }}>
                    {userdata.history.name}
                  </h1>
                  <h3 style={{ textAlign: 'center' }}>
                    Total Time: {userdata.history.totaltime} mintues
                  </h3>
                  <Button
                    variant='contained'
                    style={{ marginLeft: '30%', marginBottom: '10px' }}
                    onClick={(e) => setstart(true)}
                  >
                    Start WorkOut
                    <AlarmIcon style={{ marginLeft: '4px' }} />
                  </Button>
                  <h2 style={{ textAlign: 'center', color: '#00FF7F' }}>
                    you have burn {userdata.history.totalcalories} calories good
                    job! 💪🏻
                  </h2>
                </div>
              </div>
            </div>
          ) : (
            <StartWorkOut work={userdata.history} />
          )}
        </>
      ) : null}
    </div>
  );
};

export default HomePage;
