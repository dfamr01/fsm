import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Wrapper = styled(Box)`
  display: flex;
`;

export const TrafficLightBG = styled(Box)`
  background-color: black;
  border-radius: 10px;
  padding: 2px;
  height: min-content;
`;
export const TrafficLight = styled(Box)`
  --dim: 50px;
  background-color: gray;
  margin: 5px;
  width: var(--dim);
  height: var(--dim);
  border-radius: 50%;
`;
