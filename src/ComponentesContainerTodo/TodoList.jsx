import useTaskContext from '../context/UseTaskContext.js';
import CardTarea from '../Components/CardTarea.jsx';
//import { collection, getDocs } from "firebase/firestore";
//import BBDD from "../config/firebase.js";
//import { useEffect, useState } from "react";
const TodoList = () => {
    const { state } = useTaskContext();
    const { tasks } = state;

    if (!tasks || tasks.length === 0) {
        return <p>No hay tareas disponibles</p>;
    }

    return (
        <div className="todo-list">
            {tasks.map((tarea) => (
                <CardTarea key={tarea.id} tarea={tarea} />
            ))}
        </div>
    );
};

export default TodoList;

// const TodoList = () => {
//     const { state } = useTaskContext();
//     const { tasks } = state;
//     const [tareas, setTareas] = useState([]);
//     useEffect(() => {
//       const collectionsRef = collection(BBDD.db, "tareas");
//       getDocs(collectionsRef).then((snaps) => {
//         const { docs } = snaps;
//         const list = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//         console.log(list); //
//         setTareas(list);
//       });
//     }, []);
//     return (
//       <>
//         <h1>Tareas Pendientes</h1>
//         {tareas.map((tareas) => (
//           <div key={tareas.id}>
//             <p>Nombre: {tareas.description}</p>
//             <p>fecha limite: {tareas.fecha}</p>
//             <p>hora limite: {tareas.hora}</p>
//             <p>tipo: {tareas.tipo}</p>
            
//           </div>
//         ))}
//       </>
//     );
//   };
  
//   export default TodoList;
