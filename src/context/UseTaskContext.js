import { useContext } from 'react';
import TaskContext from './TaskContext.jsx'

const useTaskContext = () => useContext(TaskContext);

export default useTaskContext;
