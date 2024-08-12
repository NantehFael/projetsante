import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import axios from "axios";

export default function SupprDcf({ SuppDcf, handleSupp, id, fetcData }) {
  const suppFunc = async () => {
    try {
      await axios.post(`http://localhost:8080/api/suppdcf/${id}`);
      fetcData();
      handleSupp();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <Modal open={SuppDcf} onClose={handleSupp}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            est-ce que vous sûr de vouloir supprimer cette formation ?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={suppFunc}>
              Supprimer
            </Button>
            <Button variant="plain" color="neutral" onClick={handleSupp}>
              Annuler
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
