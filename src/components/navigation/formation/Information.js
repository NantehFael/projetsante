import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import images from "../../img/images.png";
import ModifFormation from "./ModifFormation";
import SuppFormation from "./SuppFormation";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Notrealise from "./Nonrealiser";
import axios from "axios";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Stack } from "@mui/joy";
import Presences from "../pointage/Presences";
import Gpdf from "../pointage/Gpdf";
import moment from "moment/moment";
import TerminerMod from "./TerminerMod";
export default function Information({ element, FetchData }) {
  const [openModiff, setOpenModiff] = React.useState(false);
  const [openSupp, setOpenSupp] = React.useState(false);
  const [Nonrealiser, openNonrealiser] = React.useState(false);
  const [myDcf, setDcf] = React.useState([]);
  const [idmodiff, setidmodif] = React.useState([]);
  const [dcfAll, setalldcf] = React.useState([]);
  const [idSupp, setIdsupp] = React.useState(null);
  const [planign, setPlanifier] = React.useState(null);
  const [openP, setP] = React.useState(false);
  const [generatepdf, setPdf] = React.useState([]);
  const [genepdf, setPdfOpen] = React.useState(false);
  const [datepres, setdatepres] = React.useState(moment().format("DD-MM-YYYY"));
  const [terminerFormation, setTerminer] = React.useState(false);
  const [terminerId, setTerminerId] = React.useState(null);
  const verif = element.date_fin_f ? true : false;
  const handleOpenPresences = () => {
    setP(!openP);
  };
  const handleNonrealiser = () => {
    openNonrealiser(!Nonrealiser);
  };
  const planifier = (id) => {
    handleNonrealiser();
    setPlanifier(id);
  };
  const handleSupp = () => {
    setOpenSupp(!openSupp);
  };
  const SuppForma = (id) => {
    setIdsupp(id);
    handleSupp();
  };
  const handleModif = () => {
    setOpenModiff(!openModiff);
  };
  const modificationid = async (id) => {
    if (id) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/getOne/${id}`
        );
        setidmodif(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
      handleModif();
    }
  };
  const dcfFetch = async () => {
    if (element.dcf_f) {
      try {
        const responseDcf = await axios.get(
          `http://localhost:8080/api/onedcf/${element.dcf_f}`
        );
        setDcf(responseDcf.data.data[0]);
        console.log(responseDcf.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const openPdf = () => {
    setPdfOpen(!genepdf);
  };
  const handleOpenTerminer = () => {
    setTerminer(!terminerFormation);
  };
  const terminer = async (id) => {
    setTerminerId(id);
    handleOpenTerminer();
  };
  const handleOpenPdf = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/generepdf/${element.dcf_f}`,
        {
          params: { datepres },
        }
      );
      setPdf(response.data.data);
      openPdf();
    } catch (error) {
      console.log(error);
    }
  };
  const changeFormat = (chg) => {
    const coupe = chg.split("-");
    return coupe[2] +'-'+ coupe[1] + '-'+ coupe[0]
  };
  React.useEffect(() => {
    dcfFetch();
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
          <Stack
            direction="row"
            spacing={2}
            sx={{
              marginLeft: "auto",
              marginRight: "0px",
            }}
          >
            <Button
              variant="solid"
              color="success"
              onClick={handleOpenPresences}
              disabled={verif}
            >
              Faire la presence
            </Button>
            <Button
              variant="solid"
              color="neutral"
              endDecorator={<PictureAsPdfIcon />}
              onClick={handleOpenPdf}
            >
              Generer pdf
            </Button>
          </Stack>
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
              <Typography fontWeight="lg">
                {changeFormat(element.date_debut_f)}{" "}
              </Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Date de Fin
              </Typography>
              <Typography fontWeight="lg">
                {element.date_fin_f ? element.date_fin_f : "en cours"}{" "}
              </Typography>
            </div>
          </Sheet>
          <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
            <Button
              variant="outlined"
              color="success"
              onClick={() => modificationid(element.id)}
            >
              Modiffier
            </Button>
            <Button
              variant="outlined"
              color="danger"
              endDecorator={<DeleteForever />}
              onClick={() => SuppForma(element.id)}
            >
              Supprimer
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => planifier(element.id)}
              disabled={verif}
            >
              Non réaliser
            </Button>
            <Button
              variant="solid"
              color="primary"
              onClick={() => terminer(element.id)}
              disabled={verif}
            >
              Terminer
            </Button>
          </Box>
        </CardContent>
        {openModiff && (
          <ModifFormation
            openModif={openModiff}
            handleModif={handleModif}
            idmodiff={idmodiff}
            myDcf={myDcf}
            FetchData={FetchData}
            dcfFetch={dcfFetch}
          />
        )}
        {openSupp && (
          <SuppFormation
            openSupp={openSupp}
            handleSupp={handleSupp}
            idSupp={idSupp}
            FetchData={FetchData}
          />
        )}
        {Nonrealiser && (
          <Notrealise
            Nonrealiser={Nonrealiser}
            handleNonrealiser={handleNonrealiser}
            planign={planign}
            FetchData={FetchData}
          />
        )}
        {openP && (
          <Presences
            openP={openP}
            handleOpenPresences={handleOpenPresences}
            element={element}
            myDcf={myDcf}
          />
        )}
        {genepdf && (
          <Gpdf
            openPdf={openPdf}
            genepdf={genepdf}
            element={element}
            myDcf={myDcf}
          />
        )}
        {terminerFormation && (
          <TerminerMod
            terminerFormation={terminerFormation}
            handleOpenTerminer={handleOpenTerminer}
            terminerId={terminerId}
            FetchData={FetchData}
          />
        )}
      </Card>
    </Box>
  );
}
