import React from 'react'

class FuncionalidadAgregarEmpresa extends React.Component {
    constructor(props) {
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
                if (result.ok) {
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
                    function () {
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

    render() {
        return <div key={'contenedorAgregarEmpresa'}>
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
    }
}

export default FuncionalidadAgregarEmpresa