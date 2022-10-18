import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Input,
} from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useState } from "react";
import { useForm } from "react-hook-form";
import moment, {Moment} from "moment"
import CouponModel from "../../../Models/CouponModel";
import adminService from "../../../Services/AdminService";
import companiesService from "../../../Services/CompaniesService";
import notificationService from "../../../Services/NotificationService";

const CreateCoupon = (): JSX.Element => {

    const [startDate, setStartDate] = useState<Moment | null>(
        moment(),
      );
    
      const handleStartDateChange = (newValue: Moment | null) => {
        setStartDate(newValue);
      };
    const [endDate, setEndDate] = useState<Moment | null>(
        moment(),
      );
    
      const handleEndDateChange = (newValue: Moment | null) => {
        setEndDate(newValue);
      };
    

    const { register, handleSubmit, formState } = useForm<CouponModel>();

  async function send(coupon: CouponModel) {
    try {
      const createdCoupon: CouponModel = await companiesService.createCoupon(
        coupon
      );
      notificationService.success(
        `${createdCoupon.title} created successfully (id:${createdCoupon.id})`
      );
    } catch (err: any) {
      notificationService.error(err);
    }
  }
  return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="CreateCoupon">
      <Box sx={{ minWidth: 120 }}>
        <FormControl variant="standard" fullWidth sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
          <Select>
            <MenuItem value="FOOD">Food</MenuItem>
            <MenuItem value="ELECTRICITY">Electricity</MenuItem>
            <MenuItem value="RESTAURANT">Restaurant</MenuItem>
            <MenuItem value="VACATION">Vacation</MenuItem>
          </Select>
          <TextField
            type="text"
            label="Title"
            variant="standard"
            {...register("title")}
          />
          <TextField
            type="text"
            label="Description"
            variant="standard"
            {...register("description")}
          />
          <MobileDatePicker
          label="Start Date"
          inputFormat="MM-DD-YYYY"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
          {...register("startDate")}
        />
          <MobileDatePicker
          label="End Date"
          inputFormat="MM-DD-YYYY"
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
          {...register("endDate")}

        />
        <TextField
            type="number"
            label="Amount"
            variant="standard"
            {...register("amount")}
          />
        <TextField
            type="number"
            label="Price"
            variant="standard"
            {...register("price")}
          />
        <TextField
            type="text"
            label="Image URL"
            variant="standard"
            {...register("image")}
          />

          <Button onClick={handleSubmit(send)}>Create</Button>
        </FormControl>
      </Box>
    </div>
    </LocalizationProvider>
  );
};
export default CreateCoupon;
