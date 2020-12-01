import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chart } from "react-google-charts";
import { ThemeProvider, createMuiTheme, } from "@material-ui/core/styles"

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import MenuAdmin from "../../../components/menuAdmin";
import Footer from "../../../components/footerAdmin";

import api from "../../../services/api";
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
  const [ projects, setProjects ] = useState([]);

  const dataProjects = projects.map(project => [project.nome, project.total]);
  dataProjects.unshift(['Projetos', 'Popularity']);

  useEffect(() => {
    async function loadProjects(){
      const response = await api.get("/projetos");
      setProjects(response.data);
    }
    loadProjects();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <MenuAdmin/>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Paper className={classes.paper}>
                  <Grid item xs={12} sm={12}>
                    <h2>Relatorio de projetos</h2>
                     
                      <Chart
                        width={'700px'}
                        height={'600px'}
                        chartType="PieChart"
                        data={dataProjects}
                 
                      />
                  </Grid>
              </Paper>
            <Box pt={4}>
              <Footer />
            </Box>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}
