import React from 'react'
import ReactDOM from 'react-dom'
import NombreUsuario from './nombreUsuario'
import CC from './cc'
import Bolsa from './bolsa'
import FuncionalidadAgregarEmpresa from './agregarEmpresa'

/* global FormData */
/* global alert */

let cookies = document.cookie.split(';')
let usuario = cookies[1].split('=')[1]

ReactDOM.render(<NombreUsuario usuario={usuario} />, document.getElementById('nombreUsuario'))

ReactDOM.render(<Bolsa />, document.getElementById('bolsa'))

ReactDOM.render(<CC />, document.getElementById('cc'))

ReactDOM.render(<FuncionalidadAgregarEmpresa />, document.getElementById('funcionalidadAgregarEmpresa'))