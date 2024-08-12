import React, { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Divider, Input, Stack, Typography } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import PlanComponent from "./PlanComponent";
import Navbar from "../../Navbar";

export default function Planifier() {
  const [PlanData, setPlanData] = useState([]);
  const [real, setRealiser] = useState(null);
  const [nonreal, setNonRealiser] = useState(null);
  const [chercheValue, setChercheValue] = React.useState("");

  const dataPlan = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/nonrealiser");
      setPlanData(response.data.data);
      const pourcentage = await axios.get(
        "http://localhost:8080/api/pourcentage"
      );
      console.log(pourcentage.data);
      setRealiser(pourcentage.data.pourcentageRealiser);
      setNonRealiser(pourcentage.data.pourcentageNonRealiser);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dataPlan();
  }, []);
  return (
    <Fragment>
      <Navbar />

      <Box sx={{ marginTop: "5%", marginLeft: "1%", height: "89vh" }}>
        <Stack direction="row">
          <Box>
            <Button
              variant="outlined"
              color="danger"
              sx={{ marginRight: "20px" }}
            >
              {" "}
              {nonreal}% non realiser
            </Button>
            <Button variant="outlined" color="success">
              {" "}
              {real}% realiser
            </Button>
          </Box>

          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography variant="body1" fontWeight="bold">
              FORMATION SANITAIRE NON REALISER
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
        {PlanData &&
          PlanData.sort((a, b) => a.id - b.id)
            .filter((dataInfo) => {
              return chercheValue.toLowerCase() === " "
                ? dataInfo
                : (dataInfo.formateur1 + dataInfo.formateur2 + dataInfo.nom_f)
                    .toLowerCase()
                    .includes(chercheValue.toLowerCase());
            })
            .map((item, index) => {
              return (
                <Fragment key={index}>
                  {" "}
                  <PlanComponent element={item} />
                </Fragment>
              );
            })}
      </Box>
    </Fragment>
  );
}
