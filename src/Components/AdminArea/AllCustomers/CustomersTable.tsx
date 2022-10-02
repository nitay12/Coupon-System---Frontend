import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CustomerModel } from "../../../Models/UserModel";

interface CustomersTableProps {
  customers: CustomerModel[];
}

export function CustomersTable(props: CustomersTableProps): JSX.Element {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          maxWidth: 650,
        }}
        aria-label="customers table"
      >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.customers.map((customer) => (
            <TableRow
              key={customer.id}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell component="th" scope="row">
                {customer.id}
              </TableCell>
              <TableCell align="right">{customer.firstName}</TableCell>
              <TableCell align="right">{customer.lastName}</TableCell>
              <TableCell align="right">{customer.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
