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

  function getDetails(): string {
    switch (user.userType) {
      case UserType.Customer:
        const customer = user as CustomerModel;
        return "Customer: " + customer.firstName + " " + customer.lastName;

      case UserType.Company:
        const company = user as CompanyModel;
        return "Company: " + company.name;

      default:
        return "Admin: " + user.email;
    }
  }

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
          <span>{getDetails()} | </span>
          <NavLink to="/logout">Logout</NavLink>
        </>
      )}
    </div>
  );
}

export default AuthMenu;
