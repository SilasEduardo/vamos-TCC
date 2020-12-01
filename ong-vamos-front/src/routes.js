import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/admin/dashboard'

import Usuarios from './pages/admin/usuarios'
import UsuariosCadastrar from './pages/admin/usuarios/usuariosCadastrar'
import UsuariosEditar from './pages/admin/usuarios/usuariosEditar'

import Eventos from './pages/admin/eventos'
import EventosCadastrar from './pages/admin/eventos/eventosCadastrar'
import EventosEditar from './pages/admin/eventos/eventosEditar'

import Projetos from './pages/admin/projetos'
import ProjetosCadastrar from './pages/admin/projetos/projetosCadastrar'
import ProjetosEditar from './pages/admin/projetos/projetosEditar'
import Historico from './pages/admin/usuarios/historico';

import Home from './pages/client/home'

export default function Routes(){
  return(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/admin" exact component={Dashboard} />

      <Route path="/admin/usuarios" exact component={Usuarios} />
      <Route path="/admin/usuarios/cadastrar" exact component={UsuariosCadastrar} />
      <Route path="/admin/usuarios/editar/:idAssistido" exact component={UsuariosEditar} />
      <Route path="/admin/usuarios/historico/:idAssistido" exact component={Historico} />

      <Route path="/admin/eventos" exact component={Eventos} />
      <Route path="/admin/eventos/cadastrar" exact component={EventosCadastrar} />
      <Route path="/admin/eventos/editar/:id" exact component={EventosEditar} />

      <Route path="/admin/projetos" exact component={Projetos} />
      <Route path="/admin/projetos/editar" exact component={ProjetosEditar} />
    </Switch>
  </BrowserRouter>
  )
}