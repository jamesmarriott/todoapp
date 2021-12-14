import React from 'react'
import './globals.css';
import ToDoList from './components/TodoList'

function ToDoApp() {
 
  const [todoData, setTodoData ] = React.useState([])
  const [newToDo, setNewToDo] = React.useState('')

  React.useEffect(()=>{
    async function getTasks() {
      const tasksFromServer = await fetchTasks();
      setTodoData(tasksFromServer);
    }
    getTasks()
  },[])
  
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const adTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    const data = await res.json()
    setTodoData(prev =>
    [...prev, data])
    setNewToDo('')
  }


  const handleChange=(event)=>{
    setNewToDo(event.target.value)
  }

  const handleSubmit=(event)=>{

    // const task = {id: todoData.length, text: newToDo}
    event.preventDefault()

    if (event.keyCode === 13 || event.type === 'click' ) {

    if (newToDo  === '') {
      alert('Please add a task')
      return 
    }

    adTask({text: newToDo})
    }
    else return 
  }

  const handleDelete= async(id)=>{
      await fetch(`http://localhost:5000/tasks/${id}`, 
      {
        method: 'DELETE'
      })
    setTodoData(prev => (prev.filter((item)=> item.id !== id)))
  }


  return (
    <div className="container">
      <h1>To Do List</h1>
      {todoData.length === 0 ? <h1>Add an item</h1> : <ToDoList todoData={todoData} handleDelete={handleDelete}/>}
      <form className="input_holder">
          <input
            onChange={handleChange}
            name="newtodo"
            type="text"
            value={newToDo}
            placeholder='Add a task'
            />
          <button type="submit"
                  onClick={handleSubmit}>
                  ➕
          </button>
        </form>
      </div>
  )
}

export default ToDoApp;
