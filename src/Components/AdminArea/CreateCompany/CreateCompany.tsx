import useState from "react";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { CompanyModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";

const CreateCompany = (): JSX.Element => {
  const { register, handleSubmit, formState } = useForm<CompanyModel>();

  async function send(company: CompanyModel) {
    try {
      const createdCompany: CompanyModel = await adminService.createCompany(
        company
      );
      notificationService.success(
        `${createdCompany.name} created successfully (id:${createdCompany.id})`
      );
    } catch (err: any) {
      notificationService.error(err);
    }
  }
  return (
    <div className="CreateCompany">
      <Box sx={{ minWidth: 120 }}>
        <FormControl variant="standard" fullWidth sx={{ m: 1, minWidth: 120 }}>
          <TextField
            type="text"
            label="Name"
            variant="standard"
            {...register("name")}
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
export default CreateCompany;
