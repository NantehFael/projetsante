import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
// import { Autocomplete } from "@mui/joy";
import DcfTable from "./DcfTable";
import axios from "axios";
import { Box, Typography } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";

const district = ["Option 1", "Option 2"];
export default function Dcf({ openDcf, handleDcf }) {
  // const [verificationInput, setVerif] = React.useState(false);
  const [data, setdata] = React.useState([{}]);
  const [chercheValue, setChercheValue] = React.useState("")

  const [AllInput, setAllinput] = React.useState({
    district: "",
    commune: "",
    fokotany: "",
  });
  const recuper = (e) => {
    setAllinput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      AllInput.district !== "" ||
      AllInput.commune !== "" ||
      AllInput.fokotany !== ""
    ) {
      // setVerif(!verificationInput);
      try {
        await axios.post("http://localhost:8080/api/ajoutdcf", AllInput);
        await fetcData();
      } catch (error) {
        console.log(error);
      }
    }

    // handleDcf();
  };

  const fetcData = async () => {
    try {
      const dcfdata = await axios.get("http://localhost:8080/api/alldcf");
      setdata(dcfdata.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetcData();
  }, []);
  return (
    <React.Fragment>
      <Modal open={openDcf} onClose={handleDcf}>
        <ModalDialog>
          <DialogTitle>
            <Typography>
              {" "}
              Ajout Une nouvelle Ditrict , Commune et Fokotany
            </Typography>
            <Box
              sx={{
                marginLeft: "auto",
                marginRight: "0px",
              }}
            >
              <Input startDecorator={<SearchIcon />} placeholder="recherche" onChange={(e)=>setChercheValue(e.target.value)}/>
            </Box>
          </DialogTitle>
          <DialogContent>Veuillez remplir tout les champ</DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={3}>
              {" "}
              <FormControl>
                <FormLabel>District</FormLabel>
                <Input
                  name="district"
                  options={district}
                  // inputValue={inputValue}
                  sx={{ width: 250 }}
                  startDecorator={<FlagCircleIcon />}
                  placeholder="District"
                  onChange={recuper}
                  // error={verificationInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Commune</FormLabel>
                <Input
                  name="commune"
                  options={district}
                  // inputValue={inputValue}
                  sx={{ width: 250 }}
                  startDecorator={<FlagCircleIcon />}
                  placeholder="District"
                  onChange={recuper}
                  // error={verificationInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Fokotany</FormLabel>
                <Input
                  name="fokotany"
                  options={district}
                  // inputValue={inputValue}
                  sx={{ width: 250 }}
                  startDecorator={<FlagCircleIcon />}
                  placeholder="District"
                  onChange={recuper}
                  // error={verificationInput}
                />
              </FormControl>
            </Stack>
            <DcfTable fetcData={fetcData} data={data} chercheValue={chercheValue}/>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                flex: 1,
                textAlign: "center",
                alignContent: "center",
                marginTop: "5%",
              }}
            >
              <Button type="submit">Submit</Button>
              <Button variant="outlined" color="danger" onClick={handleDcf}>
                Annuler
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
