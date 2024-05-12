import { styled } from "@mui/material/styles";
import React from "react";

interface AuxProps {
  children: React.ReactNode;
}

const PageWrap = styled("div")`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Body = styled("div")`
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  height: 100%;
`;

const PageContent = styled("div")`
  width: 100%;
  max-width: 100%;
  overflow: auto;
  scroll-behavior: smooth;
  padding: 10px;
  box-sizing: border-box;
  display: inline-block;
`;

const PageWrapper = ({ children }: AuxProps) => {
  return (
    <PageWrap>
      <Body>
        <PageContent>{children}</PageContent>
      </Body>
    </PageWrap>
  );
};
export default PageWrapper;
