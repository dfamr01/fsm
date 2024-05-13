import { Box, Button, ButtonProps, Typography } from "@mui/material";
import { styled, css } from "@mui/material/styles";

export const Wrap = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 20px;
`;
interface CustomButtonProps extends ButtonProps {
  is_correct?: number;
  is_selected?: number;
}

export const Option = styled(Button)<CustomButtonProps>`
  color: white;
  border: 3px solid #a2a0a1;
  border-radius: 15px;
  padding: 10px 15px;
  background: rgba(0, 0, 0, 0.7);
  justify-content: flex-start;
  backdrop-filter: blur(5px);
  ${({ is_correct, is_selected }) => {
    if (is_correct) {
      return css`
        background: rgba(29, 204, 67, 0.7);
      `;
    }
    if (is_selected) {
      return css`
        background: rgba(139, 83, 139, 0.7);
      `;
    }
  }}
`;

export const KeyCaption = styled(Typography)`
  color: white;
  font-size: 1.4rem;
  margin-right: 10px;
  font-weight: bold;
`;

export const ValueCaption = styled(Typography)`
  color: white;
`;
