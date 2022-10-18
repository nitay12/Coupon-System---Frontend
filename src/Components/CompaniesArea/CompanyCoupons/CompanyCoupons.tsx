import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid, GridColDef, GridRowId, GridRowsProp, GridSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import companiesService from "../../../Services/CompaniesService";
import notificationService from "../../../Services/NotificationService";
import "./CompanyCoupons.css";

function CompanyCoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const rows: GridRowsProp<CouponModel> = coupons;
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Title" },
    { field: "description", headerName: "Description" },
    { field: "startDate", headerName: "Start Date" },
    { field: "endDate", headerName: "End Date" },
    { field: "category", headerName: "Category" },
    { field: "amount", headerName: "Amount" },
    { field: "price", headerName: "Price" },

  ];
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  function fetchCoupons() {
    companiesService
      .fetchCompanyCoupons()
      .then((coupons) => setCoupons(coupons))
      .catch((err) => notificationService.error(err));
  }

  async function handleDelete(couponId: GridRowId) {
    try {
      await companiesService.deleteCoupon(couponId);
      notificationService.success(
        `successfully deleted coupon (id:${couponId})`
      );
      fetchCoupons()
    } catch (err: any) {
      notificationService.error(err);
    }
  } 

  return (
    <div style={{ height: "80vh" }}>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Warning, Deleting Coupon"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to delete a coupon from your database. Are you sure
            you want to delete this coupon?
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
            onClick={() => navigate("/update-coupon/" + selectedRows[0])}
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
        style={{ height: "80vh" }}
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

export default CompanyCoupons;
