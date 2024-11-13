import { Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages";
import Login from "./pages/Login";
import Layout from "./Layout";
import Register from "./pages/Register";
import Account from "./pages/Account";
import MyPlace from "./pages/MyPlace";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route index path="/login" element={<Login />} />
          <Route index path="/register" element={<Register />} />

          <Route index path="/account/:subpage?" element={<Account />} />
          <Route index path="/account/places/:id" element={<MyPlace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
