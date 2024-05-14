import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { ButtonGroup, Box } from "@mui/material";

import { FSM_PAGES } from "../../utils/constants";
import { theme } from "../../styles/theme";
import PageWrapper from "../../components/PageWrapper";

const InnerWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 500px;
`;

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

const ButtonWrap = styled(RouterLink)`
  text-align: center;
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

const Home = () => {
  return (
    <PageWrapper>
      <InnerWrap>
        <Title>Welcome to David's FSM demo</Title>
        <ButtonGroupWrap
          orientation="vertical"
          aria-label="vertical outlined button group"
        >
          {Object.values(FSM_PAGES).map(({ caption, to }) => {
            return (
              <ButtonWrap
                key={caption}
                // component={RouterLink}
                to={to}
                // variant="contained"
                color="primary"
              >
                {caption}
              </ButtonWrap>
            );
          })}
        </ButtonGroupWrap>
      </InnerWrap>
    </PageWrapper>
  );
};
export default Home;
