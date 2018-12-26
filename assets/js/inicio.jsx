import React from 'react'
import ReactDOM from 'react-dom'

/* global FormData */
/* global alert */

class BotonLogin extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isData: false,
            isLoaded: true,
            res: null,
            error: null
        }
        this.handle = false
        this.location = false
        this._handlerClick = this._handlerClick.bind(this)
        document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        document.cookie = 'usuario=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }

    _handlerClick (event) {
        event.preventDefault()
        this.handle = true
        this.setState({
            isData: false,
            isLoaded: false,
            res: null,
            error: null
        })
        let username = document.getElementById('email').value
        let password = document.getElementById('password').value
        let formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        window.fetch('/login', {
            method: 'POST',
            body: formData
        }).then((res) => res.json())
            .then(
                (result) => {
                    if (result.token) {
                        setTimeout(function() {
                            this.setState({
                                isLoaded: true,
                                res: result,
                                isData: true
                            })
                        }.bind(this), 1000)
                    } else {
                        setTimeout(function() {
                            this.setState({
                                isLoaded: true,
                                res: result
                            })
                        }.bind(this), 1000)
                    }
                },
                (error) => { // En caso de error.
                    this.setState({
                        isLoaded: true,
                        error: error
                    })
                }
            )
    }

    render () {
        const {isData, isLoaded, res} = this.state
        if (!isLoaded && !isData) {
            return (
                <button className={'btn btn-primary'} onClick={(event) => this._handlerClick(event)} disabled='disabled' id={'botonLogin'}>
                    <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true' />
                    Cargando
                </button>
            )
        } else if (isLoaded && !isData && this.handle) {
            this.handle = false
            document.getElementById('password').value = ''
            return (
                <div>
                    <button className={'btn btn-primary'} onClick={(event) => this._handlerClick(event)} id={'botonLogin'}>
                        <i className={'fa fa-sign-in'} /> Entrar
                    </button>
                    <p className={'mt-2'}>Error, usuario o contraseña incorrectos.</p>
                </div>
            )
        } else if (isLoaded && isData && !this.location) {
            let currentDate = new Date()
            document.cookie = 'token=' + res.token + '; path=/; expires=' + new Date(currentDate.getTime() + (60 * 60 * 1000))
            document.cookie = 'usuario=' + res.userdata.usuario + '; path=/; expires=' + new Date(currentDate.getTime() + (60 * 60 * 1000))
            // window.localStorage.setItem('token', res.token)
            // window.localStorage.setItem('usuario', res.userdata.usuario)
            this.location = true
            window.location = window.location.protocol + '//' + 'localhost:8000/menu'
            return (
                <button className={'btn btn-primary'} onClick={(event) => this._handlerClick(event)} disabled='disabled' id={'botonLogin'}>
                    <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true' />
                    Cargando
                </button>
            )
        } else {
            return (
                <button className={'btn btn-primary'} onClick={(event) => this._handlerClick(event)} id={'botonLogin'}>
                    <i className={'fa fa-sign-in'} /> Entrar
                </button>
            )
        }
    }
}

ReactDOM.render(<BotonLogin />, document.getElementById('btnLogin'))