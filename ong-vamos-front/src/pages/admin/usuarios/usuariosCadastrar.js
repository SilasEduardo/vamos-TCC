import React, { useCallback, useState } from "react";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import useAxiosGet from "../../../Hooks/httpRequest"

import MenuAdmin from "../../../components/menuAdmin";
import Footer from "../../../components/footerAdmin";

import api from '../../../services/api'


const url = 'https://ong-vamos.herokuapp.com/api/v1'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    flexGrow: 1,
    height: "90vh",
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
    justifyContent: "flex-end",
    paddingTop: 50,
    background: "#ffff",
    padding: 10,
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: 220,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E6332F",
    },
  },
});

export default function UsuariosCadastrar() {
  const classes = useStyles();
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [sexo, setSexo] = useState("");
  const [escolaridade, setEscolaridade] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cidade, setCidade] = useState("");
  const [projeto, setProjeto] = useState("");
  const [moradia, setMoradia] = useState("");
  const [estado, setEstado] = useState("");
  const [bairro, setBairro] = useState("");
  const [telefone, setTelefone] = useState("");
  const [numero, setNumero] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");

  let telaCadastro = ''

  const listEstadoCivil = useAxiosGet(`https://ong-vamos.herokuapp.com/api/v1/estado-civil`)
  const listProjetos = useAxiosGet(`https://ong-vamos.herokuapp.com/api/v1/projetos`)
  const civil = listEstadoCivil.data
  const proje = listProjetos.data
  let listaOptionsCivil = []
  let listaOptionsProjeto = []
  
  if (civil != null) {
    listaOptionsCivil = civil.map((e) => {
      return <option value={e.id} >{e.descricao}</option>
    })
  }
  
  if (proje != null) {
    listaOptionsProjeto = proje.map((e) => {
      return <option value={e.id} >{e.nome}</option>
    })
  }
  
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      api.post(`${url}/assistidos`, {

        assistido: {
          nome,
          nascimento,
          cpf,
          sexo,
          id_estado_civil: estadoCivil,
          projeto: projeto,
          status: 'Ativo'
        },
        endereco: {
          logradouro,
          cidade,
          cep,
          bairro,
          numero,
          estado,
          id_tipo_moradia: moradia
        },
        telefone: {
          numero: telefone,
          id_tipo_telefone: 1
        }

      }).then((a) => {
        alert('Cadastro realizado com sucesso!');
        window.location.href = '/admin/usuarios'
      }).catch(() => {
        alert('Erro no cadastro!');
      })
    }
  );

  telaCadastro = (

    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <MenuAdmin title="Usuarios" />
        <main className={classes.main}>
          <div className={classes.container}>
            <div className={classes.appBarSpacer} />
            <div className={classes.content}>
              <Grid>
                <div>
                  <h1 style={{ textAlign: "center" }}>Cadastro de Assistidos</h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className={classes.root}>
                    <div>
                      <FormControl className={classes.formControl} error>
                        <TextField
                          required
                          id="nome"
                          name="nome"
                          label="Nome"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </FormControl>
                      <FormControl className={classes.formControl} error>
                        <TextField
                          label="Nascimento"
                          type="date"
                          name="nascimento"
                          placeholder="DD/MM/YYYY"
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={nascimento}
                          onChange={(e) => setNascimento(e.target.value)}
                        />
                      </FormControl>
                      <FormControl className={classes.formControl} error>
                        <TextField
                          id="cpf"
                          label="CPF"
                          name="cpf"
                          placeholder="xxx.xxx.xxx-xx"
                          value={cpf}
                          onChange={(e) => setCpf(e.target.value)}
                        />
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="name-native-error">
                          Sexo
                        </InputLabel>
                        <NativeSelect
                          name="sexo"
                          className={classes.selectEmpty}
                          onChange={(e) => setSexo(e.target.value)}
                        >
                          <option value=""></option>
                          <option value="Masculino">Masculino</option>
                          <option value="Feminino">Feminino</option>
                        </NativeSelect>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="name-native-error">
                          Escolaridade
                        </InputLabel>
                        <NativeSelect
                          name="escolaridade"
                          className={classes.selectEmpty}
                          onChange={(e) => setEscolaridade(e.target.value)}
                        >
                          <option value=""></option>
                          <option value="fundamental-completo">
                            Fundamental Completo
                          </option>
                          <option value="fundamental-incompleto">
                            Fundamental Incompleto
                          </option>
                        </NativeSelect>
                      </FormControl>
                    </div>
                    <div>
                      <FormControl className={classes.formControl} error>
                        <TextField
                          id="standard-required"
                          label="CEP"
                          name="cep"
                          placeholder="00000-000"
                          value={cep}
                          onChange={(e) => setCep(e.target.value)}
                        />
                      </FormControl>
                      <FormControl className={classes.formControl} error>
                        <TextField
                          id="logradouro"
                          name="logradouro"
                          label="logradouro"
                          value={logradouro}
                          onChange={(e) => setLogradouro(e.target.value)}
                        />
                      </FormControl>
                      <FormControl className={classes.formControl} error>
                        <TextField
                          id="cidade"
                          name="cidade"
                          label="Cidade"
                          value={cidade}
                          onChange={(e) => setCidade(e.target.value)}
                        />
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="name-native-error">
                          Projeto
                        </InputLabel>
                        <NativeSelect
                          name="projeto"
                          className={classes.selectEmpty}
                          onChange={(e) => setProjeto(e.target.value)}
                        >
                          <option value=""></option>
                          {listaOptionsProjeto}
                        </NativeSelect>
                      </FormControl> 
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="name-native-error">
                          Moradia
                        </InputLabel>
                        <NativeSelect
                          name="moradia"
                          className={classes.selectEmpty}
                          onChange={(e) => setMoradia(e.target.value)}
                        >
                          <option value=""></option>
                          <option value="1">Aluguel</option>
                          <option value="2">Casa Própria</option>
                          <option value="3">Cedida</option>
                          <option value="4">Não se aplica</option>
                        </NativeSelect>
                      </FormControl>
                    </div>
                    <div>
                      <FormControl className={classes.formControl} error>
                        <TextField
                          id="state"
                          label="Estado"
                          value={estado}
                          onChange={(e) => setEstado(e.target.value)}
                        />
                      </FormControl>
                      <FormControl className={classes.formControl} error>
                        <TextField 
                          id="number"
                          label="Nº"
                          value={numero}
                          onChange={(e) => setNumero(e.target.value)}
                          />
                      </FormControl>
                      <FormControl className={classes.formControl} error>
                        <TextField
                          id="bairro"
                          label="Bairro"
                          value={bairro}
                          onChange={(e) => setBairro(e.target.value)}
                        />
                      </FormControl>
                      <FormControl className={classes.formControl} error>
                        <TextField
                          id="standard-required"
                          label="Telefone"
                          name="telefone"
                          placeholder="(11)0000-00000"
                          value={telefone}
                          onChange={(e) => setTelefone(e.target.value)}
                        />
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="name-native-error">
                          Estado Civil
                        </InputLabel>
                        <NativeSelect
                          name="estado_civil"
                          className={classes.selectEmpty}
                          onChange={(e) => setEstadoCivil(e.target.value)}
                        >

                          <option value=""></option>
                          {listaOptionsCivil}
                        </NativeSelect>
                      </FormControl>
                    </div>
                  </div>
                  <div className={classes.buttonContent}>
                    <Button variant="contained" color="primary" type="submit">
                      cadastrar
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
  )

  return telaCadastro
}
