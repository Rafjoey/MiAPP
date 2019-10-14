import React from 'react'

let LineChart = require("react-chartjs").Line

const cargando = (
    <div className='spinner-border  text-primary' role='status'>
        <span className='sr-only'> Cargando... </span>
    </div>
)

class ChartLine extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datos: [],
            codigoempresa: props.codigoempresa,
            isLoaded: false
        }
        this.numeroEmpresas = props.numeroEmpresas
        this.codigoempresa = props.codigoempresa
    }

    cargarTodo() {
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
                    let nInfo = result.datos.length / this.numeroEmpresas

                    for (let i = 0; i < result.datos.length; i++) {
                        dataTmp.push(result.datos[i].valor)
                        if (nLabels < nInfo) {
                            labels.push(result.datos[i].fecha)
                        }
                        if (cont === nInfo - 1) {
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

    cargar(codigoempresa) {
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

    componentDidMount() {
        if (this.codigoempresa === 'Completa') this.cargarTodo()
        else this.cargar(this.codigoempresa)
    }

    render() {
        const { labels, datasets, isLoaded } = this.state

        let data = {
            labels: labels,
            datasets: datasets
        }

        let chartOptions = {

            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines: true,

            //String - Colour of the grid lines
            scaleGridLineColor: "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth: 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,

            //Boolean - Whether the line is curved between points
            bezierCurve: true,

            //Number - Tension of the bezier curve between points
            bezierCurveTension: 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot: true,

            //Number - Radius of each point dot in pixels
            pointDotRadius: 4,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth: 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius: 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke: true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth: 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill: true,

            //Boolean - Whether to horizontally center the label and point dot inside the grid
            offsetGridLines: false
        }

        if (isLoaded) return (
            <LineChart data={data} options={chartOptions}
                width={'600'}
                height={'250'}
            />
        )
        else return cargando
    }
}

export default ChartLine