import React from "react";
import Box from "@mui/material/Box";
import { Button, Divider, Input, Stack, Typography } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import PersonnelTable from "./PersonnelTable";
import AddPersonnel from "./AddPersonnel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Dcf from "./Dcf";
import axios from "axios";
import { Fragment } from "react";
import Navbar from "../../Navbar";
export default function Personnel() {
  const [open, setOpen] = React.useState(false);
  const [openDcf, setDcf] = React.useState(false);
  const [Personneldata, setPersonneldata] = React.useState([{}]);
  const [chercheValue, setChercheValue] = React.useState(" ");

  const handleDcf = () => {
    setDcf(!openDcf);
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  const FetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/personnel");
      setPersonneldata(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    FetchData();
  }, []);
  return (
    <Fragment>
      <Navbar />

      <Box sx={{ marginTop: "5%", marginLeft: "1%", height: "89vh" }}>
        <Stack direction="row">
          <Box>
            <Button onClick={handleOpen} startDecorator={<AccountCircleIcon />}>
              Ajouter un Personnel
            </Button>
          </Box>
          <Box sx={{ marginLeft: "2%" }}>
            <Button startDecorator={<AddCircleIcon />} onClick={handleDcf}>
              DCF
            </Button>
          </Box>
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography variant="body1" fontWeight="bold">
              TOUS LES PERSONNEL
            </Typography>{" "}
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              marginRight: "0px",
            }}
          >
            <Input
              placeholder="formation"
              startDecorator={<SearchIcon />}
              endDecorator={<Button>recherche</Button>}
              sx={{
                "--Input-focusedThickness": "1px",
              }}
              onChange={(e) => setChercheValue(e.target.value)}
            />
          </Box>
        </Stack>
        <Divider sx={{ marginTop: "1%" }} orientation="horizontal"></Divider>
        <PersonnelTable
          Personneldata={Personneldata}
          FetchData={FetchData}
          chercheValue={chercheValue}
        />
        {open && (
          <AddPersonnel
            open={open}
            handleOpen={handleOpen}
            FetchData={FetchData}
          />
        )}
        <Dcf handleDcf={handleDcf} openDcf={openDcf} />
      </Box>
    </Fragment>
  );
}
