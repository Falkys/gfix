import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Wheel as Wheeel } from 'react-custom-roulette'
import { fetchWheel } from "../../redux/slices/games";
import { fetchAuthMe } from "../../redux/slices/auth";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
const data = [
  { option: '30.000$', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '10.000$', style: { backgroundColor: 'white', textColor: 'black' } },
  { option: 'Moonlight', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '5.000$', style: { backgroundColor: 'white', textColor: 'black' } },
  { option: '50.000$', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: 'LoveMZ', style: { backgroundColor: 'white', textColor: 'black' } },
  { option: '1.000$', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '13.000$', style: { backgroundColor: 'white', textColor: 'black' } },
]
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "100",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Wheel = () => {
  
  const dispatch = useDispatch();
   const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
   const [error, setError] = React.useState("Loading...")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setOpen1(false)
    dispatch(fetchAuthMe())
    }
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [text, setText] = useState("");
  const [winnedItem, setWinnedItem] = useState("");
    const navigate = useNavigate();
  const handleSpinClick = async () => {
    if (!mustSpin) {
      const response = await dispatch(fetchWheel());
      setWinnedItem(response.payload.winPrize)
      if (response.error) {
        setError(response.payload.message)
        handleOpen()
      } else {
      if (response) {
        const newPrizeNumber = await response.payload.winItem;
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      }
      }
    }
    }

  const handleClosing = () => {
    if (winnedItem.type === "money") {
    setText(`Поздровляю , вы выйграли ${winnedItem.amount}$ в UnbelievaBoat Bot, Вывести их можно в профиле`)
    } else if (winnedItem.type === "role") {
      setText(`Поздровляю , вы выйграли  роль ${winnedItem.name}, Вывести ее можно в профиле`)
    }
    handleOpen1()
  }

  const handleMe = () => {
    navigate("/me")
    dispatch(fetchAuthMe())
  }

  return (
    <div style={{ height: "100%", marginTop: 200 }}>
      <Wheeel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}

        onStopSpinning={() => {
          handleClosing()
          setMustSpin(false);
        }}
      />
      <Button onClick={handleSpinClick} color="secondary" type='submit' size="large" variant="outlined" >
        Крутить
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Упссс 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {error}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Поздровляю 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
          <Button onClick={handleMe} color="primary" type='submit' size="large" variant="outlined" >
            Перейти
          </Button>
        </Box>
      </Modal>
    </div>
  )
}