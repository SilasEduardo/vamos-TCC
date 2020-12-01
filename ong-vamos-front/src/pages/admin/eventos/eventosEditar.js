import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";


import MenuAdmin from "../../../components/menuAdmin";
import Footer from "../../../components/footerAdmin";
import { useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useHistory} from 'react-router-dom';


import api from '../../../services/api'
import { Add } from "@material-ui/icons";

const url = 'https://ong-vamos.herokuapp.com/api/v1'


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  input: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#eeee",
    padding: theme.spacing(3),
  },
  main: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#ffff",
    padding: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  footer: {
    flexGrow: 1,
    overflow: "auto",
    backgroundColor: "#ffff",
    padding: theme.spacing(3),
  },

  buttonContent: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 50,
    background: "#ffff",
    padding: 10,
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: "50%",
    display: "flex",
    justifyContent: "center",
    width: "65vh",
    height: "20vh"
  },
  formTextArea: {
    margin: theme.spacing(3),
    minWidth: '100%',
    display: "flex",
    justifyContent: "center",
    width: "65vh",
    height: "20vh"
  },
  button: {
    padding: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
    paddingTop: 10,
    background: "#ffff",
    padding: 5,
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E6332F",
    },
  },
});

export default function UsuariosEditar({ 

}) {

  const history = useHistory()


  const classes = useStyles();
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [id_projeto, setId_projeto] = useState("");
  const { id } = useParams()

  useEffect(() => {
    api.get(`eventos/${id}`).then(results => {
      const data = results.data;
      setNome(data.nome)
      setData(data.data)
      setDescricao(data.descricao)
    }).catch(error => console.log(error))
  }, [id])

  const handlenchange = (e,editor)=>{
    const datas =editor.getData();
    setDescricao(datas);
  }

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      api.put(`eventos/${id}`, {
          descricao,
          nome,
          data,
      }
          ).then((a) => {
            alert('Evento editado com sucesso!!');
            history.push("/admin/eventos")
          }).catch(() => {
            alert('Erro ao editar evento!');
          })
    
        }
    
      );

  // console.log(descricao, nome, data, id_projeto)

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <MenuAdmin title="Usuarios" />
        <main className={classes.main}>
          <div className={classes.container}>
            <div className={classes.appBarSpacer} />
            <div className={classes.content}>
              <Grid>
                <div>
                  <h1 style={{ textAlign: "center" }}>Editar Evento</h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className={classes.root}>
                    <div>
                      <FormControl className={classes.formControl} error>
                        <TextField
                          required
                          id="nome"
                          name="nome"
                          label="Nome do Evento"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </FormControl>
                      <FormControl className={classes.formControl} error>
                        <TextField
                          required
                          label=" Data do evento"
                          type="date"
                          name="data"
                          placeholder="DD/MM/YYYY"
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={data}
                          onChange={(e) => setData(e.target.value)}
                        />
                      </FormControl>
                    </div>
                    <div>
                      <FormControl className={classes.formTextArea} error>
                          <textarea value={descricao} placeholder="descrição" onChange={e => setDescricao(e.target.value)}>                          </textarea>
                      </FormControl>
                      <div>
                        <FormControl className={classes.formControl} error>
                          <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            value={id_projeto}
                            onChange={(e) => setId_projeto(e.target.value)}
                          />
                          <label htmlFor="contained-button-file" className={classes.button} error>
                            <Button variant="contained"
                              color="primary"
                              component="span">
                              <CloudUploadIcon />Insira uma Imagem *
                        </Button>
                          </label>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <div className={classes.buttonContent}>
                    <Button variant="contained" color="primary" type="submit">
                       salvar
                    </Button>
                  </div>
                </form>
              </Grid>
            </div>
          </div>

          <div className={classes.footer}>
            <Footer />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
