import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Wheel as Wheeel } from 'react-custom-roulette'
import { fetchWheel } from "../../redux/slices/games";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
   const [open, setOpen] = React.useState(false);
   const [error, setError] = React.useState("Loading...")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
 
  const handleSpinClick = async () => {
    if (!mustSpin) {
      const response = await dispatch(fetchWheel());
      console.log(response)
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

  React.useEffect(() => {
    const fetchData = async () => {
      
    };
    fetchData();
  }, []);


  return (
    <div style={{ marginTop: 100 }}>
      <Wheeel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}

        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <Button color="secondary" onClick={handleSpinClick}>SPINn</Button>
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
    </div>
  )
}