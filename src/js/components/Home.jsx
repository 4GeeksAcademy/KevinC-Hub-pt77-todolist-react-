import React, { useEffect, useState } from "react";


const Home = () => {
	const [ inputValue, setInputValue ] = useState("")
	const [ todos, setTodos ] = useState([])

	useEffect(()=> {
        getUser()
    },[])
    
    const addToList = async (e) => {
        e.preventDefault();
        let ToDo = {label: inputValue, is_done: false}
        let response = await fetch('https://playground.4geeks.com/todo/todos/KevinC-Hub', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(ToDo)
        })
        let data = await response.json()
        getUser()
        setInputValue("")
    };
    const removeToDo = async (id) =>{
        let deleteResponse = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
        })
		getUser()
    };
    const getUser = async() => {
        let response = await fetch('https://playground.4geeks.com/todo/users/KevinC-Hub')
        let data = await response.json()
        console.log(data)
        if(typeof data.name !='undefined') {
            setTodos(data.todos)
            console.log(data.name)
        }
        else {
            let response = await fetch('https://playground.4geeks.com/todo/users/KevinC-Hub',{
                method: "POST",
                headers: { "Content-type": "application/json" },
            })
            let data = await response.json()
			setTodos(data.todos)
        }
    };

	return (
		<div className="container">
			<h1>My ToDo List</h1>
			<ul>
				<li>
					<input 
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								addToList(e)
							}
						}}
						placeholder="What do you need to do?"></input>
				</li>
				{todos.map((item, index) => (
					<li key = {item.id}>
						{item.label}{""} 
						<i 
							className="fa-regular fa-x"
							onClick={()=> 
							{removeToDo(item.id)}
							}></i>
					</li>
				))}
			</ul>
			<div>{todos.length} tasks</div>
		</div>
	);
};



export default Home;