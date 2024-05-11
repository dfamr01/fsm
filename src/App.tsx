import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Home from "./routes/HomePage";
import ErrorPage from "./routes/ErrorPage";
import { FSM_PAGES } from "./utils/common";
import TrafficPage from "./routes/TrafficPage";
import TriviaPage from "./routes/TriviaPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path={FSM_PAGES.trafficLight.to} element={<TrafficPage />} />
      <Route path={FSM_PAGES.trivia.to} element={<TriviaPage />} />
      <Route path="/" element={<Home />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
