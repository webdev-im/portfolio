import Footer from "./Footer";
import Header from "./Header";
import React from "react";
import { VStack } from "@chakra-ui/react";

interface BaseLayoutProps {
  children: React.ReactNode;
  page: "home" | "about";
  setPage: (page: "home" | "about") => void;
}

const BaseLayout = ({ children, page, setPage }: BaseLayoutProps) => {
  return (
    <VStack minH="100vh" justify="space-between">
      <Header page={page} setPage={setPage} />
      {children}
      <Footer />
    </VStack>
  );
};

export default BaseLayout;
