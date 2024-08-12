import React, { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Divider, Input, Stack, Typography } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import Information from "./Information";
import AddFormation from "./AddFormation";
import axios from "axios";
import Navbar from "../../Navbar";

export default function Formation() {
  const [open, setOpen] = useState(false);
  const [FormationData, setFormationdata] = useState([]);
  const [chercheValue, setChercheValue] = React.useState(" ");

  const handleOpen = () => {
    setOpen(!open);
  };
  const FetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/getAllFormation"
      );
      setFormationdata(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchData();
  }, []);
  return (
    <Fragment>
      <Navbar />
      <Box sx={{ marginTop: "5%", marginLeft: "1%", height: "89vh" }}>
        <AddFormation
          open={open}
          handleOpen={handleOpen}
          FetchData={FetchData}
        />
        <Stack direction="row">
          <Box>
            <Button onClick={handleOpen}>Ajouter une FORMATION</Button>
          </Box>
          {/* {open && ( */}
          {/* ) } */}
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography variant="body1" fontWeight="bold">
              FORMATION SANITAIRE
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
        {FormationData &&
          FormationData.sort((a, b) => a.id - b.id)
            .filter((dataInfo) => {
              return chercheValue.toLowerCase() === " "
                ? dataInfo
                : (
                    dataInfo.nom_f +
                    dataInfo.prenom +
                    dataInfo.formateur1 +
                    dataInfo.formateur2
                  )
                    .toLowerCase()
                    .includes(chercheValue.toLowerCase());
            })
            .map((item, index) => {
              return (
                <Fragment key={index}>
                  {" "}
                  <Information element={item} FetchData={FetchData} />
                </Fragment>
              );
            })}
      </Box>
    </Fragment>
  );
}
