import { useState, useEffect } from 'react'
import Header from './Header'
import Tasks from './Tasks'
import AddTask from './AddTask'
import Footer from './Footer'

const TaskWrapper = () => {
    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([])
  
    useEffect(() => {
      const getTasks = async () => {
        const tasksFromServer = await fetchTasks()
  
        setTasks(tasksFromServer)
      }
  
      getTasks()
    }, [])
  
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
  
      const data = await res.json()
  
      return data
    }
  
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
  
      const data = await res.json()
  
      return data
    }
  
    // Add Task
    const addTask = async (task) => {
      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
  
      const data = await res.json()
  
      setTasks([...tasks, data])
    }
  
    // Delete Task
    const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE'
      })
  
      setTasks(tasks.filter((task) => task.id !== id))
    }
  
    // Toggle Reminder
    const toggleReminder = async (id) => {
      const taskToToggle = await fetchTask(id)
      const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
  
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      })
  
      const data = await res.json()
  
      setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
    }
  
    return (
        <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
            <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> 
        ) : (
            'No tasks available'
        )}
        <Footer />
        </div>
    )
}

export default TaskWrapper