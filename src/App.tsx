import { RouterProvider } from "react-router-dom";
import { Router } from "./Routes/routes";

const App = () => {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
};

export default App;
