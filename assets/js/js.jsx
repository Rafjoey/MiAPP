import React from 'react'
import ReactDOM from 'react-dom'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'
import paginationFactory from 'react-bootstrap-table2-paginator'

/* global FormData */
/* global alert */
const headerSortingClasses = (column, sortOrder) => (
    sortOrder === 'asc' ? 'asc' : 'desc'
)

function uriFormatter (cell, row) {
    return (
        <URI cell={cell} row={row} />
    )
}

class Contenido extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            datos: [],
            isLoaded: false,
            columnas: [
                {
                    dataField: 'FECHA',
                    text: 'Fecha',
                    headerSortingClasses,
                    editable: false,
                    sort: true,
                    filter: textFilter({
                        placeholder: 'Filtrar por fecha'
                    }),
                    headerAlign: 'center',
                    align: 'center',
                    classes: 'centrado',
                    headerClasses: 'centrado'
                },
                {
                    dataField: 'DISTRITO',
                    text: 'Distrito',
                    headerSortingClasses,
                    editable: false,
                    sort: true,
                    filter: textFilter({
                        placeholder: 'Filtrar por distrito'
                    }),
                    headerAlign: 'center',
                    align: 'center',
                    classes: 'centrado',
                    headerClasses: 'centrado'
                },
                {
                    dataField: 'LUGAR_ACCIDENTE',
                    text: 'Lugar accidente',
                    headerSortingClasses,
                    editable: false,
                    sort: true,
                    filter: textFilter({
                        placeholder: 'Filtrar por lugar'
                    }),
                    headerAlign: 'center',
                    align: 'center',
                    classes: 'centrado',
                    headerClasses: 'centrado'
                },
                {
                    dataField: 'N',
                    text: 'Nº Accidentes',
                    headerSortingClasses,
                    editable: false,
                    sort: true,
                    filter: textFilter({
                        placeholder: 'Filtrar por nº de accidentes'
                    }),
                    headerAlign: 'center',
                    align: 'center',
                    classes: 'centrado',
                    headerClasses: 'centrado'
                },
                {
                    dataField: 'N_VICTIMAS',
                    text: 'Nº Victimas',
                    headerSortingClasses,
                    editable: false,
                    sort: true,
                    filter: textFilter({
                        placeholder: 'Filtrar por nº de victimas'
                    }),
                    headerAlign: 'center',
                    align: 'center',
                    classes: 'centrado',
                    headerClasses: 'centrado'
                },
                {
                    dataField: 'TIPO_ACCIDENTE',
                    text: 'Tipo accidente',
                    headerSortingClasses,
                    editable: false,
                    sort: true,
                    filter: textFilter({
                        placeholder: 'Filtrar por tipo accidente'
                    }),
                    headerAlign: 'center',
                    align: 'center',
                    classes: 'centrado',
                    headerClasses: 'centrado'
                },
                {
                    dataField: 'SEXO',
                    text: 'Sexo',
                    headerSortingClasses,
                    editable: false,
                    sort: true,
                    filter: textFilter({
                        placeholder: 'Filtrar por sexo'
                    }),
                    headerAlign: 'center',
                    align: 'center',
                    classes: 'centrado',
                    headerClasses: 'centrado'
                },
                {
                    dataField: 'TRAMO_EDAD',
                    text: 'Tramo edad',
                    headerSortingClasses,
                    editable: false,
                    sort: true,
                    filter: textFilter({
                        placeholder: 'Filtrar por tramo edad'
                    }),
                    headerAlign: 'center',
                    align: 'center',
                    classes: 'centrado',
                    headerClasses: 'centrado'
                },
                {
                    dataField: 'URI',
                    text: 'F5 en nueva pestaña para visualizar',
                    formatter: uriFormatter,
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                    classes: 'centrado',
                    headerClasses: 'centrado'
                }
            ],
            options: {}
        }
        this.getRDF()
    }

    getRDF() {
        window.fetch('http://localhost:8000/rdf/get', {
            method: 'GET'
        }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        datos: result,
                        isLoaded: true,
                        options: {
                            paginationSize: 5,
                            pageStartIndex: 1,
                            hideSizePerPage: false, // Hide the sizePerPage dropdown always
                            hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
                            nextPageTitle: 'Siguiente página',
                            prePageTitle: 'Página anterior',
                            firstPageTitle: 'Primera página',
                            lastPageTitle: 'Última página',
                            sizePerPageList: [{
                                text: '5', value: 5
                            }, {
                                text: '10', value: 10
                            }, {
                                text: 'Todos (' + result.length + ')', value: result.length
                            }]
                        }
                    })
                },
                (error) => {
                    alert(error)
                })
    }

    render () {
        let { datos, isLoaded, columnas, options } = this.state
        if(isLoaded) {
            return <BootstrapTable
                key={'tabla'}
                keyField='ID'
                data={datos}
                columns={columnas}
                filter={filterFactory()}
                pagination={paginationFactory(options)}
                striped
                hover
                condensed
                noDataIndication={'No se encontraron resultados'}
            />
        }
        else {
            return <strong> Cargando... </strong>
        }
    }
}

class URI extends React.Component {
    constructor (props) {
        super(props)
    }

    _verAccidente() {
        window.open(this.props.cell)
    }

    render(){
        return <button key={'btn'} type='button' className='btn btn-primary' data-toggle='modal' data-target='#modal' onClick={() => this._verAccidente()}>
            Ver accidente
        </button>
    }
}

ReactDOM.render(<Contenido />, document.getElementById('tabla'))
