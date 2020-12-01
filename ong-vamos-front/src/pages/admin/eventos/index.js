import React, { useEffect, useState } from "react";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import RecipeReviewCard from "../../../components/card"
import Button from '@material-ui/core/Button';


import MenuAdmin from "../../../components/menuAdmin";
import Footer from "../../../components/footerAdmin";
import api from '../../../services/api'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  title: {
    flexGrow: 1,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "45px 45px 0 45px"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "0 13.5rem 28px"
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E6332F",
    },
  },
});

export default function Eventos() {
  const classes = useStyles();
  const [eventos, setEventos] = useState([])
  
  useEffect(() => {
    api.get('eventos').then(results => {
      setEventos(results.data)
    }).catch(error => console.log(error))
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <MenuAdmin title="Eventos" />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <h1 className={classes.titleContainer}>Listagem de Eventos</h1>
          <div className={classes.buttonContainer}>
            <Button variant="contained" 
              color="primary" 
              type="submit"
              href="/admin/eventos/cadastrar">
              Novo Evento
            </Button>
          </div>
          <Container maxWidth="lg" className={classes.container}>
              <RecipeReviewCard
                eventos={eventos}
              />
          </Container>
            <Box pt={4}>
              <Footer />
            </Box>
        </main>
      </div>
    </ThemeProvider>
  );
}
