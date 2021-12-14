import './todolist.css'
const TodoList=(props)=>{

    return (
        <ul className="todolist_holder">
            {props.todoData.map((todo, mapid) => {
                return (
                <li key={mapid}>
                <button
                    onClick={()=>props.handleDelete(todo.id)}>🗑️</button>
                    {todo.text}
                </li>
                )
            })}
        </ul>
    )
}

export default TodoList

// add map key
