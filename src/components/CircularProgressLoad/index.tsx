import { styled } from "@mui/material/styles";

import { CircularProgress } from "@mui/material";
const CircularProgressWrap = styled(CircularProgress)`
  --dim: 21px;
  height: var(--dim) !important;
  width: var(--dim) !important;
`;

const CircularProgressLoad = () => {
  return <CircularProgressWrap />;
};
export default CircularProgressLoad;
