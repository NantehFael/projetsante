import { AspectRatio, Box, Card, CardContent, Sheet, Typography } from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";
import images from "../../img/images.png";


function PlanComponent({ element }) {
  const [myDcf, setDcf] = useState([]);
  const fetchDcf = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/onedcf/${element.dcf_f}`
    );
    setDcf(response.data.data[0]);
  };
  useEffect(() => {
    fetchDcf();
  }, []);
  return (
    <Box
      sx={{
        marginTop: "1%",
        width: "100%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
      }}
    >
      <Card
        orientation="horizontal"
        sx={{
          width: "100%",
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          // make the card resizable for demo
          //   overflow: 'auto',
          //   resize: 'horizontal',
        }}
      >
        <AspectRatio maxHeight={182} sx={{ minWidth: 182 }}>
          <img
            src={images}
            style={{ maxWidth: "100%", height: "100%", objectFit: "cover" }}
            // srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
            {element.nom_f}
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            Distrct: {myDcf.district}, commune : {myDcf.commune} , fokotany :{" "}
            {myDcf.fokotany}
          </Typography>
          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 2,
              "& > div": { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Formateur
              </Typography>
              <Typography fontWeight="lg">{element.formateur1} </Typography>
              <Typography fontWeight="lg">{element.formateur2} </Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Date du début
              </Typography>
              <Typography fontWeight="lg">{element.date_debut_f} </Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Date de Fin
              </Typography>
              <Typography fontWeight="lg">Non realiser</Typography>
            </div>
          </Sheet>
          {/* <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
           
          </Box> */}
        </CardContent>
      </Card>
    </Box>
  );
}

export default PlanComponent;
