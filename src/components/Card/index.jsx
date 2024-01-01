import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Cardd from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { fetchWithdraw } from "../../redux/slices/games";
import { fetchAuthMe } from "../../redux/slices/auth";
import { useDispatch } from 'react-redux';
import Modal from '@mui/material/Modal';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const Card = ({ data }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState({ title:"", description:""});
  const [click, setClick] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    dispatch(fetchAuthMe())
    setOpen(false);
  }

  let h5text = ""
  let text0 = "" 
  let text1 = ""
  if (data) {
  if (data.type === "money")
    { 
     h5text = "Деньги";
      text0 = data.amount
      text1 = "Можешь получить деньги в UnbelievaBoat"
    } else {
     h5text = "Роль"
      text0 = data.name
      text1 = "Можешь получить роль на сервере Gfix"
    }
  }

  const handleClick = async (item) => {
      const response = await dispatch(fetchWithdraw({id: item}));
    
     console.log(response)
    setText({ title: "Успех", description: response.payload.message })
    handleOpen()
      setClick(false)
    }


  return (
    <>
    <Box sx={{ minWidth: 275 }}>
    <Cardd sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data ? data.type.toUpperCase() : <Skeleton />}
        </Typography>
        <Typography variant="h5" component="div">
          {h5text}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {text0} 
        </Typography>
        <Typography variant="body2">
          {text1}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => {handleClick(data ? data._id : 1); setClick(true)}} variant="outlined" size="small">Вывести</Button>
      </CardActions>
      </Cardd>
    </Box>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {text.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {text.description}
        </Typography>
      </Box>
    </Modal>
    </>
  )
}