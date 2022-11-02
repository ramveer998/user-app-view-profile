import { useState, useEffect } from 'react'
import swal from 'sweetalert';

const User = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        let fetchData = async () => {
            let response = await fetch("https://api.github.com/users")
            let resp = await response.json()
            setUsers(resp)
        }
        fetchData()
    }, [])

    const clearAll = () => {
        swal("", "You rejected all!", "success");
        setUsers([])
    }

    const handleDelete = (id, name) => {
        swal(name, "You rejected!", "success", {
            button: "Aww yiss!"
        });

        setUsers(users.filter(val => val.id != id))
    }

    return (
        <div>
            <div className='user-header'>
                <h1>Total Users: {users.length}</h1>
                <button className='btn-get-clear-all' onClick={clearAll} >Reject All</button>
            </div>
            <div className="grid-container">
                {users.map(user => {
                    return <div className='card' key={user.id}>
                        <div className='user-img'>
                            <img src={user.avatar_url} alt="" />
                        </div>
                        <div className='user-details'>
                            <h1>{user.login}</h1>
                        </div>
                        <div className='user-delete'>
                            <a className='btn-get-follow' target='_blank' href={user.html_url}>View Profile</a>
                            <button className='btn-get-deleted' onClick={() => handleDelete(user.id, user.login)} >Reject</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default User