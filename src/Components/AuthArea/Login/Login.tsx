import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Login.css";

function Login(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CredentialsModel>();
  const navigate = useNavigate();

  async function send(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      notificationService.success("Welcome Back!");
      navigate("/home");
    } catch (err) {
      const errors = err as Error | AxiosError;
      if(axios.isAxiosError(err)){
        err=err.response.data
      }
      // do what you want with your axios error
      console.error(err);
      notificationService.error(err);
    }
  }

  return (
    <div className="Login">
      <Typography variant="h5">Login</Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl variant="standard" fullWidth sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Role</InputLabel>
          <Select label="Role" {...register("userType")}>
            <MenuItem value="CUSTOMER">Customer</MenuItem>
            <MenuItem value="COMPANY">Company</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </Select>
          <TextField
            type="email"
            label="Email"
            variant="standard"
            {...register("email")}
          />
          <TextField
            type="password"
            label="Password"
            variant="standard"
            {...register("password")}
          />
          <Button onClick={handleSubmit(send)}>Login</Button>
        </FormControl>
      </Box>
    </div>
  );
}

export default Login;
