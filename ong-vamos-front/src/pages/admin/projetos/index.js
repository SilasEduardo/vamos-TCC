import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import { FaEdit, FaTrash } from 'react-icons/fa'

import MenuAdmin from "../../../components/menuAdmin";
import Footer from "../../../components/footerAdmin";

import api from '../../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(4)

  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  heading: {
    color: '#E6332F', 
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
  },
  text: {
    fontSize: theme.typography.pxToRem(18)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFull: {
    display: "flex",
    justifyContent: "flex-end"
},
  containerModal: {
    border: '5px solid #E6332F',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minHeight: "30%",
    maxHeight: "80%",
    width: "50%",
    background: "#fff",
  },
  formControl: {
    display: "flex"
  },
  titleModal: {
    display: "flex",
    justifyContent: "center"
  },
  buttonModal: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(15)
  },
  firstInput: {
    marginBottom: theme.spacing(2),
  },
  acordionDelete: {
    justifyContent: "space-between"
  },
  buttonDelete: {
    background:'none',
    border:'none',
    outline: 'none',
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E6332F",
    },
  },
});

export default function ListProjects() {
  const classes = useStyles();

  const [ projects, setProjects ] = useState([]);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  
  const [name, setName] = useState('');
  const [descricao, setDescricao] = useState('');
  const [local, setLocal] = useState('');

  async function handleSubmit() {
    const data = {
      nome:       name,
      descricao:  descricao,
      local:      local,
    };

    const response = await api.post('/projetos', data);
    if(response.status === 200) {
      window.location.href = '/admin/projetos'
    } else {
      alert('Erro ao cadastrar projeto!')
    } 
  }

  async function handleDeleteProject(id) {
    if(window.confirm("Deseja excluir esse projeto?")) {
      var result = await api.delete('/projetos/'+id);
      if(result.status === 200) {
        window.location.href = '/admin/projetos'
      }else {
        alert("Erro ao excluir o projeto, tente novamente!")
      }
    }  
  }

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

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
        <MenuAdmin title="ListProjects" />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
            <h1 className={classes.titleContainer}>Listagem de Projetos</h1>
            <Container maxWidth="lg" className={classes.container}>            
              <form className={classes.containerFull}>
                <Button variant="contained" color="primary" onClick={handleOpenCreate} className={classes.buttonModal}>
                  Novo Projeto
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openCreate}
                  onClose={handleCloseCreate}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openCreate}>
                      <div className={classes.containerModal}>
                          <FormControl className={classes.formControl}>
                              <h2 className={classes.titleModal}>Adicionar novo Projeto</h2>
                            <TextField
                              id="filled-textarea"
                              label="Nome:"                        
                              multiline
                              variant="filled"
                              className={classes.firstInput}
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              />
                            <TextField
                              id="filled-textarea"
                              label="Descrição:"                        
                              multiline
                              variant="filled"
                              className={classes.firstInput}
                              value={descricao}
                              onChange={(e) => setDescricao(e.target.value)}
                            />
                            <TextField
                              id="filled-textarea"
                              label="Local:"                        
                              multiline
                              variant="filled"
                              value={local}
                              onChange={(e) => setLocal(e.target.value)}
                            />
                            <Button     
                              variant="contained" 
                              color="primary" 
                              type="submit"
                              className={classes.buttonModal}
                              onClick={handleSubmit}
                              >
                              cadastrar
                            </Button>   
                          </FormControl>
                      </div>
                  </Fade>
                </Modal>
              
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openEdit}
                  onClose={handleCloseEdit}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openEdit}>
                      <div className={classes.containerModal}>
                          <FormControl className={classes.formControl}>
                              <h2 className={classes.titleModal}>Editar Projeto</h2>
                            <TextField
                              id="filled-textarea"
                              label="Nome:"                        
                              multiline
                              variant="filled"
                              className={classes.firstInput}
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              />
                            <TextField
                              id="filled-textarea"
                              label="Descrição:"                        
                              multiline
                              variant="filled"
                              className={classes.firstInput}
                              value={descricao}
                              onChange={(e) => setDescricao(e.target.value)}
                            />
                            <TextField
                              id="filled-textarea"
                              label="Local:"                        
                              multiline
                              variant="filled"
                              value={local}
                              onChange={(e) => setLocal(e.target.value)}
                            />
                            <Button     
                              variant="contained" 
                              color="primary" 
                              type="submit"
                              className={classes.buttonModal}
                              onClick={handleSubmit}
                              >
                              Atualizar
                            </Button>   
                          </FormControl>
                      </div>
                  </Fade>
                </Modal>
              
              </form>             
              <Grid>
              {projects.map(project => 
                <Accordion key={project.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography className={classes.heading}>{project.nome}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className={classes.text}>
                      {project.descricao}
                    </Typography>
                  </AccordionDetails>
                  <AccordionDetails className={classes.acordionDelete}>
                    <Typography>
                      <strong>Local: </strong>{project.local}
                    </Typography>
                    <div>
                      <button className={classes.buttonDelete}>
                        <FaEdit size={19} color="#E6332F" onClick={handleOpenEdit}/>
                      </button>
                      <button className={classes.buttonDelete} onClick={() => handleDeleteProject(project.id)}>
                        <FaTrash size={18} color="#E6332F"/>
                      </button>
                    </div>
                  </AccordionDetails>
                </Accordion>                
                )}
              </Grid>
            </Container>
            <Box pt={4}>
              <Footer />
            </Box>
          </main>
      </div>
    </ThemeProvider>
  );
}
