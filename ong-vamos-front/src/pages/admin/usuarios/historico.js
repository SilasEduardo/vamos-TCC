import React from "react";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useAxiosGet from "../../../Hooks/httpRequest"
import { useParams } from 'react-router-dom'

import MenuAdmin from "../../../components/menuAdmin";
import Footer from "../../../components/footerAdmin";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E6332F",
    },
  },
});




export default function Dashboard() {
  const classes = useStyles();
  const { idAssistido } = useParams()
  const listEstadoCivil = useAxiosGet(`https://ong-vamos.herokuapp.com/api/v1/assistidos/${idAssistido}`)
  // console.log(listEstadoCivil)
  const assist = listEstadoCivil.data
  // console.log(assist)
  let novoAssis
  let dataCadastro
  let nomee
  let dataTotal
  let projAtual
  let idd 
  console.log(assist)
  if (assist != null) {
    novoAssis = assist
    dataCadastro = novoAssis.createdAt
    nomee = novoAssis.nome

    projAtual = assist.assisProj[0].nome
    idd = assist.id

    let dat = novoAssis.createdAt
    let ano = dataCadastro.substring(0,4)
    let mes =dataCadastro.substring(5,7)
    let dia = dataCadastro.substring(8,10)

    dataTotal = `${dia}/${mes}/${ano}`
    
    console.log(projAtual)
  }


  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <MenuAdmin />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item sm={12} >
                <Paper className={classes.paper}>
                  <h2>Histórico de {nomee}</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <h3>Registro: {idd}</h3>
                      <h3>Status: Ativo</h3>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Paper className={classes.paper}>
                        <h3>Data da Ocorrencia: {dataTotal}</h3>
                        <h3>Tipo ocorrencia: Projeto</h3>
                        <h3>Projeto: {projAtual}</h3>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Footer />
            </Box>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}
