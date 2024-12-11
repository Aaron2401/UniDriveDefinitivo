import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login exitoso: redirigir al dashboard
        setError('');
        navigate('/dash');
      } else {
        // Mostrar error desde el backend o mensaje genérico
        setError(data.message || 'Credenciales incorrectas.');
      }
    } catch (err) {
      console.error('Error de red:', err);
      setError('Hubo un problema al iniciar sesión. Intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {/* Logo en la parte superior derecha */}
        <img
          src="\Images\Untitled@3x.png" // Asegúrate de que el logo esté en la carpeta adecuada
          alt="Logo"
          className="login-logo"
        />
        <img
          src="/Images/imagen-login.jpg"
          alt="Imagen decorativa para login"
          className="login-image"
        />
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Iniciar Sesión</h2>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce tu correo"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
              className="form-input"
            />
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>

          <div className="register-link">
            <p>¿No tienes una cuenta? <Link to="/registrar">Regístrate aquí</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;