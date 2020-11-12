import { useEffect, useState } from 'react';

export const useSnake = () => {
  const [snake, setSsnake] = useState([
    { row: 2, col: 2 },
    { row: 2, col: 1 },
    { row: 3, col: 1 },
    { row: 4, col: 1 },
    { row: 5, col: 1 },
    { row: 5, col: 2 },
    { row: 5, col: 3 },
    { row: 5, col: 4 },
    { row: 6, col: 4 },
    { row: 7, col: 4 },
    { row: 8, col: 4 },
    { row: 9, col: 4 },
    { row: 10, col: 4 },
    { row: 11, col: 4 },
    { row: 12, col: 4 },
    { row: 12, col: 5 },
    { row: 12, col: 6 },
    { row: 12, col: 7 },
    { row: 12, col: 8 },
    { row: 12, col: 9 },
    { row: 12, col: 9 },
    { row: 11, col: 9 },
    { row: 10, col: 9 },
    { row: 9, col: 9 },
  ]);

  useEffect(() => {}, [snake]);

  const [direction, setDirection] = useState('right');
  useEffect(() => {
    console.log(direction);
  }, [direction]);
  return [snake, setSsnake, direction, setDirection];
};
