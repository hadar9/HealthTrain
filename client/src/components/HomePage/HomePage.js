import React, { useEffect } from 'react';
import { getuserdata } from '../../redux/reducers/UserDataReducer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
export const HomePage = () => {
  const dispatch = useDispatch();
  const userstate = useSelector((state) => state.userReducer.user);
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
      console.log(res.data);
      dispatch(getuserdata({ userdata: res.data }));
    };

    getData();
  }, []);

  return (
    <div className='Homepage'>
      {userdata ? (
        <>
          <p>your weight:{userdata.weight}</p>
        </>
      ) : null}
    </div>
  );
};

export default HomePage;
