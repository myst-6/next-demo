'use client';

import './globals.css';
import Header from './header';
import { ChakraProvider, Divider } from '@chakra-ui/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Next Demo!</title>
      </head>
      <body>
        <ChakraProvider>
          <Header />
          <Divider orientation="horizontal" />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
};
