import React from 'react'
import ReactDOM from 'react-dom'
import DatePicker from "react-datepicker"

class FuncionalidadAgregarValorDia extends React.Component {
    constructor(props) {
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
        if (this.state.codigoEmpresa === '') {
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
                        ReactDOM.render(<Bolsa />, document.getElementById('bolsa'))
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

    render() {
        let datos = this.state.datos
        let opciones = []
        opciones.push(
            <option key={'opciones_X'} value={''}>
                Agregar a todas las empresas.
            </option>
        )
        datos.map((dato, index) => {
            opciones.push(
                <option key={'opciones_' + index} value={dato.codigoempresa}>
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

export default FuncionalidadAgregarValorDia