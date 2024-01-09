import { useEffect, useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";
import axios from "axios";
import { REACT_APP_API_URL } from "./utils/apiUrl";
import loadingImage from "../assets/loader.gif";


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    completed: false, // corrected typo here
  });

  const { name } = formData;

  // const apiUrl = process.env.REACT_APP_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createTask = async (e) => {
    e.preventDefault(); // Corrected typo here
    console.log(formData);
    if (name === "") {
      return toast.error("Input Field Can Not Be Empty");
    }
    try {
      await axios.post(`${REACT_APP_API_URL}/api/tasks`, formData);
      toast.success("Task Added Successfully");
      setFormData({ ...formData, name: "" });
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // get tasks
  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${REACT_APP_API_URL}/api/tasks`);
      // console.log("my resposne", data);
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${REACT_APP_API_URL}/api/tasks/${id}`);
      toast.success("Task Deleted Successfully");
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  //get single task

  const getSingleTask = async (task) => {
    setFormData({
      name: task.name,
      completed: false,
    });
    setTaskId(task._id);
    setIsEditing(true);
  };

  //update task

  const updateTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input Field Can Not Be Empty");
    }

    try {
      await axios.put(`${REACT_APP_API_URL}/api/tasks/${taskId}`,formData);
      toast.success("Task Updated Successfully");
      setFormData({ ...formData, name: "" });
      setIsEditing(false)
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed:true
    }
    try {
      await axios.put(`${REACT_APP_API_URL}/api/tasks/${task._id}`, newFormData)
      getTasks();

    } catch (error) {
       toast.error(error.message)
    }
  }

  useEffect(() => {
    const cTask = tasks.filter((task) => {
     return task.completed===true
    })  
    setCompletedTasks(cTask);
  },[tasks])
  
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {tasks.length>0 &&   <div className="--flex-between --pb">
        <p>
          <b>Total Tasks:</b> {tasks.length}
        </p>
        <p>
          <b>Completed Tasks:</b> {completedTasks.length}
        </p>
      </div> }
    
      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImage} alt="Loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">Not Task available Add task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskList;
