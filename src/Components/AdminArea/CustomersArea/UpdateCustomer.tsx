import { Box, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomerModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import notificationService from "../../../Services/NotificationService";

const UpdateCustomer = () => {
  const { register, handleSubmit, formState } = useForm<CustomerModel>();
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerModel>();
  const customerId = useParams().customerId;
  useEffect(() => {
    adminService.fetchOneCustomer(Number.parseInt(customerId)).then((customer) => {
      setSelectedCustomer(customer);
    });
  }, []);

  async function update(customer: CustomerModel) {
    try {
      customer.id = selectedCustomer.id;
      customer.password = selectedCustomer.password
      console.log(customer)
      const updatedCustomer: CustomerModel = await adminService.updateCustomer(
        customer
      );
      notificationService.success(
        `${updatedCustomer.firstName} updated successfully (id:${updatedCustomer.id})`
      );
    } catch (err: any) {
      notificationService.error(err);
    }
  }

  return (
    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Update customer
      </Typography>
      <TextField
        placeholder={`ID: ${selectedCustomer?.id.toString()}`}
        InputProps={{readOnly: true}}
        {...register("id")}
      />
      <TextField
        placeholder={selectedCustomer?.firstName}
        label={"First Name"}
        defaultValue={selectedCustomer?.firstName}
        {...register("firstName")}
      />
      <TextField
        placeholder={selectedCustomer?.lastName}
        label={"Last Name"}
        defaultValue={selectedCustomer?.lastName}
        {...register("lastName")}
      />
      <TextField
        placeholder={selectedCustomer?.email}
        label={"Email"}
        defaultValue={selectedCustomer?.email}
        {...register("email")}
      />
      <Button onClick={handleSubmit(update)}>Update</Button>
    </Box>
  );
};

export default UpdateCustomer;
