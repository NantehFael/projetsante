import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import axios from "axios";

export default function Notrealise({
  Nonrealiser,
  handleNonrealiser,
  planign,
  FetchData,
}) {
  //   const [open, setOpen] = React.useState(false);
  const handlePlanifier = async () => {
    try {
      await axios.post(`http://localhost:8080/api/planifier/${planign}`);
      console.log("non realiser executer")
      FetchData();
      handleNonrealiser();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {/* <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </Button> */}
      <Modal open={Nonrealiser} onClose={handleNonrealiser}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              top: "unset",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: "none",
              maxWidth: "unset",
            },
          })}
        >
          <Typography id="nested-modal-title" level="h2">
            Est-ce que vous ête sûr que cette formation n'est pas realiser ?
          </Typography>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            Cette formation sera stocker parmis le Formation non realiser!
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row-reverse" },
            }}
          >
            <Button variant="solid" color="primary" onClick={handlePlanifier}>
              Non realiser
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={handleNonrealiser}
            >
              annuler
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
