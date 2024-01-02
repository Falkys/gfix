import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { isMobile } from 'react-device-detect';
import { fetchAuthMe } from '../../redux/slices/auth';
import styles from './me.module.scss';
import Container from "@mui/material/Container";
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ReplayIcon from '@mui/icons-material/Replay';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import { fetchDId, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import Paper from "@mui/material/Paper";
import { Card } from '../../components/Card'
import { Navigate } from "react-router-dom"
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const Me = () => { 
  React.useEffect(() => {
    document.title = "Profile";
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();  
  const userdata = useSelector(state => state.auth.data);
  const handleReload = () => {
    dispatch(fetchAuthMe());
  }
  const handleMe = () => {
    handleOpen()
  }
  const isAuth = useSelector(selectIsAuth);
    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
      defaultValues: {
        id: '',
      },
      mode: 'onChange',
    });

    const onSubmit = async (values) => {
      const data = await dispatch(fetchDId(values));

  if (data.payload.status === "success") {
  handleClose()
  } else if (data.payload.message) {
        setError('id', {
          type: 'manual',
          message: data.payload.message,
        });
  }

    }


  if (!window.localStorage.getItem('token')) {
    return <Navigate to="/login" />;
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
      {userdata ?
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column", padding: 10 }}>
      <Button onClick={handleMe} color="primary" type='submit' size="large" variant="outlined" >
          Указать айди дискорд
        </Button>
            </div>
      : 
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column", padding: 10 }}>
          <Skeleton variant="rect" width="200px" height={50} />
        </div>}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: "column", padding: 10 }}>
      {userdata ? <ReplayIcon onClick={handleReload} /> : <Skeleton variant="circular" width={30} height={30} />}
      </div>
      {userdata ? userdata.prizes.map((item) => (
          <Card data={item} key={item.id}></Card>
        )) : <Skeleton variant="rect" width="100%" height={250} />}


      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Paper style={{ height: 300 }} classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
          Айди дискорд
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
            <TextField 
              className={styles.field} 
              label="Айди"
              color="primary"
              error={Boolean(errors.id?.message)}
              helperText={errors.id?.message}
              { ... register('id', { required: 'Укажите айди', minLength: { value: 7, message: 'Это не айди',}})}
              fullWidth />
            <Button disabled={!isValid} color="secondary" type='submit' size="large" variant="contained" fullWidth>
            Подтвердить
            </Button>
            </form>
          </Paper>
        </Box>
      </Modal>
    </div>
    
  );
};
