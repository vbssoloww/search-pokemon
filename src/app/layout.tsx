import { ApolloWrapper } from "@/lib/apolloWrapper";
import type { Metadata } from "next";
import { ReactNode } from 'react';
import "./globals.css";

type Props = {
  children: ReactNode,
}

export const metadata: Metadata = {
  title: "Pokemon Search",
  description: "Simple pokemon search with name",
};

export default function RootLayout({
  children,
}: Props) {
  return (
    <html>
      <body>
        <ApolloWrapper> {children} </ApolloWrapper>
      </body>
    </html>
  );
}
