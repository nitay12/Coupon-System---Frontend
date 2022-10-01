import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CompanyModel } from "../../Models/UserModel";

interface CompaniesTableProps {
  companies: CompanyModel[];
}

export function CompaniesTable(props: CompaniesTableProps): JSX.Element {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          maxWidth: 650,
        }}
        aria-label="companies table"
      >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.companies.map((company) => (
            <TableRow
              key={company.id}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell component="th" scope="row">
                {company.id}
              </TableCell>
              <TableCell align="right">{company.name}</TableCell>
              <TableCell align="right">{company.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
