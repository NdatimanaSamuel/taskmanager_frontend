import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const Task = ({ task, index, deleteTask, getSingleTask,setToComplete }) => {
  return (
    <div className={task.completed ? "task completed" :"task"}>
      <p>
        <b>{index + 1} .</b>
        {task.name}
      </p>

      <div className="task-icons">
        <FaCheckDouble color="green" onClick={() =>
         setToComplete(task)
        } />
        <FaEdit color="purple" onClick={() =>
         getSingleTask(task)
        } />
        <FaRegTrashAlt color="red" onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
  getSingleTask: PropTypes.func.isRequired,
  setToComplete: PropTypes.func.isRequired,
};

export default Task;
