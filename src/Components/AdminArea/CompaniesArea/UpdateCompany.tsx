import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CompanyModel } from "../../../Models/UserModel";
import { UIStore } from "../../../Redux/UIState";
import adminService from "../../../Services/AdminService";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import notificationService from "../../../Services/NotificationService";

const UpdateCompany = () => {
  const { register, handleSubmit, formState } = useForm<CompanyModel>();
  const [selectedCompany, setSelectedCompany] = useState<CompanyModel>();
  const companyId = useParams().companyId;
  useEffect(() => {
    adminService.fetchOneCompany(Number.parseInt(companyId)).then((company) => {
      setSelectedCompany(company);
    });
  }, []);

  async function update(company: CompanyModel) {
    try {
      company.password = selectedCompany.password
      const updatedCompany: CompanyModel = await adminService.updateCompany(
        company
      );
      notificationService.success(
        `${updatedCompany.name} updated successfully (id:${updatedCompany.id})`
      );
    } catch (err: any) {
      notificationService.error(err);
    }
  }

  return (
    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Update company
      </Typography>
      <TextField
        placeholder={"ID: " + selectedCompany?.id.toString()}
        InputProps={{readOnly: true}}
        value = {selectedCompany?.id}
        {...register("id")}
      />
      <TextField
        placeholder={selectedCompany?.name}
        label={"Company Name"}
        defaultValue={selectedCompany?.name}
        {...register("name")}
      />
      <TextField
        placeholder={selectedCompany?.email}
        label={"Company Email"}
        defaultValue={selectedCompany?.email}
        {...register("email")}
      />
      <Button onClick={handleSubmit(update)}>Update</Button>
    </Box>
  );
};

export default UpdateCompany;
