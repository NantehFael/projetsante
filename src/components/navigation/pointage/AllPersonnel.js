import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Button } from "@mui/joy";
import CheckIcon from "@mui/icons-material/Check";
const columns = [
  { id: "nom", label: "Nom", minWidth: 170 },
  { id: "prenom", label: "Prenom", minWidth: 100 },
  {
    id: "Im",
    label: "Im",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Fonction",
    label: "Fonction",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Titre",
    label: "Titre",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Categorie",
    label: "Categorie",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 170,
    align: "right",
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

export default function AllPersonnel({
  element,
  hadleAbs,
  temp,
  chercheValue,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRow] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const FetchPersonnel = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/DcfPersonnel/${element.dcf_f}`
      );
      setRow(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePresences = async (im) => {
    try {
      await axios.post(`http://localhost:8080/api/doPresences/${im}`);
      hadleAbs(im);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    FetchPersonnel();
  }, []);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows
              .sort((a, b) => a.id - b.id)
              .filter((dataInfo) => {
                return chercheValue.toLowerCase() === " "
                  ? dataInfo
                  : (
                      dataInfo.nom +
                      dataInfo.prenom +
                      dataInfo.im +
                      dataInfo.fonction +
                      dataInfo.categorie +
                      dataInfo.titre +
                      dataInfo.fonction 
                    )
                      .toLowerCase()
                      .includes(chercheValue.toLowerCase());
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="left">{row.nom}</TableCell>
                    <TableCell align="left">{row.prenom}</TableCell>
                    <TableCell align="left">{row.im}</TableCell>
                    <TableCell align="left">{row.fonction}</TableCell>
                    <TableCell align="left">{row.titre}</TableCell>
                    <TableCell align="left">{row.categorie}</TableCell>
                    <TableCell align="left">
                      <Button
                        variant="soft"
                        color={temp === row.im ? "danger" : "success"}
                        startDecorator={<CheckIcon />}
                        onClick={() => handlePresences(row.im)}
                      >
                        {temp === row.im ? "ABS" : "present"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
