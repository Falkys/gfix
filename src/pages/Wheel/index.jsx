import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Wheel as Wheeel } from 'react-custom-roulette'
import { fetchWheel } from "../../redux/slices/games";

const data = [
  { option: '30.000$', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '10.000$', style: { backgroundColor: 'white', textColor: 'black' } },
  { option: 'Moonlight', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '5.000$', style: { backgroundColor: 'white', textColor: 'black' } },
  { option: '50.000$', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: 'LoveMZ', style: { backgroundColor: 'white', textColor: 'black' } },
  { option: 'Moonlight', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '13.000$', style: { backgroundColor: 'white', textColor: 'black' } },
]

export const Wheel = () => {
  const dispatch = useDispatch();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
 
  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = 2;
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(fetchWheel());
      console.log(response)
    };
    fetchData();
  }, []);


  return (
    <div style={{ marginTop: 100 }}>
      <Wheeel
        mustStartSpinning={mustSpin}
        prizeNumber={1}
        data={data}

        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <button onClick={handleSpinClick}>SPINn</button>
    </div>
  )
}