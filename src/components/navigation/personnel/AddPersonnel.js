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

export default function AddPersonnel({ open, handleOpen, FetchData }) {
  const [inputValue, setInputValue] = React.useState("");
  const [inputValueCommune, setInputValueCommune] = React.useState("");
  const [inputValueFokotany, setInputValueFokotany] = React.useState("");
  const [datadcf, setdatadcf] = React.useState([{}]);
  const district = [];
  const CommuneSud = [];
  const FokotanySud = [];
  const [mydata, setmydata] = React.useState({
    im: "",
    nom: "",
    prenom: "",
    fonction: "",
    titre: "",
    categorie: "",
    email: "",
    tel: "",
    sexe: "",
    district: "",
    commune: "",
    fokotany: "",
  });
  const handleAllInput = (e) => {
    setmydata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mydata) {
      try {
        await axios.post("http://localhost:8080/api/addpersonnel", mydata);
      } catch (error) {
        console.log(error);
      }
    }
    FetchData();
    handleOpen();
  };
  return (
    <React.Fragment>
      <Modal open={open} onClose={handleOpen}>
        <ModalDialog>
          <DialogTitle>Ajout d'un Personnel</DialogTitle>
          <DialogContent>Veuillez remplir tout les champ</DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction="column">
              <Stack direction="row" spacing={3}>
                <FormControl>
                  <FormLabel>IM</FormLabel>
                  <Input
                    autoFocus
                    name="im"
                    required
                    placeholder="IM"
                    sx={{ width: 250 }}
                    onChange={handleAllInput}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Nom</FormLabel>
                  <Input
                    autoFocus
                    required
                    name="nom"
                    placeholder="Nom"
                    sx={{ width: 250 }}
                    onChange={handleAllInput}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Prenom</FormLabel>
                  <Input
                    autoFocus
                    required
                    placeholder="Prenom"
                    sx={{ width: 250 }}
                    onChange={handleAllInput}
                    name="prenom"
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={3}>
                <FormControl>
                  <FormLabel>Fonction</FormLabel>
                  <Input
                    autoFocus
                    required
                    placeholder="Fonction"
                    sx={{ width: 250 }}
                    onChange={handleAllInput}
                    name="fonction"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Titre</FormLabel>
                  <Input
                    autoFocus
                    required
                    placeholder="Titre"
                    sx={{ width: 250 }}
                    onChange={handleAllInput}
                    name="titre"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Catégorie</FormLabel>
                  <Input
                    autoFocus
                    required
                    placeholder="Categorie"
                    sx={{ width: 250 }}
                    onChange={handleAllInput}
                    name="categorie"
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={3}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    autoFocus
                    required
                    placeholder="Email"
                    sx={{ width: 250 }}
                    onChange={handleAllInput}
                    name="email"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Tel</FormLabel>
                  <Input
                    autoFocus
                    required
                    placeholder="Tel"
                    sx={{ width: 250 }}
                    onChange={handleAllInput}
                    name="tel"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Sexe</FormLabel>
                  <Autocomplete
                    options={["M", "F"]}
                    // inputValue={inputValue}
                    sx={{ width: 250 }}
                    placeholder="Sexe"
                    onInputChange={(event, newInputValue) => {
                      setmydata((prevState) => ({
                        ...prevState,
                        sexe: newInputValue,
                      }));
                    }}
                    name="sexe"
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
                      setmydata((prevState) => ({
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
                      setmydata((prevState) => ({
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
                      setmydata((prevState) => ({
                        ...prevState,
                        fokotany: newInputValue,
                      }));
                    }}
                  />
                </FormControl>
              </Stack>
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
