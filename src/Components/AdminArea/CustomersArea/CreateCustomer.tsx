import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomerModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";

const CreateCustomer = (): JSX.Element => {
  const { register, handleSubmit, formState } = useForm<CustomerModel>();

  async function send(customer: CustomerModel) {
    try {
      const createdCustomer: CustomerModel = await adminService.createCustomer(
        customer
      );
      notificationService.success(
        `${createdCustomer.firstName} created successfully (id:${createdCustomer.id})`
      );
    } catch (err: any) {
      notificationService.error(err);
    }
  }
  return (
    <div className="CreateCompany">
      <Typography variant="h5">Login</Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl variant="standard" fullWidth sx={{ m: 1, minWidth: 120 }}>
          <TextField
            type="text"
            label="First Name"
            variant="standard"
            {...register("firstName")}
          />
          <TextField
            type="text"
            label="Last Name"
            variant="standard"
            {...register("lastName")}
          />
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
          <Button onClick={handleSubmit(send)}>Submit</Button>
        </FormControl>
      </Box>
    </div>
  );
};
export default CreateCustomer;
