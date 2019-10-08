import React from 'react'
import ReactDOM from 'react-dom'
import DatePicker from "react-datepicker";

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

class ChartLine extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            datos: [],
            codigoempresa: props.codigoempresa,
            isLoaded: false
        }
        if(props.codigoempresa === 'Completa') this.cargarTodo()
        else this.cargar(props.codigoempresa)
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
                            labels.push(result.datos[i].fecha)
                        }
                        if(cont === nInfo - 1){
                            datasets.push({
                                label: result.datos[i].codigoempresa,
                                fillColor: "rgba(74, 121, 255, 0.16)",
                                strokeColor: "rgba(74, 121, 255, 1)",
                                pointColor: "rgba(62, 58, 58, 0.77)",
                                pointStrokeColor: "#fff",
                                pointHighlightFill: "#fff",
                                pointHighlightStroke: "rgba(40, 189, 40, 0.6)",
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
                        labels.push(dato.fecha)
                    })

                    datasets.push({
                        label: labels,
                        fillColor: "rgba(74, 121, 255, 0.32)",
                        strokeColor: "rgba(74, 121, 255, 1)",
                        pointColor: "rgba(62, 58, 58, 0.77)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(40, 189, 40, 0.6)",
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
            cuentasCorrientes: props.cuentasCorrientes,
            datos: [],
            empresas: [],
            hayAcciones: false,
            hayEmpresas: false,
            isLoaded: false
        }
        this.maxAcciones = 0
        this.ccEnUso = {}
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

    cambioCC(event, valorDia) {
        if(event.target.value !== ''){
            let ccs = this.state.cuentasCorrientes
            ccs.map((cc) => {
                if(cc.iban === event.target.value) {
                    this.ccEnUso = cc
                    this.maxAcciones = Math.floor(cc.saldo / valorDia)
                    let restante = (cc.saldo - valorDia).toFixed(2)
                    document.getElementById('saldoRestante').innerText = 'Dinero restante: ' + restante + '€'
                    document.getElementById('btnCompraDefinitiva').removeAttribute('disabled')
                    document.getElementById('maxAcciones').innerText = this.maxAcciones
                    document.getElementById('customRange2').setAttribute('max', this.maxAcciones)
                    document.getElementById('numAcciones').setAttribute('max', this.maxAcciones)
                    document.getElementById('customRange2').value = 1
                    document.getElementById('numAcciones').value = 1
                }
            })
        }
        else {
            this.ccEnUso = {}
            this.maxAcciones = 0
            document.getElementById('saldoRestante').innerText = 'Dinero restante: -'
            document.getElementById('btnCompraDefinitiva').setAttribute('disabled', 1)
            document.getElementById('maxAcciones').innerText = '-'
            document.getElementById('customRange2').setAttribute('max', 1)
            document.getElementById('numAcciones').setAttribute('max', 0)
            document.getElementById('customRange2').value = 1
            document.getElementById('numAcciones').value = ''
        }
    }

    range(e, valorDia) {
        let resto = (this.ccEnUso.saldo - (e.target.value * valorDia)).toFixed(2)
        document.getElementById('saldoRestante').innerText = 'Dinero restante: ' + resto.toString() + '€'
        document.getElementById('numAcciones').value = e.target.value
    }

    cambioCompraManual(e, valorDia) {
        if(this.maxAcciones > e.target.value) {
            let resto = (this.ccEnUso.saldo - (e.target.value * valorDia)).toFixed(2)
            document.getElementById('saldoRestante').innerText = 'Dinero restante: ' + resto.toString() + '€'
            document.getElementById('numAcciones').value = e.target.value
            document.getElementById('customRange2').value = e.target.value
        }
        else {
            document.getElementById('numAcciones').value = this.maxAcciones
            document.getElementById('customRange2').value = this.maxAcciones
        }
    }

    comprar(accion, valorDia){
        this.maxAcciones = 0
        ReactDOM.unmountComponentAtNode(document.getElementById('cabeceraModal'))
        ReactDOM.unmountComponentAtNode(document.getElementById('contenidoModal'))
        let ccs = this.state.cuentasCorrientes
        let cabecera = <h5 key={'cabeceraComprarAcciones'}> Comprar acciones de {accion.nombreempresa} </h5>
        let opciones = []
        opciones.push(
            <option key={'cc_X'} value={''}>
                Seleccionar cuenta corriente
            </option>
        )
        ccs.map((cc, index) => {
            opciones.push(
                <option key={'cc_'+index} value={cc.iban}>
                    {cc.iban} &nbsp;&nbsp;&nbsp;&nbsp; {cc.saldo}€
                </option>
            )
        })
        let contenido = (
            <div key={'contenidoComprarAcciones'}>
                <div key={'selectAgregarValorDia'} className={'input-group mb-3'}>
                    <div className={'input-group-prepend'}>
                        <label className={'input-group-text'} htmlFor={'selectEmpresa'}>CC</label>
                    </div>
                    <select className={'custom-select'} id={'selectCC'}
                            onChange={(event) => this.cambioCC(event, valorDia)}> {opciones} </select>
                </div>
                <div id={'rangeAcciones'} className={'input-group mb-3'}>
                    <div id={'rowCompra'} className={'input-group-prepend'}>
                        <span className={'input-group-text'}>V. día</span>
                        <span className={'input-group-text'}>{valorDia}€</span>
                        <span className={'spanVacio input-group-text'} />
                        <span className={'input-group-text'}>Comprar</span>
                        <input id={'numAcciones'} type={'number'} className={'input-group-text form-control'} aria-label={'J I'}
                               onChange={(e) => this.cambioCompraManual(e, valorDia)} min={'1'} max={'1'} />
                        <span className={'spanVacio input-group-text'} />
                        <span className={'input-group-text'}>Máx</span>
                        <span className={'input-group-text'} id={'maxAcciones'}>-</span>
                    </div>
                </div>
                <input type={'range'} className={'custom-range slider-color'} min={'1'} max={'1'} id={'customRange2'}
                             onChange={(e) => this.range(e, valorDia)}/>
                <div className={'row'}>
                    <strong className={'col'} id={'saldoRestante'} > Dinero restante: - </strong>
                    <button type={'button'} className={'btn btn-primary btn-sm mb-auto p-2'} id={'btnCompraDefinitiva'}
                            onClick={(e) => this.finalizarCompra(e)}>
                        <i className={'fa fa-shopping-cart'} />
                        &nbsp;
                        Comprar
                    </button>
                </div>

            </div>
        )
        ReactDOM.render(cabecera, document.getElementById('cabeceraModal'))
        ReactDOM.render(contenido, document.getElementById('contenidoModal'))
        document.getElementById('customRange2').value = 0
    }

    finalizarCompra(e) {
        // let numAcciones = document.getElementById('numAcciones').value
        // console.log('Se van a comprar ' + document.getElementById('numAcciones').value + ' acciones.')
        // console.log('Se van a usar la cc: ' + this.ccEnUso.iban)
        // this.ccEnUso = {}
        // this.maxAcciones = 0
    }

    vender(accion, valorDia){
        ReactDOM.unmountComponentAtNode(document.getElementById('cabeceraModal'))
        ReactDOM.unmountComponentAtNode(document.getElementById('contenidoModal'))
        let cabecera = <h5 key={'cabeceraComprarAcciones'}> Vender acciones de {accion.nombreempresa} </h5>
        let contenido = (
            <div key={'contenidoComprarAcciones'}>
                <input id={'inputComprarAcciones'} type={'number'} name={'cantidad'} min={'0'} className={'col form-control'}
                       placeholder={'Valor día'} pattern="\d+(\.\d{1,2})?"
                       onChange={(event) => this.setValor(event)} />
            </div>
        )
        ReactDOM.render(cabecera, document.getElementById('cabeceraModal'))
        ReactDOM.render(contenido, document.getElementById('contenidoModal'))
    }

    cambiar(accion, valorDia){
        ReactDOM.unmountComponentAtNode(document.getElementById('cabeceraModal'))
        ReactDOM.unmountComponentAtNode(document.getElementById('contenidoModal'))
        let cabecera = <h5 key={'cabeceraComprarAcciones'}> Cambiar acciones de {accion.nombreempresa} </h5>
        let contenido = (
            <div key={'contenidoComprarAcciones'}>
                <input id={'inputComprarAcciones'} type={'number'} name={'cantidad'} min={'0'} className={'col form-control'}
                       placeholder={'Valor día'} pattern="\d+(\.\d{1,2})?"
                       onChange={(event) => this.setValor(event)} />
            </div>
        )
        ReactDOM.render(cabecera, document.getElementById('cabeceraModal'))
        ReactDOM.render(contenido, document.getElementById('contenidoModal'))
    }

    borrar(accion){
        ReactDOM.unmountComponentAtNode(document.getElementById('cabeceraModal'))
        ReactDOM.unmountComponentAtNode(document.getElementById('contenidoModal'))
        let cabecera = <h5 key={'cabeceraComprarAcciones'}> Borrar acciones de {accion.nombreempresa} </h5>
        let contenido = (
            <div key={'contenidoComprarAcciones'}>
                <input id={'inputComprarAcciones'} type={'number'} name={'cantidad'} min={'0'} className={'col form-control'}
                       placeholder={'Valor día'} pattern="\d+(\.\d{1,2})?"
                       onChange={(event) => this.setValor(event)} />
            </div>
        )
        ReactDOM.render(cabecera, document.getElementById('cabeceraModal'))
        ReactDOM.render(contenido, document.getElementById('contenidoModal'))
    }

    verEmpresa(empresa) {
        ReactDOM.unmountComponentAtNode(document.getElementById('informacion'))

        let estructura = <h3> Distribución temporal de acciones: {empresa.nombreempresa} - {empresa.codigoempresa} </h3>

        ReactDOM.render(estructura, document.getElementById('cabeceraInformacion'))
        ReactDOM.render(<ChartLine codigoempresa={empresa.codigoempresa} />, document.getElementById('informacion'))
    }

    render () {
        const {datos, empresas, hayAcciones, hayEmpresas} = this.state
        if(hayAcciones && hayEmpresas) {
            let acciones = []
            datos.map((dato, index) => {
                acciones.push(
                    <div key={'ac_' + index} className={'col'}>
                        <div className={'row elementoAcordeonAcciones'}>
                            <div className={'col'}>
                                <div className={'d-flex justify-content-start'}>
                                    <h4> {dato.nombreempresa} </h4>
                                    &nbsp;&nbsp;&nbsp;
                                    <h5 className={'align-self-end'}> {dato.cantidad} acciones </h5>
                                </div>
                                <div className={'accionIndividual'}>
                                    <h6>
                                        <i className={'fa fa-line-chart'} /> {empresas[index].valordia}
                                        &nbsp;
                                        €/acción
                                    </h6>
                                    <a href={'#contenedorInformacion'} onClick={() => this.verEmpresa(dato)}> {dato.codigoempresa} </a>
                                </div>
                            </div>
                            <div className={'col-3 d-flex align-items-start flex-column bd-highlight mb-2 columnaBotones'}>
                                <button type={'button'} className={'row btn btn-primary btn-sm mb-auto p-2'} onClick={() => this.comprar(dato, empresas[index].valordia)}
                                        data-toggle={'modal'} data-target={'#modalCenter'}>
                                    <i className={'fa fa-shopping-cart'} />
                                    &nbsp;
                                    Comprar
                                </button>
                                <button type={'button'} className={'row btn btn-success btn-sm mb-auto p-2'} onClick={() => this.vender(dato, empresas[index].valordia)}
                                        data-toggle={'modal'} data-target={'#modalCenter'}>
                                    <i className={'fa fa-usd'} />
                                    &nbsp;
                                    Vender
                                </button>
                            </div>
                            <div className={'col-3 d-flex align-items-start flex-column bd-highlight mb-2 columnaBotones'}>
                                <button type={'button'} className={'row btn btn-info btn-sm mb-auto p-2'} onClick={() => this.cambiar(dato, empresas[index].valordia)}
                                        data-toggle={'modal'} data-target={'#modalCenter'}>
                                    <i className={'fa fa-exchange'} />
                                    &nbsp;
                                    Cambiar
                                </button>
                                <button type={'button'} className={'row btn btn-danger btn-sm mb-auto p-2'} onClick={() => this.borrar(dato)}
                                        data-toggle={'modal'} data-target={'#modalCenter'}>
                                    <i className={'fa fa-trash-o'} />
                                    &nbsp;
                                    Borrar
                                </button>
                            </div>
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
                    ReactDOM.unmountComponentAtNode(document.getElementById('funcionalidadAgregarValorDia'))
                    ReactDOM.render(<FuncionalidadAgregarValorDia datos={result.datos} />, document.getElementById('funcionalidadAgregarValorDia'))
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

        ReactDOM.unmountComponentAtNode(document.getElementById('informacion'))

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
                    ReactDOM.render(<Acciones cuentasCorrientes={result.datos} />, document.getElementById('acciones'))
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

// class ContenidoModal extends React.Component {
//     constructor (props) {
//         super(props)
//         this.state={
//             contenido: props.contenidoModal
//         }
//     }
//
//     render () {
//         return this.state.contenido
//     }
// }
//
// class CabeceraModal extends React.Component {
//     constructor (props) {
//         super(props)
//         this.state={
//             cabecera: props.cabeceraModal
//         }
//     }
//
//     render () {
//         return this.state.cabecera
//     }
// }

ReactDOM.render(<NombreUsuario />, document.getElementById('nombreUsuario'))

// ReactDOM.render(<Acciones />, document.getElementById('acciones'))

ReactDOM.render(<Bolsa />, document.getElementById('bolsa'))

ReactDOM.render(<CC />, document.getElementById('cc'))

class FuncionalidadAgregarValorDia extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            datos: props.datos,
            codigoEmpresa: '',
            fecha: new Date(),
            valor: 0,
            fechaFormateada: new Date().toLocaleString().split(' ')[0]
        }
    }

    cambioEmpresa(event) {
        this.setState({
            codigoEmpresa: event.target.value
        })
    }

    cambioFecha(event) {
        let fecha = event.toLocaleString().split(' ')[0]
        this.setState({
            fecha: event,
            fechaFormateada: fecha
        })
    }

    setValor(event) {
        this.setState({
            valor: event.target.value
        })
    }

    anadir() {
        let estado = []
        if(this.state.codigoEmpresa === ''){
            let empresas = this.state.datos
            empresas.map((empresa, index) => {
                let formData = new FormData()
                let datos = {
                    codigoempresa: empresa.codigoempresa,
                    fecha: this.state.fechaFormateada,
                    valor: this.state.valor
                }
                formData.append('datos', JSON.stringify(datos))
                window.fetch('/historico/agregar', {
                    method: 'POST',
                    body: formData
                }).then(
                    (result) => {
                        if (result.ok) {
                            ReactDOM.unmountComponentAtNode(document.getElementById('bolsa'))
                            ReactDOM.unmountComponentAtNode(document.getElementById('informacion'))
                            estado.push(
                                <div key={'fetchAgregarValor_' + index} className={'alert alert-success'} role={'alert'}>
                                    Valor añadido a {empresa.nombreempresa}!
                                </div>
                            )
                        }
                        else {
                            estado.push(
                                <div key={'fetchAgregarValor_' + index} className={'alert alert-danger'} role={'alert'}>
                                    ERROR! Fallo en servidor. No se pudo agregar valor día a {empresa.nombreempresa}.
                                </div>
                            )
                        }
                        // setTimeout(
                        //     function () {
                        //         ReactDOM.unmountComponentAtNode(document.getElementById('estadoSolicitudAgregarValorDia'))
                        //         ReactDOM.render(estado, document.getElementById('estadoSolicitudAgregarValorDia'))
                        //         setTimeout(
                        //             function () {
                        //                 ReactDOM.unmountComponentAtNode(document.getElementById('estadoSolicitudAgregarValorDia'))
                        //                 ReactDOM.render(<Bolsa/>, document.getElementById('bolsa'))
                        //             }.bind(this), 3000
                        //         )
                        //     }.bind(this), 3000
                        // )
                    },
                    (error) => {
                        alert(error)
                    })
            })
        }
        else {
            let formData = new FormData()

            let datos = {
                codigoempresa: this.state.codigoEmpresa,
                fecha: this.state.fechaFormateada,
                valor: this.state.valor
            }
            formData.append('datos', JSON.stringify(datos))
            window.fetch('/historico/agregar', {
                method: 'POST',
                body: formData
            }).then(
                (result) => {
                    if (result.ok) {
                        ReactDOM.unmountComponentAtNode(document.getElementById('bolsa'))
                        ReactDOM.unmountComponentAtNode(document.getElementById('informacion'))
                        estado = (
                            <div className={'alert alert-success'} role={'alert'}>
                                Valor añadido a {this.state.codigoEmpresa}!
                            </div>
                        )
                        ReactDOM.render(estado, document.getElementById('estadoSolicitudAgregarValorDia'))
                        ReactDOM.render(<Bolsa/>, document.getElementById('bolsa'))
                    }
                    else {
                        estado = (
                            <div className={'alert alert-danger'} role={'alert'}>
                                ERROR! Fallo en servidor.
                            </div>
                        )
                        ReactDOM.render(estado, document.getElementById('estadoSolicitudAgregarValorDia'))
                    }
                    setTimeout(
                        function () {
                            ReactDOM.unmountComponentAtNode(document.getElementById('estadoSolicitudAgregarValorDia'))
                        }.bind(this), 3000
                    )
                },
                (error) => {
                    alert(error)
                })
        }
    }

    render () {
        let datos = this.state.datos
        let opciones = []
        opciones.push(
            <option key={'opciones_X'} value={''}>
                Agregar a todas las empresas.
            </option>
        )
        datos.map((dato, index) => {
            opciones.push(
                <option key={'opciones_'+index} value={dato.codigoempresa}>
                    {dato.nombreempresa} - {dato.codigoempresa}
                </option>
            )
        })
        let contenido = [
            <div key={'contenedorAgregarValorDia'}>
                <h5 className={'modal-title tituloFuncionalidad'}>Agregar valores día</h5>
                <div key={'selectAgregarValorDia'} className={'input-group mb-3'}>
                    <div className={'input-group-prepend'}>
                        <label className={'input-group-text'} htmlFor={'selectEmpresa'}>Empresa</label>
                    </div>
                    <select className={'custom-select'} id={'selectEmpresa'}
                            onChange={(event) => this.cambioEmpresa(event)}> {opciones} </select>
                </div>
                <div key={'datePickerYValor'} className={'row'}>
                    <div className={'col'} id={'datePicker'}>
                        <DatePicker dateFormat="dd/MM/yyyy" selected={this.state.fecha} onChange={(event) => this.cambioFecha(event)} />
                    </div>
                    <input id={'inputValorDia'} type={'number'} name={'cantidad'} min={'0'} className={'col form-control'}
                           placeholder={'Valor día'} pattern="\d+(\.\d{1,2})?"
                           onChange={(event) => this.setValor(event)} />
                </div>
                <div key={'rowEstadoSolicitud'} className={'row'}>
                    <div key={'estadoSolicitud'} className={'col'} id={'estadoSolicitudAgregarValorDia'} />
                    <button id={'botonSolicitud'} className={'btn btn-primary'} onClick={() => this.anadir()}>Añadir</button>
                </div>
            </div>
        ]
        return contenido
    }
}

class FuncionalidadAgregarEmpresa extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({
            nombre: '',
            codigo: '',
            valor: 0
        })
    }

    anadir() {
        let formData = new FormData()
        formData.append('datos', JSON.stringify(this.state))
        window.fetch('/bolsa/agregar', {
            method: 'POST',
            body: formData
        }).then(
            (result) => {
                let estado = ''
                if(result.ok) {
                    ReactDOM.unmountComponentAtNode(document.getElementById('bolsa'))
                    ReactDOM.unmountComponentAtNode(document.getElementById('informacion'))
                    estado = (
                        <div className={'alert alert-success'} role={'alert'}>
                            Empresa añadida!
                        </div>
                    )
                    ReactDOM.render(estado, document.getElementById('estadoSolicitudAgregarEmpresa'))
                    ReactDOM.render(<Bolsa />, document.getElementById('bolsa'))
                }
                else {
                    estado = (
                        <div className={'alert alert-danger'} role={'alert'}>
                            ERROR! Nombre o código ya existentes.
                        </div>
                    )
                    ReactDOM.render(estado, document.getElementById('estadoSolicitudAgregarEmpresa'))
                }
                setTimeout(
                    function() {
                        ReactDOM.unmountComponentAtNode(document.getElementById('estadoSolicitudAgregarEmpresa'))
                    }.bind(this), 3000
                )
            },
            (error) => {
                alert(error)
            })
    }

    setNombre(event) {
        this.setState({
            nombre: event.target.value
        })
    }

    setCodigo(event) {
        this.setState({
            codigo: event.target.value
        })
    }

    setValor(event) {
        this.setState({
            valor: event.target.value
        })
    }

    render () {
        let contenido = [
            <div key={'contenedorAgregarEmpresa'}>
                <h5 className={'modal-title tituloFuncionalidad'}>Añadir empresa a la Bolsa</h5>
                <form key={'formAgregarEmpresa'}>
                    <div className={'col'}>
                        <div className={'row form-group'}>
                            <label htmlFor={'exampleInputEmail1'}>Nombre de la empresa</label>
                            <input type={'text'} name={'nombre'} className={'form-control'} placeholder={'Nombre empresa'}
                                   onChange={(event) => this.setNombre(event)} />
                        </div>
                        <div className={'row form-group'}>
                            <label htmlFor={'exampleInputEmail1'}>Código de la empresa</label>
                            <input type={'text'} name={'codigo'} className={'form-control'} placeholder={'Código empresa'}
                                   onChange={(event) => this.setCodigo(event)} />
                        </div>
                        <div className={'row form-group'}>
                            <label htmlFor={'exampleInputEmail1'}>Valor del día</label>
                            <input type={'number'} name={'cantidad'} min={'0'} className={'form-control'}
                                   placeholder={'Valor día'} pattern="\d+(\.\d{1,2})?"
                                   onChange={(event) => this.setValor(event)} />
                        </div>
                    </div>
                </form>

                <div key={'rowEstadoSolicitud'} className={'row'}>
                    <div key={'estadoSolicitud'} className={'col'} id={'estadoSolicitudAgregarEmpresa'} />
                    <button id={'botonSolicitud'} className={'btn btn-primary'} onClick={() => this.anadir()}>Añadir</button>
                </div>
            </div>
        ]
        return contenido
    }
}

ReactDOM.render(<FuncionalidadAgregarEmpresa />, document.getElementById('funcionalidadAgregarEmpresa'))