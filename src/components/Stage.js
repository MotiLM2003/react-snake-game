import React, { useState, useEffect, useCallback } from 'react';
// hookjs
import { useSnake } from '../hooks/useSnake';
import { useInterval } from './useInterval';
const Stage = () => {
  useEffect(() => {}, []);
  const setIntitalGrid = () => {
    const rows = [];

    for (let i = 0; i < parseInt(gridSize); i++) {
      rows.push(Array.from(Array(gridSize), () => ({ status: 'empty' })));
    }

    return rows;
  };
  const [snake, setSnake, direction, setDirection] = useSnake();
  const [gridSize, setGridSize] = useState(50);
  const [grid, setGrid] = useState(setIntitalGrid);
  useEffect(() => {}, [grid]);

  const isSnake = (row, col) => {
    let cell = false;

    for (let i = 0; i < snake.length; i++) {
      if (snake[i].row === row && snake[i].col === col) {
        cell = true;
        break;
      }
    }
    return cell;
  };

  const updateGrid = () => {
    const lastPoints = { col: 0, row: 0 };
    setSnake((prev) => {
      const newprev = prev.map((item, index) => {
        lastPoints.col = item.col;
        lastPoints.row = item.row;
        let newObj = null;
        if (index === 0) {
          if (direction === 'right') {
            newObj = { ...item, col: item.col + 1 };
          } else if (direction === 'left') {
            newObj = { ...item, col: item.col - 1 };
          } else if (direction === 'down') {
            newObj = { ...item, row: item.row + 1 };
          } else if (direction === 'up') {
            newObj = { ...item, row: item.row - 1 };
          }
        } else {
          // console.log('col', lastPoints.col, ' row', lastPoints.row);

          newObj = {
            ...item,
            col: prev[index - 1].col,
            row: prev[index - 1].row,
          };
        }

        return newObj;
      });

      //   console.log(' new prev', newprev);
      return newprev;
    });
  };

  useInterval(() => {
    updateGrid();
  }, 100);

  const move = ({ keyCode }) => {
    switch (keyCode) {
      case 40: {
        if (direction !== 'up') {
          setDirection('down');
          break;
        }
        break;
      }
      case 39: {
        if (direction !== 'left') {
          setDirection('right');
          break;
        }
        break;
      }
      case 37: {
        if (direction !== 'right') {
          setDirection('left');
          break;
        }
        break;
      }
      case 38: {
        if (direction !== 'down') {
          setDirection('up');
          break;
        }
        break;
      }
    }

    console.log(keyCode);
  };
  return (
    <div
      className='stage'
      id='main-area'
      tabIndex='0'
      onKeyDown={(e) => move(e)}
    >
      <button onClick={updateGrid}>Hello</button>
      <div
        className='stage-grid'
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr` }}
      >
        {grid.map((item, row) =>
          item.map((value, col) => {
            let cell = '';
            if (isSnake(row, col)) {
              cell = <div key={col} className='grid-item alive'></div>;
            } else {
              cell = <div key={col} className='grid-item'></div>;
            }

            value.status = { row };
            return cell;
          })
        )}
      </div>
    </div>
  );
};

export default Stage;
