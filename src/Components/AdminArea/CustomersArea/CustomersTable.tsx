import { useEffect, useState } from "react";
import { CustomerModel } from "../../../Models/UserModel";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridSelectionModel,
  GridRowId,
} from "@mui/x-data-grid";
import "./CustomersTable.css";
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
interface CustomersTableProps {
  customers: CustomerModel[];
}

export function CustomersTable(props: CustomersTableProps): JSX.Element {
  const rows: GridRowsProp = props.customers;
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "email", headerName: "Email" },
  ];
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  async function handleDelete(customerId: GridRowId) {
    try {
      await adminService.deleteCustomer(customerId);
      notificationService.success(
        `successfully deleted customer (id:${customerId})`
      );
    } catch (err: any) {
      notificationService.error(err);
    }
  }

  return (
    <div>
      <Dialog
        style={{ height: "80vh"}}
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Warning, Deleting Customer"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to delete a customer from your database. Are you sure
            you want to delete this customer?
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
            onClick={() => navigate("/update-customer/" + selectedRows[0])}
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
