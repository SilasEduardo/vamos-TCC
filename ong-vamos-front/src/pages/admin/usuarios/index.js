import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, createMuiTheme, } from "@material-ui/core/styles"

import api from "../../../services/api";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import MenuAdmin from "../../../components/menuAdmin";
import Footer from "../../../components/footerAdmin";

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
  sendButton: {
    marginTop: 20,
    left: '82%',
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E6332F",
    },
    secondary: {
      main: "#1769aa"
    }
  },
});

export default function ListagemUsuarios() {
  const classes = useStyles();

  const [user, setUser] = useState([]);
  const [ assistidos, setAssistidos ] = useState([]);
  const numeroTelefone = assistidos.telefone;
  
  
  useEffect(() => {
    async function loadUsuarios(){
      const response = await api.get("/assistidos");
      setAssistidos(response.data);
    }
    loadUsuarios();
  }, []);
  
  async function handleRemoveUser(id) {
    if(window.confirm("Deseja excluir esse assistido?")) {
      var result = await api.delete('assistidos/'+id);
      if(result.status === 200) {
        window.location.href = '/admin/usuarios'
      }else {
        alert("Erro, tente novamente!")
      }
    }  
  }

  function createAssistidoTabela(id, nome, status, contato, projeto) {

    let numero
    let projetos
    contato.forEach(telefone => {
      numero = `(${telefone.ddd}) ${telefone.numero}`
    });
    projeto.forEach(projeto => {
      projetos = projeto.nome
    })

    return { id, nome, status, numero, projetos };
  }

  const listaTabela = assistidos.map( (assistido) => {
    return createAssistidoTabela(assistido.id ,assistido.nome, assistido.status, assistido.telefone, assistido.assisProj);
  })
  
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <MenuAdmin title="Dashboard" />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
              <Paper className={classes.paper}>
              <h2>Assistidos</h2>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell align="center">Telefone</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Projeto</TableCell>
                        <TableCell align="right">Opções</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listaTabela.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">{row.nome}</TableCell>
                          <TableCell align="center">{row.numero}</TableCell>
                          <TableCell align="center">{row.status}</TableCell>
                          <TableCell align="center">{row.projetos}</TableCell>
                          <TableCell align="right">
                          <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button color="primary" href={'/admin/usuarios/editar/'+row.id}>Atualizar</Button>
                            <Button color="primary" onClick={() => handleRemoveUser(row.id)}>Deletar</Button>
                            <Button color="secondary" href={'/admin/usuarios/historico/'+row.id}>Historico</Button>
                          </ButtonGroup>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button 
                  variant="contained"
                  color="primary" 
                  href="/admin/usuarios/cadastrar"
                  className={classes.sendButton}>
                  Novo Assistido
                </Button>
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
