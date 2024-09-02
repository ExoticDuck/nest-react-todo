import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import { Header } from "./components/header/header";
import Home from "./pages/home/home.page";
import Login from "./pages/login/login.page";
import Registration from "./pages/registration/registration.page";
import TaskList from "./pages/task-list/task-list.page";
import RoleService from "./pages/role-service/role-service.page";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path={ROUTES.INDEX} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTRATION} element={<Registration />} />
        <Route path={ROUTES.TASK_LIST} element={<TaskList />} />
        <Route path={ROUTES.ROLE_SERVICE} element={<RoleService />} />
      </Routes>
    </div>
  );
}

export default App;
