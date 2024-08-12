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
import React, { useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import TablePdf from "./TablePdf";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";
import moment from "moment";
import axios from "axios";

export default function Gpdf({ openPdf, genepdf, myDcf, element }) {
  const [temp, setTemp] = React.useState(null);
  const componentPDF = useRef();
  const [data, setData] = React.useState([]);
  const [value, setValue] = React.useState(
    dayjs(moment().format("YYYY-MM-DD"))
  );
  const [FullDAte, setFullDate] = React.useState(moment().format("DD-MM-YYYY"));
  const [numeroSemaineRecherchee, setweekValue] = React.useState(
    moment().isoWeek()
  );
  const [chercheValue, setChercheValue] = React.useState(" ");

  const [anne, setYearValue] = React.useState(moment().year());

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "presence",
  });
  const Fetchdat = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/generepdf/${element.dcf_f}`,
        {
          params: { FullDAte },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Fetchdat();
  }, [FullDAte]);
  console.log(FullDAte);
  return (
    <div>
      <Modal open={genepdf} onClose={openPdf}>
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
              <Stack direction="row">
                <Button
                  variant="solid"
                  sx={{ marginRight: "2%" }}
                  color="success"
                  startDecorator={<CloudDoneIcon />}
                  onClick={generatePDF}
                >
                  Telecharger
                </Button>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={value}
                    onChange={(newValue) => {
                      setFullDate(
                        `${newValue.date()}-${
                          newValue.month() + 1
                        }-${newValue.year()}`
                      );
                      setValue(newValue);
                      setweekValue(newValue.week());
                      setYearValue(newValue.year());
                    }}
                  />
                </LocalizationProvider>
                <Input
                  placeholder="Personnel"
                  startDecorator={<SearchIcon />}
                  endDecorator={<Button>recherche</Button>}
                  sx={{
                    "--Input-focusedThickness": "1px",
                    marginLeft: "5%",
                  }}
                  onChange={(e) => setChercheValue(e.target.value)}

                />
              </Stack>
            </Box>
          </DialogTitle>
          <Divider></Divider>
          <DialogContent ref={componentPDF}>
            {" "}
            <TablePdf myDcf={myDcf} data={data} chercheValue={chercheValue} />
          </DialogContent>
        </ModalDialog>
      </Modal>
    </div>
  );
}
