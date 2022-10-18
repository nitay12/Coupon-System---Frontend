import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserType from "../../../Models/UserType";
import {
  BaseUserModel,
  CompanyModel,
  CustomerModel,
} from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
  const [user, setUser] = useState<BaseUserModel>();

  useEffect(() => {
    setUser(authStore.getState().user);

    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="AuthMenu">
      {!user && (
        <>
          <span>Hello Guest | </span>
          <Button color="inherit">
            <NavLink to="/login">Login</NavLink>
          </Button>
        </>
      )}

      {user && (
        <>
          <NavLink to="/logout">Logout</NavLink>
        </>
      )}
    </div>
  );
}

export default AuthMenu;
