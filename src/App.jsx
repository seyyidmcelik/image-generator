import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";

import router from "./router";

const App = () => {
  return <RouterProvider router={router} />
}

{/* <BrowserRouter>
      <Navbar />
      <div className="container mt-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generator />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter> */}

export default App
