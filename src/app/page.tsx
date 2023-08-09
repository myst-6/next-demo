'use client';

import styles from './page.module.css';
import { Card, CardBody, CardHeader, Divider, Heading, Text, Stack, Box, List, ListItem, ListIcon } from '@chakra-ui/react';
import { MdNumbers } from 'react-icons/md';

export default function Home() {
  return (
    <main className={styles.main}>
      <Stack className={styles.stack} direction="column" spacing={4}>
        <Card>
          <CardHeader>
            <Heading size="xl">Introduction</Heading>
          </CardHeader>
          <CardBody>
            <Stack direction="column" spacing={4} divider={<Divider orientation="horizontal" />}>
              <Box>
                <Heading size="md">What is this?</Heading>
                <Text size="sm">
                  The purpose of this website is to help me learn Next.js and Chakra.
                  Right now I&apos;m enjoying how it looks and feels.
                  It&apos;s not too complicated to learn, either.
                  Check out the games on this website!
                </Text>
              </Box>
              <Box>
                <Heading size="md">When and where is this?</Heading>
                <Text size="sm">
                  This is here and this is now.
                </Text>
              </Box>
              <Box>
                <Heading size="md">Why is this?</Heading>
                <Text size="sm">
                  Why not? I enjoy it.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="xl">Games</Heading>
          </CardHeader>
          <CardBody>
            <Stack direction="column" spacing={4} divider={<Divider orientation="horizontal" />}>
              <Box>
                <Heading size="md">Games?</Heading>
                <Text size="sm">
                  There are a variety of games on this website for you to play!
                  All of these are simply implementations of popular games that already exist.
                </Text>
              </Box>
              <Box>
                <Heading size="md">Sudoku</Heading>
                <Text size="sm">
                  Your challenge: to place digits (1-9) in the grid such that:
                </Text>
                  <List>
                    <ListItem>
                      <ListIcon as={MdNumbers} />
                      Each row does not contain the same digit twice.
                    </ListItem>
                    <ListItem>
                      <ListIcon as={MdNumbers} />
                      Each column does not contain the same digit twice.
                    </ListItem>
                    <ListItem>
                      <ListIcon as={MdNumbers} />
                      Each 3x3 box of numbers does not contain the same digit twice.
                    </ListItem>
                  </List>
                <Text>
                  You can choose how many numbers are given to you as hints at the start.
                  Can you solve the sudoku?
                </Text>
              </Box>
              <Box>
                <Heading size="md">Nim</Heading>
                <Text size="sm">
                  In this game you play against an artificial intelligence!
                  On each round, the person playing takes away one or more stones from a single pile.
                  The first person who cannot take any more stones away loses!
                  The AI will always win when it gets the chance. 
                  Can you beat it?
                </Text>
              </Box>
              <Box>
                <Heading size="md">Sliding puzzle</Heading>
                <Text size="sm">
                  You are given a grid of numbered blocks, with one empty space.
                  Your challenge is to rearrange the blocks into ascending order, by sliding blocks into the empty space.
                  Blocks must increase along the row and down the grid.
                  You can choose the size of the grid, but be careful - it gets difficult quickly!
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </main>
  );
};
