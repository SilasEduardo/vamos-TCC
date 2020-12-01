import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
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
  }
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.containerFull}>
      <Button variant="contained" color="primary" onClick={handleOpen} className={classes.buttonModal}>
        Novo Projeto
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <div className={classes.containerModal}>
                <FormControl className={classes.formControl}>
                    <h2 className={classes.titleModal}>Adicionar novo Projeto</h2>
                  <TextField
                    id="filled-textarea"
                    label="Nome:"                        
                    multiline
                    variant="filled"
                    className={classes.firstInput}
                    />
                  <TextField
                    id="filled-textarea"
                    label="Descrição:"                        
                    multiline
                    variant="filled"
                  />
                  <Button 
                    onClick={handleClose}       
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    className={classes.buttonModal}>
                    cadastrar
                  </Button>   
                </FormControl>
            </div>
        </Fade>
      </Modal>
    </div>
  );
}
