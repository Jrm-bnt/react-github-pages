import React, {useState} from 'react';
import {CONSTANT} from "../constant/constant";
import {useNavigate} from 'react-router-dom'

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = () => {
       navigate('/login')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${CONSTANT.BASE_URL}User/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            if (!response.ok) {
                throw new Error("L'enregistrement à échoué");
            }

           navigate('/login')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{minWidth: 0, display: "flex", justifyContent: "center"}} className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="text-form">
                    <label htmlFor="email">E-mail</label>
                    <input
                        className="input-form"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="text-form">
                    <label htmlFor="password">Password</label>
                    <input
                        className="input-form"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex-center">
                    <button type="submit">To register</button>
                    <button onClick={handleLogin}>Back</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
