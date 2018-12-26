import React from 'react'
import ReactDOM from 'react-dom'
// import LineChart from 'react-chartjs';

let LineChart = require("react-chartjs").Line;

/* global FormData */
/* global alert */

let cookies = document.cookie.split(';')
let usuario = cookies[1].split('=')[1]

let numeroEmpresas = 0

const cargando = (
    <div className='spinner-border  text-primary' role='status'>
        <span className='sr-only'> Cargando... </span>
    </div>
)

// let intervalTotal = null
// let intervalIndividual = null

class ChartLine extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            datos: [],
            codigoempresa: props.codigoempresa,
            isLoaded: false
        }
        if(props.codigoempresa === 'Completa'){
            this.cargarTodo()
            // intervalTotal = setInterval(() => {
            //     console.log('Intervalo TOTAL!!!')
            //     this.cargarTodo()
            // }, 3000)
        }
        else {
            this.cargar(props.codigoempresa)
            // intervalIndividual = setInterval(() => {
            //     console.log('Intervalo PARCIAL!!!')
            //     this.cargar(props.codigoempresa)
            // }, 30000)
        }
    }

    cargarTodo () {
        window.fetch('/historico', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    let dataTmp = []
                    let labels = []
                    let datasets = []

                    let cont = 0
                    let nLabels = 0
                    let nInfo = result.datos.length / numeroEmpresas

                    for(let i = 0; i < result.datos.length; i++){
                        dataTmp.push(result.datos[i].valor)
                        if(nLabels < nInfo ) {
                            labels.push(result.datos[i].fecha.date.split(' ')[0])
                        }
                        if(cont === nInfo - 1){
                            datasets.push({
                                label: result.datos[i].codigoempresa,
                                fillColor: "rgba(74, 121, 255, 0.53)",
                                strokeColor: "rgba(74, 121, 255, 1)",
                                pointColor: "rgba(74, 121, 255, 1)",
                                pointStrokeColor: "#fff",
                                pointHighlightFill: "#fff",
                                pointHighlightStroke: "rgba(74, 121, 255, 1)",
                                data: dataTmp
                            })
                            dataTmp = []
                            cont = -1
                        }
                        nLabels++
                        cont++
                    }

                    this.setState({
                        labels: labels,
                        datasets: datasets,
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

    cargar (codigoempresa) {
        window.fetch(codigoempresa + '/historico', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    let datasets = []
                    let data = []
                    let labels = []

                    result.datos.map((dato) => {
                        data.push(dato.valor)
                        labels.push(dato.fecha.date.split(' ')[0])
                    })

                    datasets.push({
                        label: labels,
                        fillColor: "rgba(74, 121, 255, 0.53)",
                        strokeColor: "rgba(74, 121, 255, 1)",
                        pointColor: "rgba(74, 121, 255, 1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(74, 121, 255, 1)",
                        data: data
                    })

                    this.setState({
                        labels: labels,
                        datasets: datasets,
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

    render () {
        const {labels, datasets, isLoaded} = this.state

        let data = {
            labels: labels,
            datasets: datasets
        }

        let chartOptions = {

            ///Boolean - Whether grid lines are shown across the chart
             scaleShowGridLines : true,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,

            //Boolean - Whether the line is curved between points
            bezierCurve : true,

            //Number - Tension of the bezier curve between points
            bezierCurveTension : 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot : true,

            //Number - Radius of each point dot in pixels
            pointDotRadius : 4,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth : 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke : true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth : 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill : true,

            //Boolean - Whether to horizontally center the label and point dot inside the grid
            offsetGridLines : false
        }

        if(isLoaded) return (
            <LineChart data={data} options={chartOptions}
                       width={'600'}
                       height={'250'}
            />
        )
        else return cargando
    }
}

class NombreUsuario extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return <span> {usuario} </span>
    }
}

class Acciones extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            datos: [],
            empresas: [],
            hayAcciones: false,
            hayEmpresas: false,
            isLoaded: false
        }
        this.cargar()
    }

    cargar () {
        let header = {usuario}
        window.fetch('/acciones', {
            method: 'GET',
            headers: header
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.getNombreEmpresas(result.datos)
                    this.setState({
                        datos: result.datos,
                        hayAcciones: true
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

    getNombreEmpresas(datos) {
        let empresas = []
        datos.map((dato) => {
            window.fetch(dato.codigoempresa+'/bolsa', {
                method: 'GET'
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        empresas.push(result.datos[0])
                    },
                    (error) => {
                        this.setState({
                            isLoaded: false,
                            error
                        })
                    }
                )
        })

        let interval = setInterval(() => {
            if(datos.length === empresas.length){
                this.setState({
                    empresas: empresas,
                    hayEmpresas: true
                })
                clearInterval(interval)
            }
        }, 50)
    }

    render () {
        const {datos, empresas, hayAcciones, hayEmpresas} = this.state
        if(hayAcciones && hayEmpresas) {
            let acciones = []
            datos.map((dato, index) => {
                acciones.push(
                    <div key={'ac_' + index} className={'col elementoAcordeon'}>
                        <div className={'d-flex justify-content-start'}>
                            <h4> {empresas[index].nombreempresa} </h4>
                            &nbsp;&nbsp;&nbsp;
                            <h5 className={'align-self-end'}> {dato.cantidad} acciones </h5>
                        </div>
                        <div className={'accionIndividual'}>
                            <h6>
                                <i className={'fa fa-line-chart'} /> {empresas[index].valordia}
                                &nbsp;
                                €/acción
                            </h6>
                            <a href={''}> {dato.codigoempresa} </a>
                        </div>
                    </div>
                )
            })
            return <div key={'acciones'} className={'row'}> {acciones} </div>
        }
        else return cargando
    }
}

class Bolsa extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            datos: [],
            primeraVez: true,
            isLoaded: false
        }
        this.cargar()
    }

    cargar () {
        window.fetch('/bolsa', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    numeroEmpresas = result.datos.length
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
        if(!this.state.primeraVez){
            ReactDOM.unmountComponentAtNode(document.getElementById('informacion'))
        }
        this.setState({
            primeraVez: false
        })
        let estructura = <h3> Distribución temporal de acciones: {nombreempresa} - {codigoempresa} </h3>

        ReactDOM.render(estructura, document.getElementById('cabeceraInformacion'))
        ReactDOM.render(<ChartLine codigoempresa={codigoempresa} />, document.getElementById('informacion'))
    }

    render () {
        const {datos, isLoaded} = this.state
        if(isLoaded) {
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

class Historico extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            datos: [],
            isLoaded: false
        }
        this.cargar()
    }

    cargar () {
        window.fetch('/historico', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
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

    render () {
        const {datos, isLoaded} = this.state
        if(isLoaded) {
            return <span> historico </span>
        }
        else return cargando
    }
}

class CC extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            datos: [],
            isLoaded: false
        }
        this.cargar()
    }

    cargar () {
        let header = {usuario}
        window.fetch('/cuentacorriente', {
            method: 'GET',
            headers: header
        })
            .then(res => res.json())
            .then(
                (result) => {
                    ReactDOM.render(<TotalIngresos datos={result.datos} />, document.getElementById('totalIngresos'))
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

    render () {
        const {datos, isLoaded} = this.state
        if(isLoaded) {
            let cuentas = []
            datos.map((dato, index) => {
                cuentas.push(
                    <div key={'cc_' + index} className={'col elementoAcordeon'}>
                        <div className={'d-flex justify-content-start'}>
                            <a href={''}> {dato.iban} </a>
                            &nbsp;&nbsp;&nbsp;
                            {dato.saldo}€
                        </div>
                    </div>
                )
            })
            return <div key={'cc'} className={'row'}> {cuentas} </div>
        }
        else return cargando
    }
}

class TotalIngresos extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            datos: props.datos
        }
    }

    render () {
        const {datos} = this.state
        let total = 0
        datos.map((dato) => {
            total += dato.saldo
        })
        return (
            <span> <h5> Fondos: {total.toFixed(2)}€ </h5> </span>
        )
    }
}

ReactDOM.render(<NombreUsuario />, document.getElementById('nombreUsuario'))

ReactDOM.render(<Acciones />, document.getElementById('acciones'))

ReactDOM.render(<Bolsa />, document.getElementById('bolsa'))

// ReactDOM.render(<Historico />, document.getElementById('historico'))

ReactDOM.render(<CC />, document.getElementById('cc'))

// ReactDOM.render(<ChartLine />, document.getElementById('grafica'))