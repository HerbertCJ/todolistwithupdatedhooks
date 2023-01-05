import { useEffect, useState } from 'react';

import './ToDoList.css'

export default function Container() {
    const [list, setList] = useState([])
    const [task, setTask] = useState('')

    function handleChange(e) {
        setTask(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();        
        let valid = validation(task)
        if (valid === 1) return;

        let newTask = {
            id: new Date().getTime(),
            text: task,
        }

        setList([...list, newTask])
        setTask('')
    }

    function handleDelete(index) {
        let newList = [...list]
        newList.splice(index, 1)
        setList([...newList])
    }

    function validation(taskExist) {
        if (taskExist.trim() === '') return 1;
        let checkList = [...list]
        let flag = 0;
        checkList.map((item) => {
            if (item.text === taskExist) {
                flag = 1;
            }
            return 0;
        })
        if (flag === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    return (
        <div className="main">
            <form action="#" onSubmit={handleSubmit}>
                <h3>To Do List</h3>
                <p>Write down here your note</p>
                <input type="text" onChange={handleChange} value={task} />
                <button>Add</button>
            </form>
            <div>
                {list.map(
                    (item, index) => (
                        <div key={item.text}>
                            {item.text}
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                        
                    ))}
            </div>
        </div>
    )

}