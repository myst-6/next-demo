'use client';

import styles from './page.module.css';
import {Card, CardBody, Box, Text, SimpleGrid, Icon, CardHeader, Switch, FormLabel, FormControl, useBoolean, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Button, CardFooter} from '@chakra-ui/react';
import { useState, createElement, useEffect, useMemo, useCallback } from 'react';
import {
  PiNumberZeroBold, PiNumberOneBold, PiNumberTwoBold, PiNumberThreeBold, PiNumberFourBold, PiNumberFiveBold, PiNumberSixBold, PiNumberSevenBold, PiNumberEightBold, PiNumberNineBold,
  PiNumberCircleZero, PiNumberCircleOne, PiNumberCircleTwo, PiNumberCircleThree, PiNumberCircleFour, PiNumberCircleFive, PiNumberCircleSix, PiNumberCircleSeven, PiNumberCircleEight, PiNumberCircleNine
} from 'react-icons/pi';

const USER_NUMBER = [PiNumberZeroBold, PiNumberOneBold, PiNumberTwoBold, PiNumberThreeBold, PiNumberFourBold, PiNumberFiveBold, PiNumberSixBold, PiNumberSevenBold, PiNumberEightBold, PiNumberNineBold];
const HINT_NUMBER = [PiNumberCircleZero, PiNumberCircleOne, PiNumberCircleTwo, PiNumberCircleThree, PiNumberCircleFour, PiNumberCircleFive, PiNumberCircleSix, PiNumberCircleSeven, PiNumberCircleEight, PiNumberCircleNine];

function Square({
  value,
  borders,
  highlight,
  onChange,
}: {
  value: number,
  borders: number[],
  highlight: boolean,
  onChange: (number: number) => void,
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <Box boxSize={16} className={styles.box} bgColor={highlight ? "red.300" : "transparent"} 
          borderTopWidth={borders[0]} borderRightWidth={borders[1]} borderBottomWidth={borders[2]} borderLeftWidth={borders[3]}> 
          <Text>
            <Icon color={(value % 10 === 0) ? "lightgray" : "black"}>
              {createElement(value < 10 ? USER_NUMBER[value] : HINT_NUMBER[value % 10])}
            </Icon>
          </Text>
        </Box>
      </PopoverTrigger>
      {value < 10 && <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <SimpleGrid columns={3}>
            {
              [...Array(9).keys()].map(x => {
                return <Button variant="ghost" key={x} onClick={() => onChange(x + 1)}>{x + 1}</Button>
              })
            }
          </SimpleGrid>
        </PopoverBody>
        <PopoverCloseButton />
      </PopoverContent>}
    </Popover>
  )
}

export default function Sudoku() {
  const [highlight, setHighlight] = useBoolean(false);
  const [won, setWon] = useState(false);
  const [numbers, setNumbers] = useState(Array(81).fill(0));
  const [incorrect, setIncorrect] = useState(new Set<number>());
  
  const findIncorrect = useCallback(function findIncorrect(numbers: number[]) {
    const rowdx = Array.from({length: 9}, (_, i) => Array.from({length: 9}, (_, j) => {
      return 9 * i + j;
    }));
    const coldx = Array.from({length: 9}, (_, i) => Array.from({length: 9}, (_, j) => {
      return i + 9 * j;
    }));
    const sqdx = Array.from({length: 9}, (_, i) => Array.from({length: 9}, (_, j) => {
      let row = 3 * (i / 3 | 0) + (j / 3 | 0);
      let col = 3 * (i % 3) + (j % 3);
      return 9 * row + col;
    }));
    function helper(group: number[]) {
      const map = new Map<number,number>();
      const dup = new Set<number>();
      for (let i of group) {
        const x = numbers[i] % 10;
        if (x === 0) continue;
        if (map.has(x)) {
          dup.add(i);
          dup.add(map.get(x)!);
        } else map.set(x, i);
      }
      return dup;
    }
    return [...rowdx, ...coldx, ...sqdx].reduce((ans, group) => {
      for (const idx of helper(group)) ans.add(idx);
      return ans;
    }, new Set<number>());
  }, []);

  useEffect(() => {
    setNumbers(Array.from({length: 81}, (_, i) => {
      if (Math.random() < 0.05) return 11 + (Math.random() * 9 | 0);
      else return 0;
    }));
  }, []);
  
  useEffect(() => {
    const incorrect = findIncorrect(numbers);
    setIncorrect(incorrect);
    if (incorrect.size == 0) {
      if (numbers.every(number => number > 0)) {
        setWon(true);
      }
    }
  }, [numbers, findIncorrect]);

  function update(idx: number, change: number) {
    setNumbers(numbers => numbers.map((number, i) => i === idx ? change : number));
  }

  function reset() {
    location.reload();
  } 

  useEffect(() => {
    const board = Array(81).fill(0);
    const digits = [1,2,3,4,5,6,7,8,9];
    for (let i=0; i<9; i++) for (let j=0; j<9; j++) if (Math.random() < 0.5) {
      [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    function solve(idx: number) {
      if (idx == 81) return true;
      for (const digit of digits) {
        board[idx] = digit;
        if (findIncorrect(board).size > 0) continue;
        if (solve(idx + 1)) return true;
      }
      board[idx] = 0;
      return false;
    }
    solve(0);
    const indices = [...Array(81).keys()];
    for (let i=0; i<81; i++) for (let j=0; j<81; j++) if (Math.random() < 0.5) {
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const hints = Array(81).fill(0);
    const N_HINT = 30;
    for (let i=0; i<N_HINT; i++) {
      const idx = indices[i];
      hints[idx] = board[idx] + 10;
    }
    setNumbers(hints);
  }, [findIncorrect]);
  
  return (
    <main className={styles.main}>
      <Card>
        <CardHeader>
          <FormControl display="flex" alignItems="center" justifyContent="center">
            <FormLabel htmlFor="highlight" mb={0} userSelect="none">
              Highlight Incorrect
            </FormLabel>
            <Switch id="highlight" isChecked={highlight} onChange={() => setHighlight.toggle()} />
          </FormControl>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={9}>
            {
              numbers.map((number, idx) => {
                const borders = [1, 1, 1, 1];
                const col = idx % 9, row = idx / 9 | 0;
                if (row % 3 === 0) borders[0] = 3;
                if (col % 3 === 0) borders[3] = 3;
                if (col == 8) borders[1] = 3;
                if (row == 8) borders[2] = 3;
                return <Square onChange={number => update(idx, number)} key={idx} value={number} borders={borders} highlight={highlight && incorrect.has(idx)} />
              })
            }
          </SimpleGrid>
          <Text marginTop={4} textAlign="center">
            {won ? <Text>Congratulations, you completed the sudoku!</Text> : <Text>Keep trying...</Text>}
          </Text>
        </CardBody>
        <CardFooter justifyContent="center">
          <Button onClick={() => reset()}>Reset Game</Button>
        </CardFooter>
      </Card>
    </main>
  );
};