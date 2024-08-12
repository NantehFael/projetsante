import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  styled,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/images.png";

const Img = styled("img")({
  display: "block",
  margin: "auto",
  maxWidth: "80%",
  maxHeight: "80%",
});

const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f0f0f0", // Change background color as needed
};

const paperstyle = {
  padding: "20px",
  width: "400px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#fff",
};

const inputStyle = {
  marginBottom: "20px",
};

const buttonStyle = {
  width: "100%",
};

export default function LoginPage() {
  const [login, setLogin] = useState({
    email: "",
    motsdepasse: "",
  });

  const handleChange = (e) => {
    setLogin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(login);
    if (login.email === "admin@gmail.com" && login.motsdepasse === "admin") {
      navigate("/formation");
    }
  };

  return (
    <Box style={containerStyle}>
      <Box style={paperstyle}>
        <Stack direction="column" spacing={2} align="center">
          <Img alt="Logo" src={logo} />
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Connexion
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl sx={inputStyle} variant="outlined" fullWidth>
              <FormLabel>Email</FormLabel>
              <Input
                required
                placeholder="Entrez votre email"
                name="email"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={inputStyle} variant="outlined" fullWidth>
              <FormLabel>Mot de passe</FormLabel>
              <Input
                required
                type="password"
                placeholder="Entrez votre mot de passe"
                name="motsdepasse"
                onChange={handleChange}
              />
            </FormControl>
            <Button variant="solid" color="success" type="submit" sx={buttonStyle}>
              Connecter
            </Button>
          </form>
        </Stack>
      </Box>
    </Box>
  );
}
