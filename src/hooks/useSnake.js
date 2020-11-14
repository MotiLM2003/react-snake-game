import { useEffect, useState } from 'react';

export const useSnake = () => {
  const [snake, setSsnake] = useState([
    { row: 2, col: 2 },
    { row: 2, col: 1 },
    { row: 3, col: 1 },
  ]);

  useEffect(() => {}, [snake]);

  const [direction, setDirection] = useState('right');
  useEffect(() => {
    console.log(direction);
  }, [direction]);
  return [snake, setSsnake, direction, setDirection];
};
