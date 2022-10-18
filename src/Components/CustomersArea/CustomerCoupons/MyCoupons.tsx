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

function MyCoupons(): JSX.Element {
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
  const navigate = useNavigate();

  function fetchCoupons() {
    customersService
      .fetchCustomerCoupons()
      .then((coupons) => setCoupons(coupons))
      .catch((err) => notificationService.error(err));
  }

  return (
    <div style={{ height: "80vh" }}>
      {selectedRows.length > 0 ? (
        <Box>
          <Button
            variant="contained"
            onClick={() => navigate("/coupon-details/" + selectedRows[0])}
          >
            Details
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

export default MyCoupons;
