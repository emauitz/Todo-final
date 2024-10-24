import PropTypes from "prop-types";

const CardTarea = ({ tarea }) => {
    if (!tarea) {
        return <div>Datos de la tarea no disponibles</div>;
    }

    const { nombre, fechaLimite, horaLimite, tipoTarea } = tarea;
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{nombre}</h5>
                <p className="card-text">Fecha Límite: {fechaLimite}</p>
                <p className="card-text">Hora Límite: {horaLimite}</p>
                <p className="card-text">Tipo de Tarea: {tipoTarea}</p>
            </div>
        </div>
    );
};

CardTarea.propTypes = {
    tarea: PropTypes.shape({
        nombre: PropTypes.string.isRequired,
        fechaLimite: PropTypes.string.isRequired,
        horaLimite: PropTypes.string.isRequired,
        tipoTarea: PropTypes.string.isRequired,
    }).isRequired,
};

export default CardTarea;
