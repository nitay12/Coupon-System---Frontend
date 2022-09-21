import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import "./Header.css";
import AuthMenu from '../../AuthArea/AuthMenu/AuthMenu';
import { UIStore, toggleMenu } from '../../../Redux/UIState';

function Header(): JSX.Element {
    return (
        <div className="Header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={()=>UIStore.dispatch(toggleMenu())}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Coupon System
            </Typography>
            <AuthMenu/>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
    );
}

export default Header;
