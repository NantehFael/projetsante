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
import PersonIcon from "@mui/icons-material/Person";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import { Autocomplete } from "@mui/joy";
import axios from "axios";

export default function AddFormation({ open, handleOpen, FetchData }) {
  const [inputValue, setInputValue] = React.useState("");
  const [inputValueCommune, setInputValueCommune] = React.useState("");
  const [inputValueFokotany, setInputValueFokotany] = React.useState("");
  const [datadcf, setdatadcf] = React.useState([{}]);
  const district = [];
  const CommuneSud = [];
  const FokotanySud = [];
  const [myAlldata, setMyallData] = React.useState({
    nomFormation: "",
    type: "",
    district: "",
    commune: "",
    fokotany: "",
    formateur1: "",
    formateur2: "",
    dateformation: "",
    partenaire: "",
  });
  const handleAllInput = (e) => {
    setMyallData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  datadcf.map((item) => {
    if (!district.includes(item.district)) {
      district.push(item.district);
    }
  });
  datadcf
    .filter((dataInfo) => {
      return inputValue.toLowerCase() === ""
        ? dataInfo
        : dataInfo.district.toLowerCase().includes(inputValue.toLowerCase());
    })
    .map((item) => {
      if (!CommuneSud.includes(item.commune)) {
        CommuneSud.push(item.commune);
      }
    });
  datadcf
    .filter((dataInfo) => {
      return inputValueCommune.toLowerCase() === ""
        ? dataInfo
        : dataInfo.commune
            .toLowerCase()
            .includes(inputValueCommune.toLowerCase());
    })
    .map((item) => {
      if (!FokotanySud.includes(item.fokotany)) {
        FokotanySud.push(item.fokotany);
      }
    });

  const dcfdata = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/dcfdata");
      setdatadcf(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    dcfdata();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/api/addFormation",
        myAlldata
        );
        console.log("Après la requête POST");
        handleOpen();
        FetchData();
      // dcfdata();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <Modal open={open} onClose={handleOpen}>
        <ModalDialog>
          <DialogTitle>Ajout d'une Formation</DialogTitle>
          <DialogContent>Veuillez remplir tout les champ</DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction="column">
              <Stack direction="row" spacing={3}>
                <FormControl>
                  <FormLabel>Nom de la formation</FormLabel>
                  <Input
                    autoFocus
                    name="nomFormation"
                    required
                    placeholder="Nom de la formation"
                    sx={{ width: 250 }}
                    onChange={handleAllInput}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Type</FormLabel>
                  <Input
                    autoFocus
                    name="type"
                    required
                    placeholder="Type de formation"
                    sx={{ width: 250 }}
                    onChange={handleAllInput}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Partenaire</FormLabel>
                  <Input
                    autoFocus
                    name="partenaire"
                    required
                    placeholder="Partenaire"
                    sx={{ width: 250 }}
                    onChange={handleAllInput}
                  />
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={3}>
                {" "}
                <FormControl>
                  <FormLabel>District</FormLabel>
                  <Autocomplete
                    options={district}
                    // inputValue={inputValue}
                    sx={{ width: 250 }}
                    startDecorator={<FlagCircleIcon />}
                    placeholder="District"
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);

                      setMyallData((prevState) => ({
                        ...prevState,
                        district: newInputValue,
                      }));
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Commune</FormLabel>
                  <Autocomplete
                    options={CommuneSud}
                    // inputValue={inputValue}
                    sx={{ width: 250 }}
                    startDecorator={<FlagCircleIcon />}
                    placeholder="Commune"
                    onInputChange={(event, newInputValue) => {
                      setInputValueCommune(newInputValue);

                      setMyallData((prevState) => ({
                        ...prevState,
                        commune: newInputValue,
                      }));
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Fokotany</FormLabel>
                  <Autocomplete
                    options={FokotanySud}
                    // inputValue={inputValue}
                    sx={{ width: 250 }}
                    startDecorator={<FlagCircleIcon />}
                    placeholder="Fokotany"
                    onInputChange={(event, newInputValue) => {
                      setInputValueFokotany(newInputValue);

                      setMyallData((prevState) => ({
                        ...prevState,
                        fokotany: newInputValue,
                      }));
                    }}
                  />
                </FormControl>
              </Stack>
              <Stack
                spacing={2}
                direction="row"
                sx={{ flex: 1, textAlign: "center" }}
              >
                <FormControl>
                  <FormLabel>Formateur 1</FormLabel>
                  <Input
                    required
                    startDecorator={<PersonIcon />}
                    name="formateur1"
                    placeholder="Formateur 1"
                    sx={{ width: 250 }}
                    onChange={handleAllInput}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Formateur 2</FormLabel>
                  <Input
                    required
                    name="formateur2"
                    startDecorator={<PersonIcon />}
                    placeholder="Formateur 2"
                    sx={{ width: 250 }}
                    onChange={handleAllInput}
                  />
                </FormControl>
              </Stack>
              <FormControl>
                <FormLabel>Date du début de la formation</FormLabel>
                <Input
                  required
                  type="date"
                  onChange={(e) =>
                    setMyallData((prevState) => ({
                      ...prevState,
                      dateformation: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Stack>
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
              <Button variant="outlined" color="danger" onClick={handleOpen}>
                Annuler
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
