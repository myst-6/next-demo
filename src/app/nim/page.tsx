'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import {Stack, Heading, Box, Text, Button, Card, CardBody, CardFooter, CardHeader, Icon } from '@chakra-ui/react';
import { MdAccountCircle, MdComputer } from 'react-icons/md';
import Pile from './pile';

export default function Nim() {
  const [sizes, setSizes] = useState<number[]>([1, 2, 3, 4, 5]);
  const [isPlayer, setIsPlayer] = useState(true);

  useEffect(() => {
    const initialPiles = [1, 2, 3, 4, 5];
    for (let i=0; i<initialPiles.length; i++) {
      for (let j=0; j<initialPiles.length; j++) {
        if (Math.random() < 0.5) {
          [initialPiles[i], initialPiles[j]] = [initialPiles[j], initialPiles[i]];
        }
        if (initialPiles[i] < 5 && Math.random() < 2 / initialPiles.length / initialPiles.length) {
          initialPiles[i] += 1;
        }
      }
    }
    setSizes(initialPiles);
  }, []);

  function update(idx: number, count: number) {
    if (count == 0) return;
    setSizes(sizes => sizes.map((size, sizeIdx) => sizeIdx == idx ? size - count : size));
    setIsPlayer(isPlayer => !isPlayer);
  }

  const [computerMove, setComputerMove] = useState<[number,number]>([0, 0]);

  useEffect(() => {
    if (!isPlayer) {
      setTimeout(() => {
        const nimsum = sizes.reduce((a, b) => a ^ b, 0);
        let idx = sizes.findIndex(x => (x ^ nimsum) < x);
        if (idx == -1) idx = sizes.findIndex(x => x > 0);
        const count = Math.max(1, sizes[idx] - (sizes[idx] ^ nimsum));
        setComputerMove([idx, count]);
      }, 1000);
    } else {
      setComputerMove([0, 0]);
    }
  }, [isPlayer, sizes]);

  function reset() {
    location.reload();
  }

  return (
    <main className={styles.main}>
      <Card>
        <CardHeader>
          <Heading size="md" textAlign="center">
            <Icon>
              {isPlayer ? <MdAccountCircle /> : <MdComputer />}
            </Icon>
            {isPlayer ? "Your Turn" : "Computer's Turn"}
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack direction="row" className={styles.stacks}>
            {
              sizes.map((size, idx) => {
                return size > 0 && <Pile computerGoing={computerMove[0] == idx ? computerMove[1] : 0} isPlaying={isPlayer} key={idx} size={size} onSelect={count => update(idx, count)} />
              })
            }
            {
              sizes.every(size => size === 0) && <Text>No piles left! {isPlayer ? "You lost!" : "You won!"}</Text>
            }
          </Stack>
        </CardBody>
        <CardFooter justifyContent="center">
          <Button onClick={() => reset()}>Reset Game</Button>
        </CardFooter>
      </Card>
    </main>
  );
};