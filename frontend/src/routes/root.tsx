import * as React from "react";
import logo from "../static/logo.png";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-dvh">
      <nav className="p-3 flex flex-row items-center ">
        <img
          src={logo}
          alt="Davinci Design logo"
          className="h-8 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="ml-4">
          <h1 className="cursor-pointer text-xl" onClick={() => navigate("/")}>
            Davinci
          </h1>
        </div>
      </nav>
      <div className="overflow-hidden h-full">
        <Outlet />
      </div>
    </div>
  );
};

export { Root };
