
import PropTypes from 'prop-types';

const TaskForm = ({ createTask, name, handleInputChange,isEditing ,updateTask}) => {
    return (
      <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
        <input
          type="text"
          placeholder="Add a task"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <button type="submit">{isEditing ? "Edit":"Add"}</button>
      </form>
    );
  };
  
  TaskForm.propTypes = {
    createTask: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    isEditing: PropTypes.string.isRequired,
    updateTask:PropTypes.func.isRequired,
  };
  
  export default TaskForm;
  