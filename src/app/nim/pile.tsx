'use client';

import { Stack, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Pile({
  size,
  onSelect,
  isPlaying,
  computerGoing,
}: {
  size: number,
  onSelect: (taken: number) => void,
  isPlaying: boolean,
  computerGoing: number,
}) {
  const [number, setNumber] = useState(0);
  const [going, setGoing] = useState(0);

  function select(taken: number) {
    setGoing(taken);
    setNumber(0);
    setTimeout(() => {
      setGoing(0);
      onSelect(taken)
    }, 500);
  }

  useEffect(() => {
    setGoing(computerGoing);
    setTimeout(() => {
      setGoing(0);
      onSelect(computerGoing);
    }, 500);
  }, [computerGoing]);

  return (
    <Stack direction="column" onMouseLeave={() => setNumber(0)}>
      {
        Array.from({ length: size }, (_, idx) => {
          return <Button key={idx} background={idx < going ? "red" : idx < number ? "gray" : "black"} onMouseEnter={() => isPlaying && setNumber(idx + 1)} onClick={() => isPlaying && select(idx + 1)}></Button>
        })
      }
    </Stack>
  )
}