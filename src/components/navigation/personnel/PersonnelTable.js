import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import ModiffPersonnel from "./ModiffPersonnel";
import SuppPersonel from "./SuppPersonnel";
import axios from "axios";

export default function PersonnelTable({
  Personneldata,
  FetchData,
  chercheValue,
}) {
  const [open, setOpen] = React.useState(false);
  const [openSupp, setOpenSupp] = React.useState(false);
  const [id, setid] = React.useState(null);
  const [dcf_id, setdcf_id] = React.useState({});
  const [data_a_modifier, setdata_a_modiffier] = React.useState({});
  const [Suppid, setSupp_id] = React.useState(null);

  const x = () => {
    setOpen(!open);
  };
  const handleModiff = async (idmodif, dcfid) => {
    try {
      const response_data_modiff = await axios.get(
        `http://localhost:8080/api/onepers/${idmodif}`
      );
      const response_dcf_modiff = await axios.get(
        `http://localhost:8080/api/onedcf/${dcfid}`
      );
      setdata_a_modiffier(response_data_modiff.data.data[0]);
      setdcf_id(response_dcf_modiff.data.data[0]);
    } catch (error) {
      console.log(error);
    }
    x();
    setid(idmodif);
  };
  const handleSupp = (id_id) => {
    setSupp_id(id_id);
    closeSupp();
  };
  const closeSupp = () => {
    setOpenSupp(!openSupp);
  };
  return (
    <Box sx={{ width: "100%", marginTop: "1%" }}>
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
              <th style={{ width: "var(--Table-firstColumnWidth)" }}>Im</th>
              {/* <th style={{ width: 200 }}>Im</th> */}
              <th style={{ width: 200 }}>Nom</th>
              <th style={{ width: 200 }}>Prenom</th>
              <th style={{ width: 200 }}>Fonction</th>
              <th style={{ width: 200 }}>Titre</th>
              <th style={{ width: 200 }}>Categorie</th>
              <th style={{ width: 200 }}>Email</th>
              <th style={{ width: 200 }}>Tel</th>
              <th style={{ width: 200 }}>Sexe</th>
              <th
                aria-label="last"
                style={{ width: "var(--Table-lastColumnWidth)" }}
              />
            </tr>
          </thead>
          <tbody>
            {Personneldata &&
              Personneldata.sort((a, b) => a.id - b.id)
                .filter((dataInfo) => {
                  return chercheValue.toLowerCase() === " "
                    ? dataInfo
                    : (
                        dataInfo.im +
                        dataInfo.nom +
                        dataInfo.prenom +
                        dataInfo.fonction +
                        dataInfo.titre +
                        dataInfo.categorie +
                        dataInfo.email +
                        dataInfo.tel +
                        dataInfo.sexe
                      )
                        .toLowerCase()
                        .includes(chercheValue.toLowerCase());
                })
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.im}</td>
                    <td>{item.nom}</td>
                    <td>{item.prenom}</td>
                    <td>{item.fonction}</td>
                    <td>{item.titre}</td>
                    <td>{item.categorie}</td>
                    <td>{item.email}</td>
                    <td>{item.tel}</td>
                    <td>{item.sexe}</td>
                    <td>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          size="sm"
                          variant="outlined"
                          color="neutral"
                          onClick={() => handleModiff(item.id, item.dcf)}
                        >
                          Modiffier
                        </Button>
                        <Button
                          size="sm"
                          variant="soft"
                          color="danger"
                          onClick={() => handleSupp(item.id)}
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
      {open && (
        <ModiffPersonnel
          open={open}
          x={x}
          id={id}
          // dcf_id={dcf_id}
          data_a_modifier={data_a_modifier}
          dcf_id={dcf_id}
          Personneldata={FetchData}
        />
      )}
      {openSupp && (
        <SuppPersonel
          open={openSupp}
          handleSupp={closeSupp}
          Personneldata={FetchData}
          Suppid={Suppid}
        />
      )}
    </Box>
  );
}
