import React from 'react'

class TotalIngresos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datos: props.datos
        }
    }

    render() {
        const { datos } = this.state
        let total = 0
        datos.map((dato) => {
            total += dato.saldo
        })
        return (
            <span> <h5> Fondos: {total.toFixed(2)}€ </h5> </span>
        )
    }
}

export default TotalIngresos