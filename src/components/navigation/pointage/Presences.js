import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AllPersonnel from "./AllPersonnel";

export default function Presences({
  openP,
  handleOpenPresences,
  element,
  myDcf,
}) {
  const [temp, setTemp]= React.useState(null)
  const [chercheValue, setChercheValue] = React.useState(" ");

const hadleAbs = (im)=>{{
  setTemp(im)
}}
  return (
    <div>
      <Modal open={openP} onClose={handleOpenPresences}>
        <ModalDialog layout="fullscreen">
          <ModalClose />
          <DialogTitle> Nom de la formation : {element.nom_f}</DialogTitle>
          <DialogTitle>
            {" "}
            Les formateurs : {element.formateur1} et {element.formateur2}{" "}
          </DialogTitle>
          <DialogTitle>
            {" "}
            District : {myDcf.district}, commune : {myDcf.commune} et fokotany :{" "}
            {myDcf.fokotany}{" "}
          <Box
            sx={{
              marginLeft: "auto",
              marginRight: "0px",
            }}
          >
            <Input
              placeholder="Personnel"
              startDecorator={<SearchIcon />}
              endDecorator={<Button>recherche</Button>}
              sx={{
                "--Input-focusedThickness": "1px",
              }}
            onChange={(e) => setChercheValue(e.target.value)}

            />
          </Box>
          </DialogTitle>
          <Divider></Divider>
          <DialogContent>
            {" "}
            <AllPersonnel element={element} hadleAbs={hadleAbs} temp={temp} chercheValue={chercheValue} />
          </DialogContent>
        </ModalDialog>
      </Modal>
    </div>
  );
}
