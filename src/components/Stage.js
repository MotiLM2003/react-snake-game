import React, { useState, useEffect, useCallback, useRef } from 'react';
// hookjs
import { useSnake } from '../hooks/useSnake';
import { useInterval } from './useInterval';
const Stage = () => {
  useEffect(() => {
    setRandomCandy();
  }, []);
  const setIntitalGrid = () => {
    const rows = [];

    for (let i = 0; i < parseInt(gridSize); i++) {
      rows.push(Array.from(Array(gridSize), () => ({ status: 'empty' })));
    }

    return rows;
  };
  const [snake, setSnake, direction, setDirection] = useSnake();
  const [gridSize, setGridSize] = useState(30);
  const [grid, setGrid] = useState(setIntitalGrid);
  const [isGameOn, setIsGameOn] = useState(false);
  const [snakcs, setSnacks] = useState([]);
  const [score, setScore] = useState(0);
  const gameBoardRef = useRef();
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

  const setRandomCandy = () => {
    const row = Math.floor(Math.random() * gridSize);
    const col = Math.floor(Math.random() * gridSize);
    console.log(grid[row][col]);
    console.log(col, row);
    setSnacks((prev) => {
      return [...prev, { row, col }];
    });
  };

  const increaseSnakeSize = () => {
    const lastSnake = snake[snake.length - 1];
    console.log('size', lastSnake);
    setSnake((prev) => {
      return [...prev, { row: lastSnake.row, col: lastSnake.col }];
    });
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
            const value = item.col + 1;

            if (value > gridSize) {
              setIsGameOn(false);
            }
            newObj = { ...item, col: value };
          } else if (direction === 'left') {
            const value = item.col - 1;

            if (value < 0) {
              setIsGameOn(false);
            }
            newObj = { ...item, col: value };
          } else if (direction === 'down') {
            const value = item.row + 1;
            if (value > gridSize) {
              setIsGameOn(false);
            }
            newObj = { ...item, row: value };
          } else if (direction === 'up') {
            const value = item.row - 1;
            if (value < 0) {
              setIsGameOn(false);
            }
            newObj = { ...item, row: value };
          }
          for (let i = 0; i < snakcs.length; i++) {
            if (newObj.row == snakcs[i].row && newObj.col == snakcs[i].col) {
              console.log('hit');
              setScore((prev) => prev + 10);
              setSnacks((prev) => {
                console.log(prev.slice(i, 1));
                setRandomCandy();
                increaseSnakeSize();
                return [];
              });
            }
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
    if (!isGameOn) {
      return;
    }
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

  const startGame = () => {
    setGrid(setIntitalGrid);
    setSnake([
      { row: 2, col: 2 },
      { row: 2, col: 1 },
      { row: 3, col: 1 },
    ]);
    setScore(0);
    setIsGameOn(true);
    setDirection('right');
    gameBoardRef.current.style.foucs = true;
  };
  return (
    <div
      ref={gameBoardRef}
      className='stage'
      id='main-area'
      tabIndex='0'
      onKeyDown={(e) => move(e)}
    >
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

            snakcs.map((item) => {
              if (item.col === col && item.row === row) {
                cell = <div key={col} className='grid-item snack'></div>;
              }
            });

            value.status = { row };
            return cell;
          })
        )}
      </div>
      <div className='menu'>
        <div className='score'> score: {score}</div>
        <button className='btn' onClick={startGame}>
          start game
        </button>
      </div>
    </div>
  );
};

export default Stage;
