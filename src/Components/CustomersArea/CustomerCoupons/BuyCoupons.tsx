import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowsProp,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import customersService from "../../../Services/CustomersService";
import notificationService from "../../../Services/NotificationService";

function BuyCoupons(): JSX.Element {
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
  const [openBuyDialog, setOpenBuyDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCloseBuyDialog = () => {
    setOpenBuyDialog(false);
  };
  function fetchCoupons() {
    customersService
      .fetchAllCoupons()
      .then((coupons) => setCoupons(coupons))
      .catch((err) => notificationService.error(err));
  }

  async function handleBuy(couponId: GridRowId) {
    try {
      await customersService.buyCoupon(couponId);
      notificationService.success(
        `successfully buy coupon (id:${couponId})`
      );
      fetchCoupons();
    } catch (err: any) {
      notificationService.error(err);
    }
  }

  return (
    <div style={{ height: "80vh" }}>
      <Dialog
        open={openBuyDialog}
        onClose={handleCloseBuyDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Buying Coupon"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to buy a coupon. Are you sure
            you want to buy this coupon?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBuyDialog}>No!</Button>
          <Button onClick={() => handleBuy(selectedRows[0])} autoFocus>
            Buy
          </Button>
        </DialogActions>
      </Dialog>

      {selectedRows.length > 0 ? (
        <Box>
          {/* <Button
            variant="contained"
            onClick={() => navigate("/coupon-details/" + selectedRows[0])}
          >
            Details
          </Button> */}
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenBuyDialog(true)}
          >
            Buy
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

export default BuyCoupons;
