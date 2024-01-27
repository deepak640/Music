
import { useEffect, useState } from 'react';
import "./Admin.scss"
import { Button } from '@mui/material'
const Admin = () => {
    // -----------------javascript-------------
    const add = () => {
        document.querySelector(".login-popup").style.display = "flex"
        console.log();
    }
    const close = () => {
        document.querySelector(".login-popup").style.display = "none"
    }
    // ---------------
    const [account, setaccount] = useState({
        Name: "",
        Email: "",
        Phone: "",
        Password: ""
    })


    let username, values;
    const handleit = (e) => {
        username = e.target.name
        values = e.target.value
        setaccount({ ...account, [username]: values })

    }
    const accountdata = async (e) => {
        e.preventDefault()

        const { Name, Email, Phone, Password } = account

        const res = await fetch("https://mastimusic.herokuapp.com/register", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                Name,
                Email,
                Phone,
                Password
            })
        })

        if (res.status === 200) {
            document.querySelector(".login-popup").style.display = "none"
            window.location.reload()
        }

    }
    // ---------------------

    const [User, setUser] = useState({
        Name: ""
    })


    let Name, value;
    const handleinputs = (e) => {
        console.log(e)
        Name = e.target.name
        value = e.target.value
        setUser({ ...User, [Name]: value })
    }
    const del_user = async (e) => {
        e.preventDefault()

        const { Name } = User

        const res = await fetch("https://mastimusic.herokuapp.com/delete", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                Name
            })
        })

        if (res.status === 200) {
            console.log("success")
            window.location.reload();
        }
        else {
        }


    }
    // ----------------------------------------------

    const [record, setRecord] = useState([])

    const getData = () => {
        fetch('https://mastimusic.herokuapp.com/admin')
            .then(resposne => resposne.json())
            .then(res => setRecord(res))
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <>
            <div className="col main pt-5 mt-3 admin-div">
                <div className="Add">
                    <Button id='add-btn' onClick={add} variant='outlined'>Add</Button>
                </div>
                <div className="table-responsive">
                    <table className=" table  border border-primary">
                        <thead className="thead-light">
                            <tr>
                                <th>Client ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Password</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {record.slice(0, 99).map((data, index) =>
                                <tr>
                                    <td>{data._id.slice(0, 5)}</td>
                                    <td name={data.Name} value={User.Name = data.Name} onLoad={handleinputs}>{data.Name.charAt(0).toUpperCase() + data.Name.slice(1)}</td>
                                    <td>{data.Email}</td>
                                    <td>{data.Phone}</td>
                                    <td>{"#######"}</td>
                                    <td><Button variant='outlined' onClick={del_user} color="error">delete</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="login-popup">
                <div className="login-content">
                    <i onClick={close} className="fa-solid fa-xmark close"></i>
                    <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="" />
                    <form method='POST' onSubmit={accountdata}>
                        <input type="text" name="Name" value={account.Name} onChange={handleit} placeholder='Enter Name..' />
                        <input type="text" name="Email" value={account.Email} onChange={handleit} placeholder='Your Email' />
                        <input type="text" name="Phone" value={account.Phone} onChange={handleit} placeholder='Phone no.' />
                        <input type="text" name="Password" value={account.Password} onChange={handleit} placeholder='Password' />
                        <Button onClick={accountdata}>Register</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Admin