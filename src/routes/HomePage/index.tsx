import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { Typography, ButtonGroup, Button, Paper, Box } from "@mui/material";
import { FSM_PAGES } from "../../utils/common";
import { theme } from "../../styles/theme";

const Title = styled("div")`
  margin: 0 auto 5px;
  font-size: 25px;
  text-align: center;
  user-select: none;
  color: ${theme.color.teal};
  flex: none;
`;

const ButtonGroupWrap = styled(ButtonGroup)`
  width: 100%;
  .accountMenu {
    border-bottom: 2px solid #727272;
    :last-child {
      border-bottom: none;
    }
  }
`;

const ButtonWrap = styled(Button)`
  background-color: #3c3c3c;
  padding: 15px 5px;
  &:focus,
  &:active {
    background-color: #2a2a2a;
  }
  &:hover {
    background-color: #636363;
  }
`;

// stopLight.assign()
const Home = ({}) => {
  return (
    <>
      <Title>Welcome to David's FSM demo</Title>
      <ButtonGroupWrap
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        {Object.values(FSM_PAGES).map(({ caption, to }) => {
          return (
            <ButtonWrap
              key={caption}
              className={"accountMenu"}
              component={Link}
              to={to}
              variant="contained"
              color="primary"
            >
              {caption}
            </ButtonWrap>
          );
        })}
      </ButtonGroupWrap>
    </>
  );
};
export default Home;
