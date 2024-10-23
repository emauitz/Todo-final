import PropTypes from "prop-types";

    const CardTarea = ({ tarea }) => {
        const { nombre, fechaLimite, horaLimite, tipoTarea } = tarea;


        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    <p className="card-text">Fecha Límite: {fechaLimite}</p>
                    <p className="card-text">Hora Límite: {horaLimite}</p>
                    <p className="card-text">Tipo de Tarea: {tipoTarea}</p>
                    {/* Otros detalles de la tarea */}
                </div>
            </div>
        );
    };

    CardTarea.propTypes = {
        tarea: PropTypes.string.isRequired
    };

    export default CardTarea;
