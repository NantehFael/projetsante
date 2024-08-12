import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import axios from "axios";

export default function ModiffDcf({ open, closeModiff, fetcData, donne,id }) {
  const [Madata, setMadata] = useState(donne);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(Madata.district !=='' || Madata.commune !== '' || Madata.fokotany !== '' || id !== null){
      try {
        await axios.post(`http://localhost:8080/api/modifdcf/${id}`, Madata)
        await fetcData();
        closeModiff();
      } catch (error) {
        console.log(error)
      }
    }
  
  };

  return (
    <Modal open={open} onClose={closeModiff}>
      <ModalDialog>
        <DialogTitle>
          <Typography> Modiffier un Ditrict , Commune et Fokotany</Typography>
          <Box
            sx={{
              marginLeft: "auto",
              marginRight: "0px",
            }}
          ></Box>
        </DialogTitle>
        <DialogContent>Veuillez remplir tout les champ</DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={3}>
            {" "}
            <FormControl>
              <FormLabel>District</FormLabel>
              <Input
                name="district"
                value={Madata && Madata.district}
                sx={{ width: 250 }}
                startDecorator={<FlagCircleIcon />}
                placeholder="District"
                onChange={(e) => {
                  setMadata((prevState) => ({
                    ...prevState,
                    district : e.target.value,
                  }));
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Commune</FormLabel>
              <Input
                name="commune"
                value={ Madata && Madata.commune}
                sx={{ width: 250 }}
                startDecorator={<FlagCircleIcon />}
                placeholder="commune"
                onChange={(e) => {
                  setMadata((prevState) => ({
                    ...prevState,
                    commune : e.target.value,
                  }));
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Fokotany</FormLabel>
              <Input
                name="fokotany"
                value={ Madata && Madata.fokotany}
                sx={{ width: 250 }}
                startDecorator={<FlagCircleIcon />}
                placeholder="Fokotany"
                onChange={(e) => {
                  setMadata((prevState) => ({
                    ...prevState,
                    fokotany : e.target.value,
                  }));
                }}
              />
            </FormControl>
          </Stack>
          <Button type="submit" color="neutral" sx={{ marginTop: "2%" }}>
            {" "}
            OK{" "}
          </Button>
        </form>
      </ModalDialog>
    </Modal>
  );
}
