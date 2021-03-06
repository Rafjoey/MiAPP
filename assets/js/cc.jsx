import React from 'react'
import ReactDOM from 'react-dom'
import Acciones from './acciones'
import TotalIngresos from './totalIngresos'

let cookies = document.cookie.split(';')
let usuario = cookies[1].split('=')[1]

const cargando = (
    <div className='spinner-border  text-primary' role='status'>
        <span className='sr-only'> Cargando... </span>
    </div>
)

class CC extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datos: [],
            isLoaded: false
        }
        this.recargarCC = this.recargarCC.bind(this)
    }


    cargar() {
        let header = { usuario }
        window.fetch('/cuentacorriente', {
            method: 'GET',
            headers: header
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        datos: result.datos,
                        isLoaded: true
                    })
                    ReactDOM.render(<TotalIngresos datos={result.datos} />, document.getElementById('totalIngresos'))
                    ReactDOM.render(<Acciones cuentasCorrientes={result.datos} recargarCC={this.recargarCC} />, document.getElementById('acciones'))
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    })
                }
            )
    }

    recargarCC() {
        ReactDOM.unmountComponentAtNode(document.getElementById('totalIngresos'))
        ReactDOM.unmountComponentAtNode(document.getElementById('acciones'))
        this.cargar()
    }

    componentDidMount() {
        this.cargar()
    }

    render() {
        const { datos, isLoaded } = this.state
        if (isLoaded) {
            return <div key={'cc'} className={'row'}>
                {datos.map((dato, index) => {
                    return <div key={'cc_' + index} className={'col elementoAcordeon'}>
                        <div className={'d-flex justify-content-start'}>
                            <a href={''}> {dato.iban} </a>
                            &nbsp;&nbsp;&nbsp;
                            {dato.saldo}€
                        </div>
                    </div>
                })}
            </div>
        }
        else return cargando
    }
}

export default CC