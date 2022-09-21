import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Role from "../../../Models/Role";
import { BaseUserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./Menu.css";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { UIStore } from "../../../Redux/UIState";
import { adminRoutes } from "../../../Utils/routes";

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
        {user?.role === Role.Customer && (
          <>
            Customer Menu
            <NavLink to="/customers/my-coupons">See My Coupons</NavLink>
            <NavLink to="/customers/buy-coupons">Buy Coupons</NavLink>
          </>
        )}

        {user?.role === Role.Company && (
          <>
            <span>Company Menu</span>
            <NavLink to="/companies/company-coupons">See Coupons</NavLink>
            <NavLink to="#">Create Coupon</NavLink>
            <NavLink to="#">Update Coupon</NavLink>
            <NavLink to="#">Delete Coupon</NavLink>
          </>
        )}

        {user?.role === Role.Admin &&
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
