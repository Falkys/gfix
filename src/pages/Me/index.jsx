import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { isMobile } from 'react-device-detect';
import { fetchAuthMe } from '../../redux/slices/auth';
import style from './me.module.scss';
import Container from "@mui/material/Container";
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ReplayIcon from '@mui/icons-material/Replay';


import { Card } from '../../components/Card'
export const Me = () => { 
  React.useEffect(() => {
    document.title = "Profile";
  }, []);
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.auth.data);
  const handleReload = () => {
    dispatch(fetchAuthMe());
  }
  return ( 
    <div style={{ marginTop: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>
      {userdata ? <Avatar sx={{ width: 100, height: 100, alignItem: "center" }} /> : <Skeleton variant="circular" width={100} height={100} /> }
        {userdata ? 
          <Typography variant="h6" gutterBottom>
            {userdata.username}
        </Typography>
        :
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> }
        
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: "column", padding: 10 }}>
      {userdata ? <ReplayIcon onClick={handleReload} /> : <Skeleton variant="circular" width={30} height={30} />}
      </div>
      {userdata ? userdata.prizes.map((item) => (
        <Card data={item} key={item.id}></Card>
      )) : <Skeleton variant="rect" width="100%" height={250} />}
    </div>
  );
};
