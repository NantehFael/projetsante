import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import ModiffPersonnel from "./ModiffPersonnel";
import SuppPersonel from "./SuppPersonnel";
import axios from "axios";
import ModiffDcf from "./ModiffDcf";
import SupprDcf from "./SupprDcf";

export default function DcfTable({ data, fetcData, chercheValue }) {
  const [openModifdcf, setOpenModiffdcf] = React.useState(false);
  const [SuppDcf, setSuppDcf] = React.useState(false);
  const [id, setid] = React.useState("");
  const [donne, setdata] = React.useState([]);
  const modiffDcf = async (id) => {
    if(id !== null){
      try {
      const infoId = await axios.get(`http://localhost:8080/api/onedcf/${id}`);
      setdata(infoId.data.data[0]);
      setid(id);
      setOpenModiffdcf(!openModifdcf);
    } catch (error) {
      console.log(error);
    }
    }
    
  };
  const closeModiff = () => {
    setOpenModiffdcf(!openModifdcf);
  };
  const handleSupp = (id) => {
    setSuppDcf(!SuppDcf);
    setid(id)
  };
  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "1%",
        overflowY: "scroll",
        maxHeight: "250px",
      }}
    >
      <Typography level="body-sm" textAlign="center" sx={{ pb: 2 }}>
        {/* ← Scroll direction → */}
      </Typography>
      <Sheet
        variant="outlined"
        sx={{
          "--TableCell-height": "40px",
          // the number is the amount of the header rows.
          "--TableHeader-height": "calc(1 * var(--TableCell-height))",
          "--Table-firstColumnWidth": "80px",
          "--Table-lastColumnWidth": "144px",
          // background needs to have transparency to show the scrolling shadows
          "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
          "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
          overflow: "auto",
          background: (theme) =>
            `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
          backgroundSize:
            "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "local, local, scroll, scroll",
          backgroundPosition:
            "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
          backgroundColor: "background.surface",
        }}
      >
        <Table
          borderAxis="bothBetween"
          stripe="odd"
          hoverRow
          sx={{
            "& tr > *:first-child": {
              position: "sticky",
              left: 0,
              boxShadow: "1px 0 var(--TableCell-borderColor)",
              bgcolor: "background.surface",
            },
            "& tr > *:last-child": {
              position: "sticky",
              right: 0,
              bgcolor: "var(--TableCell-headBackground)",
            },
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "var(--Table-firstColumnWidth)" }}>id</th>
              <th style={{ width: 200 }}>District</th>
              <th style={{ width: 200 }}>Commune</th>
              <th style={{ width: 200 }}>Fokotany</th>
              <th
                aria-label="last"
                style={{ width: "var(--Table-lastColumnWidth)" }}
              />
            </tr>
          </thead>
          <tbody>
            {data &&
              data
                .sort((a, b) => a.id - b.id)
                .filter((dataInfo) => {
                  return chercheValue.toLowerCase() === " "
                    ? dataInfo
                    : (
                        dataInfo.district +
                        dataInfo.commune +
                        dataInfo.fokotany
                      )
                        .toLowerCase()
                        .includes(chercheValue.toLowerCase());
                })
                .map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.district}</td>
                    <td>{row.commune}</td>
                    <td>{row.fokotany}</td>
                    <td>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          size="sm"
                          variant="outlined"
                          color="neutral"
                          onClick={() => modiffDcf(row.id)}
                        >
                          Modiffier
                        </Button>
                        <Button
                          size="sm"
                          variant="soft"
                          color="danger"
                          onClick={()=>handleSupp(row.id)}
                        >
                          Supprimer
                        </Button>
                      </Box>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </Sheet>
      {openModifdcf && (
        <ModiffDcf
          open={openModifdcf}
          id={id}
          closeModiff={closeModiff}
          fetcData={fetcData}
          donne={donne}
        />
      )}
      {SuppDcf && (
        <SupprDcf
          SuppDcf={SuppDcf}
          handleSupp={handleSupp}
          id={id}
          fetcData={fetcData}
        />
      )}
    </Box>
  );
}
