import React from 'react'
import ReactDOM from 'react-dom'
import FuncionalidadAgregarValorDia from './agregarValorDia'
import ChartLine from './chartLine'

const cargando = (
    <div className='spinner-border  text-primary' role='status'>
        <span className='sr-only'> Cargando... </span>
    </div>
)

class Bolsa extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datos: [],
            primeraVez: true,
            isLoaded: false
        }
        this.numeroEmpresas = props.numeroEmpresas
    }

    cargar() {
        window.fetch('/bolsa', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    ReactDOM.unmountComponentAtNode(document.getElementById('funcionalidadAgregarValorDia'))
                    ReactDOM.render(<FuncionalidadAgregarValorDia datos={result.datos} />, document.getElementById('funcionalidadAgregarValorDia'))
                    this.numeroEmpresas = result.datos.length
                    this.setState({
                        datos: result.datos,
                        isLoaded: true
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    })
                }
            )
    }

    mostrarInfo(event, codigoempresa, nombreempresa) {
        event.preventDefault()

        ReactDOM.unmountComponentAtNode(document.getElementById('informacion'))

        let estructura = <h3> Distribución temporal de acciones: {nombreempresa} - {codigoempresa} </h3>

        ReactDOM.render(estructura, document.getElementById('cabeceraInformacion'))
        ReactDOM.render(<ChartLine codigoempresa={codigoempresa} numeroEmpresas={this.numeroEmpresas} />, document.getElementById('informacion'))
    }

    componentDidMount() {
        this.cargar()
    }

    render() {
        const { datos, isLoaded } = this.state
        if (isLoaded) {
            let bolsa = []
            bolsa.push(
                <div key={'bo_T'} className={'col elementoAcordeon'}>
                    <div className={'d-flex justify-content-start'}>
                        <a href={''} onClick={(event) => this.mostrarInfo(event, 'Completa', '')}> Completa </a>
                    </div>
                </div>
            )
            datos.map((dato, index) => {
                bolsa.push(
                    <div key={'bo_' + index} className={'col elementoAcordeon'}>
                        <div className={'d-flex justify-content-start'}>
                            <a href={''} onClick={(event) => this.mostrarInfo(event, dato.codigoempresa, dato.nombreempresa)}> {dato.nombreempresa} </a>
                        </div>
                    </div>
                )
            })
            return <div key={'bolsa'} className={'row'}> {bolsa} </div>
        }
        else return cargando
    }
}

export default Bolsa