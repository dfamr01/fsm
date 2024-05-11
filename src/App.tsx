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
import { test } from "./utils/fsm/lib/fsm";
test();
const router = createBrowserRouter(
  createRoutesFromElements(
    //   <Route
    //   path="/"
    //   element={<Root />}
    //   loader={rootLoader}
    //   action={rootAction}
    //   errorElement={<ErrorPage />}
    // >
    <Route errorElement={<ErrorPage />}>
      {/* <Route index element={<Index />} /> */}

      <Route path="/" element={<Home />} />
    </Route>
    // </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
