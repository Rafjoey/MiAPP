import React from 'react'

class NombreUsuario extends React.Component {
    constructor(props) {
        super(props)
        this.usuario = props.usuario
    }

    render() {
        return <span> {this.usuario} </span>
    }
}

export default NombreUsuario