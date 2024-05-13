import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./routes/HomePage";
import ErrorPage from "./routes/ErrorPage";
import { FSM_PAGES } from "./utils/constants";
import TrafficPage from "./routes/TrafficLightPage";
import TriviaPage from "./routes/TriviaPage";
import TriviaEndGamePage from "./routes/TriviaEndGamePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path={FSM_PAGES.trafficLight.to} element={<TrafficPage />} />
      <Route path={FSM_PAGES.trivia.to} element={<TriviaPage />} />
      <Route path={FSM_PAGES.triviaEnd.to} element={<TriviaEndGamePage />} />
      <Route path="/" element={<Home />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
