import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Loginweb(props) {
    const host = "http://localhost:5000";
    const [cred, setcred] = useState({
        email: "", password: ""
    })
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem("token", json.authtoken);
            props.showalert("Account is Present", "success");
            history.push("/");
        }
        else {
            props.showalert("Invalid Information", "danger");
        }
    }
    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })  //here it means to add the note in the existing note
    }
    return (
        <div>
            <h2>Login to Continue in iNoteBook</h2>
            <form onSubmit={handleSubmit}> {/*form pe submit hota hai button pe nahi */}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={cred.email} id="email" onChange={onChange} name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={cred.password} id="password" name='password' />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
