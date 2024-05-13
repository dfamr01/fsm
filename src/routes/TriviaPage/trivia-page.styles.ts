import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import coverImage from "../../assets/cover.png";

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${coverImage});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  height: 100%;
`;

export const Title = styled(Typography)`
  font-size: 2rem;
  color: white;
`;

export const TriviaWrap = styled(Box)`
  max-width: 900px;
  width: 80%;
  margin: auto;
`;

export const StatsBar = styled(Box)`
  margin: 20px 10px;
  color: black;
  border: 3px solid #a2a0a1;
  border-radius: 10px;
  padding: 20px 15px;
  background: rgba(255, 255, 255, 0.8);
  font-weight: bold;
`;

export const Question = styled(Box)`
  color: white;
  border: 3px solid #a2a0a1;
  border-radius: 15px;
  padding: 10px 15px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);

  height: 3rem;
  margin-bottom: 20px;
`;
