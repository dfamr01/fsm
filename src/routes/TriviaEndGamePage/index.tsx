import { Typography, Box } from "@mui/material";
import { styled, css } from "@mui/material/styles";

export const Wrap = styled(Box)`
  margin: auto;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  align-items: center;
  padding: 15px;
`;

export const Score = styled(Typography)`
  font-size: 2rem;
  color: #2b1dc7;
`;
export const Caption = styled(Typography)`
  font-size: 2rem;
  color: #2b1dc7;
`;

const EndGame = ({ score }) => {
  return (
    <Wrap>
      <Caption>Thanks for playing</Caption>
      <Score>You scored {score}</Score>
    </Wrap>
  );
};
export default EndGame;
