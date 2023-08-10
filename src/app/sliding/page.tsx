'use client';

import { Text, Box, Button, Card, CardBody, CardHeader, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Heading, SimpleGrid, CardFooter } from '@chakra-ui/react';
import { MdGrid3X3 } from 'react-icons/md';
import styles from './page.module.css';
import { useEffect, useState } from 'react';

export default function Sliding() {
    const [sliderValue, setSliderValue] = useState(3);
    const [board, setBoard] = useState(emptyBoard(sliderValue));
    const [swapCount, setSwapCount] = useState(0);
    const [isWon, setIsWon] = useState(true);

    function emptyBoard(size: number) {
        return Array.from({length: size}, (_, i) => Array.from({length: size}, (_, j) => {
            const boxes = size * size;
            const x = (i * size + j + 1) % boxes;
            return x;
        }));
    }

    function reset() {
        setBoard(emptyBoard(sliderValue));
        let n_swaps = board.length ** 4;
        const swapper: NodeJS.Timer = setInterval(() => {
            if (n_swaps-- > 0) randomSwap();
            else clearInterval(swapper), setSwapCount(0);
        }, board.length < 5 ? 1000 / n_swaps : 0);
    }

    function swap(i: number, j: number) {
        setBoard(_board => {
            const board = _board.map(row => row.slice());
            let zi = -1, zj = -1;
            if (i > 0 && board[i-1][j] === 0) [zi, zj] = [i-1, j];
            if (j > 0 && board[i][j-1] === 0) [zi, zj] = [i, j-1];
            if (i < board.length-1 && board[i+1][j] === 0) [zi, zj] = [i+1, j];
            if (j < board.length-1 && board[i][j+1] === 0) [zi, zj] = [i, j+1];
            if (zi === -1 || zj === -1) return board;
            [
                board[i][j], board[zi][zj]
            ] = [
                board[zi][zj], board[i][j]
            ];
            return board;
        });
        setSwapCount(swapCount => swapCount + 1);
    }

    function randomSwap() {
        setBoard(board => {
            let zi = 0, zj = 0;
            for (let i=0; i<board.length; i++) {
                for (let j=0; j<board.length; j++) {
                    if (board[i][j] === 0) {
                        zi = i, zj = j;
                    }
                }
            }
            const options: [number, number][] = [];
            if (zi > 0) options.push([zi-1, zj]);
            if (zj > 0) options.push([zi, zj-1]);
            if (zi < board.length-1) options.push([zi+1, zj]);
            if (zj < board.length-1) options.push([zi, zj+1]);
            console.log([zi, zj]);
            swap(...options[Math.random() * options.length | 0]);
            return board;
        });
    }

    useEffect(() => {
        const correct = emptyBoard(board.length);
        for (let i=0; i<board.length; i++) {
            for (let j=0; j<board.length; j++) {
                if (board[i][j] != correct[i][j]) {
                    setIsWon(false);
                    return;
                }
            }
        }
        setIsWon(true);
    }, [board]);

    return (
        <main className={styles.main}>
            <Card>
                <CardHeader display="flex" flexDirection="column" alignItems="center">
                    <Heading size="md">Choose the Size of your Puzzle</Heading>
                    <Slider mt={6} pt={6} pb={6} mb={12} value={sliderValue} min={3} max={9} step={1} orientation="horizontal" onChange={val => setSliderValue(val)}>
                        <SliderMark p={1} bg="blue.500" color="white" value={sliderValue} top={5} ml={-4}>
                            {sliderValue}x{sliderValue}
                        </SliderMark>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb>
                            <Box as={MdGrid3X3} />
                        </SliderThumb>
                    </Slider>
                    <Button onClick={() => reset()}>Start</Button>
                </CardHeader>
                <CardBody minWidth={board.length * 60}>
                    <SimpleGrid columns={board.length} spacing={1}>
                        {
                            board.flatMap((row, i) => row.map((x, j) => {
                                const boxStyle = {
                                    "bgColor": isWon ? "green.200" : "blue.100",
                                    "display": "flex",
                                    "alignItems": "center",
                                    "justifyContent": "center",
                                    "flex": 1,
                                    "aspectRatio": 1,
                                    "border": "1px solid black"
                                };
                                if (x === 0) {
                                    boxStyle.bgColor = "";
                                    boxStyle.border = "";
                                }
                                return (
                                    <Box key={x} {...boxStyle} onClick={() => !isWon && swap(i, j)}>
                                        {x > 0 && x}
                                    </Box>
                                );
                            }))
                        }
                    </SimpleGrid>
                </CardBody>
                <CardFooter display="flex" justifyContent="center">
                    <Text size="md">
                        Number of Swaps: {swapCount}
                    </Text>
                </CardFooter>
            </Card>
        </main>
    );
};