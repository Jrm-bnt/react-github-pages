import React, {useState} from 'react';
import {CONSTANT} from "../constant/constant";
import {useNavigate} from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleRegister = () => {
        navigate('/register')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${CONSTANT.BASE_URL}Login/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            if (!response.ok) {
                alert('Identifiants incorrects')
                throw new Error('Identifiants incorrects');
            }

            const data = await response.json();
            const token = data.token;

            // Stockez le token dans localStorage ou un autre endroit sécurisé
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);

           navigate('/react-github-pages')
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
                    <button type="submit">Login</button>
                    <button onClick={handleRegister}>Create account</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
