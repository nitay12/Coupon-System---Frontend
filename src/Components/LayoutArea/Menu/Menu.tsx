import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import UserType from "../../../Models/UserType";
import { BaseUserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./Menu.css";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { UIStore } from "../../../Redux/UIState";
import { adminRoutes, companyRoutes, customerRoutes } from "../../../Utils/routes";

function Menu(): JSX.Element {
  const [user, setUser] = useState<BaseUserModel>();
  const [open, setOpen] = useState<boolean>();
  useEffect(() => {
    setUser(authStore.getState().user);
    setOpen(UIStore.getState().isMenuOpen);
    const unsubscribeAuth = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    const unsubscribeUI = UIStore.subscribe(() => {
      setOpen(UIStore.getState().isMenuOpen);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeUI();
    };
  }, []);

  return (
    <div className="Menu">
      <Drawer open={open} onClose={() => setOpen(false)}>
        {user?.userType === UserType.Customer && (
         customerRoutes.map((route) => (
          <List>
            <ListItem>
              <ListItemButton>
                <NavLink to={route.path}>
                  <ListItemText>{route.title}</ListItemText>
                </NavLink>
              </ListItemButton>
            </ListItem>
          </List>
        )))}

        {user?.userType === UserType.Company &&
          companyRoutes.map((route) => (
            <List>
              <ListItem>
                <ListItemButton>
                  <NavLink to={route.path}>
                    <ListItemText>{route.title}</ListItemText>
                  </NavLink>
                </ListItemButton>
              </ListItem>
            </List>
          ))}

        {user?.userType === UserType.Admin &&
          adminRoutes.map((route) => (
            <List>
              <ListItem>
                <ListItemButton>
                  <NavLink to={route.path}>
                    <ListItemText>{route.title}</ListItemText>
                  </NavLink>
                </ListItemButton>
              </ListItem>
            </List>
          ))}
      </Drawer>
    </div>
  );
}

export default Menu;
