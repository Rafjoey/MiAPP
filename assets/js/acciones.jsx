import React from 'react'
import ReactDOM from 'react-dom'

let cookies = document.cookie.split(';')
let usuario = cookies[1].split('=')[1]

const cargando = (
    <div className='spinner-border  text-primary' role='status'>
        <span className='sr-only'> Cargando... </span>
    </div>
)

class Acciones extends React.Component {
    constructor(props) {
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
    }

    cargar() {
        let header = { usuario }
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
            window.fetch(dato.codigoempresa + '/bolsa', {
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
            if (datos.length === empresas.length) {
                this.setState({
                    empresas: empresas,
                    hayEmpresas: true
                })
                clearInterval(interval)
            }
        }, 50)
    }

    cambioCC(event, valorDia) {
        if (event.target.value !== '') {
            let ccs = this.state.cuentasCorrientes
            ccs.map((cc) => {
                if (cc.iban === event.target.value) {
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
        if (this.maxAcciones > e.target.value) {
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

    comprar(accion, valorDia) {
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
                <option key={'cc_' + index} value={cc.iban}>
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
                    onChange={(e) => this.range(e, valorDia)} />
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
        let numAcciones = document.getElementById('numAcciones').value
        console.log('Se van a comprar ' + numAcciones + ' acciones.')
        console.log('Se van a usar la cc: ' + this.ccEnUso.iban)
        this.ccEnUso = {}
        this.maxAcciones = 0
    }

    vender(accion, valorDia) {
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

    cambiar(accion, valorDia) {
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

    borrar(accion) {
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

    componentDidMount() {
        this.cargar()
    }

    render() {
        const { datos, empresas, hayAcciones, hayEmpresas } = this.state
        if (hayAcciones && hayEmpresas) {
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

export default Acciones