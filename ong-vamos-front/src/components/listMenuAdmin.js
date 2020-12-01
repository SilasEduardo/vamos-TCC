import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import { red } from '@material-ui/core/colors';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/admin" >
      <ListItemIcon>
        <DashboardIcon style={{ color: red[500] }} />
      </ListItemIcon>
      <ListItemText primary="Painel de Controle"/>
    </ListItem>

    <ListItem button component="a" href="/admin/projetos" >
      <ListItemIcon>
        <ViewAgendaIcon style={{ color: red[500] }} />
      </ListItemIcon>
      <ListItemText primary="Projetos"/>
    </ListItem>

    <ListItem button component="a" href="/admin/eventos" >
      <ListItemIcon>
        <ViewColumnIcon style={{ color: red[500] }} />
      </ListItemIcon>
      <ListItemText primary="Eventos" />
    </ListItem>

    <ListItem button component="a" href="/admin/usuarios">
      <ListItemIcon>
        <PeopleIcon style={{ color: red[500] }}/>
      </ListItemIcon>
      <ListItemText primary="Assistidos" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Configurações</ListSubheader>
    <ListItem button component="a" href="/">
      <ListItemIcon>
        <ExitToApp style={{ color: red[500] }}/>
      </ListItemIcon>
      <ListItemText primary="Sair"/>
    </ListItem>
  </div>
);