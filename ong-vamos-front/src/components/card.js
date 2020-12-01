import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

import Banner1 from "../assets/images/logo.jpeg";
import api from '../services/api'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: 300,
    marginBottom: "30px",
  },
  media: {
    position: 'relative',
    height: 160,
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  span: {
      marginLeft: "10px"
  },
  buttonContainer: {
    width: '100%',
    padding: 10,
    textAlign: 'right'
  },
  buttonDelete: {
    background:'none',
    border:'none',
    outline: 'none',
  },
  buttonEdit: {
    background:'none',
    border:'none',
    outline: 'none'
  }
});

export default function MediaCard({
  eventos
}) {
  const [eventosState, setEventosState] = useState([])
  const history = useHistory()

  useEffect(() => {
    setEventosState(eventos)
  }, [eventos])

  const handleDeleteEvent = useCallback(async (id) => {
    if(window.confirm("Deseja excluir esse Evento ?")) {
      await api.delete(`eventos/${id}`)

      const results = eventosState.filter(item => item.id !== id)

      setEventosState(results)
    } else{
    
    }
  }, [eventosState])


  const handleEditEvent = useCallback(async (id) => {
    history.push(`/admin/eventos/editar/${id}`)
  }, [history])

  const classes = useStyles();

  return (
    <>
      {eventosState.map(item => (
        <Card key={item.id} className={classes.root}>
          <div className={classes.imageContainer}>
            <CardMedia
              className={classes.media}
              image={Banner1}
              title="Contemplative Reptile"
            >
            </CardMedia>
          </div>
        
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.nome}
            </Typography>
              <p>{item.descricao}</p>
            </CardContent>
          <CardActions className={classes.actions}>
            <span className={classes.span}>
              {new Date(item.data).toLocaleDateString('pt-br')}
            </span>
            <div className={classes.buttonContainer}>
              <button className={classes.buttonEdit}>
                <FaEdit size={20} color="#E6332F" onClick={() => handleEditEvent(item.id)} />
              </button>
              <button className={classes.buttonDelete} onClick={() => handleDeleteEvent(item.id)}>
                <FaTrash size={20} color="#E6332F" />
              </button>
            </div>
          </CardActions>
        </Card>
      ))}
    </>
  );
}
