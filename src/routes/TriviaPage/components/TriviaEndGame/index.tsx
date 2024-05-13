import { Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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

export const ButtonWrap = styled(Box)`
  margin: 20px;
`;

export const RestartButton = styled(Button)`
  font-size: 1rem;
  color: #ffffff;
  border-radius: 10px;
  margin: 20px;
`;

export const HomeButton = styled(Button)`
  font-size: 1rem;
  color: #ffffff;
  border-radius: 10px;
  margin: 20px;
`;

const EndGame = ({ score = 0, onRestartClick = () => {} }) => {
  const navigate = useNavigate();

  const onHomeClick = () => {
    navigate("/");
  };

  return (
    <>
      <Wrap>
        <Caption>Thanks for playing</Caption>
        <Score>You scored {score} points</Score>
      </Wrap>
      <ButtonWrap>
        <RestartButton variant="contained" onClick={onRestartClick}>
          Restart Game
        </RestartButton>
        <HomeButton color="secondary" variant="contained" onClick={onHomeClick}>
          Back to Home
        </HomeButton>
      </ButtonWrap>
    </>
  );
};
export default EndGame;
