import { useEffect, useState } from "react";
import { CompanyModel } from "../../../Models/UserModel";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridSelectionModel,
  GridRowId,
} from "@mui/x-data-grid";
import "./CompaniesTable.css";
import UpdateCompanyModal from "./UpdateCompany";
import { UIStore } from "../../../Redux/UIState";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
interface CompaniesTableProps {
  companies: CompanyModel[];
}

export function CompaniesTable(props: CompaniesTableProps): JSX.Element {
  const rows: GridRowsProp = props.companies;
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
  ];
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  async function handleDelete(companyId: GridRowId) {
    try {
      await adminService.deleteCompany(companyId);
      notificationService.success(
        `successfully deleted company (id:${companyId})`
      );
    } catch (err: any) {
      notificationService.error(err);
    }
  }

  return (
    <div style={{ height: "400", width: "100%" }}>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Warning, Deleting Company"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to delete a company from your database. Are you sure
            you want to delete this company?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>No!</Button>
          <Button onClick={() => handleDelete(selectedRows[0])} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {selectedRows.length > 0 ? (
        <Box>
          <Button
            variant="contained"
            onClick={() => navigate("/update-company/" + selectedRows[0])}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete
          </Button>
        </Box>
      ) : null}
      <DataGrid
        style={{ height: 300 }}
        rows={rows}
        columns={columns}
        checkboxSelection
        hideFooterSelectedRowCount
        rowsPerPageOptions={[5, 10]}
        onSelectionModelChange={(selection) => {
          //Prevent multi rows selection
          if (selection.length > 1) {
            const selectionSet = new Set(selectedRows);
            const result = selection.filter((s) => !selectionSet.has(s));

            setSelectedRows(result);
          } else {
            setSelectedRows(selection);
          }
        }}
        selectionModel={selectedRows}
      />
    </div>
  );
}
