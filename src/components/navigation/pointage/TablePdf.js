import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/joy";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function TablePdf({ myDcf, data, chercheValue }) {
  return (
    <TableContainer component={Paper}>
      <Box
        sx={{
          flex: 1,
          textAlign: "center",
        }}
      >
        {" "}
        District : {myDcf.district}, commune : {myDcf.commune} et fokotany :{" "}
        {myDcf.fokotany}{" "}
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Nom</TableCell>
            <TableCell align="left">Prenom</TableCell>
            <TableCell align="left">Telephone</TableCell>
            <TableCell align="left">Sexe</TableCell>
            <TableCell align="left">Presences</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data
              .sort((a, b) => a.id - b.id)
              .filter((dataInfo) => {
                return chercheValue.toLowerCase() === " "
                  ? dataInfo
                  : (
                      dataInfo.nom +
                      dataInfo.prenom +
                      dataInfo.tel +
                      dataInfo.sexe +
                      dataInfo.presence
                    )
                      .toLowerCase()
                      .includes(chercheValue.toLowerCase());
              })
              .map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.nom}
                  </TableCell>
                  <TableCell align="left">{row.prenom}</TableCell>
                  <TableCell align="left">{row.tel}</TableCell>
                  <TableCell align="left">{row.sexe}</TableCell>
                  <TableCell align="left">{row.presence}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
