import Footer from "./Footer";
import Header from "./Header";
import React from "react";
import { VStack } from "@chakra-ui/react";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <VStack minH="100vh" justify="space-between">
      <Header />
      {children}
      <Footer />
    </VStack>
  );
};

export default BaseLayout;
