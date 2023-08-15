'use client';

import Link from 'next/link';
import styles from './header.module.css';
import { Button, Stack } from '@chakra-ui/react';
import { MdGridOn, MdHome, MdStackedBarChart, MdSwapHoriz, MdAssignment } from 'react-icons/md';
import { IconType } from 'react-icons';
import { createElement } from 'react';

function HeaderItem({
  name,
  path,
  icon,
}: {
  name: string,
  path: string,
  icon: IconType
}) {
  return (
    <Link href={path}>
      <Button leftIcon={createElement(icon)} 
              variant="ghost" colorScheme="orange" className={styles.button}>
        {name}
      </Button>
    </Link>
  );
}

export default function Header() {
    return (
      <Stack className={styles.header} direction="row" spacing={4}>
        <HeaderItem name="Home" path="/" icon={MdHome} />
        <HeaderItem name="Sudoku" path="/sudoku" icon={MdGridOn} />
        <HeaderItem name="Nim" path="/nim" icon={MdStackedBarChart} />
        <HeaderItem name="Sliding Puzzle" path="/sliding" icon={MdSwapHoriz} />
        <HeaderItem name="Feedback" path="/feedback" icon={MdAssignment} />
      </Stack>
    );
};