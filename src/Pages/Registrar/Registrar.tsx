import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registrar.css';

const Registrar: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    universidad: 'UTC', // Valor por defecto, puede ser "UTC" o "Anahuac"
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      return 'Por favor, complete todos los campos obligatorios.';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Las contraseñas no coinciden.';
    }
    if (formData.password.length <= 6) {
      return 'La contraseña debe tener más de 6 caracteres.';
    }
    if (!formData.email.endsWith('@utcancun.edu.mx')) {
      return 'El correo debe tener el dominio @utcancun.edu.mx.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.name,
          email: formData.email,
          password: formData.password,
          universidad: formData.universidad, // Añadir la universidad al cuerpo de la solicitud
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('¡Registro exitoso!');
        navigate('/login');
      } else {
        setError(data.message || 'Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Hubo un error al realizar la solicitud. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {/* Imagen decorativa */}
        <img
          src="/Images/imagen-registro.jpeg"
          alt="Imagen de Registro"
          className="login-image"
        />
        
        {/* Logo en la parte superior derecha */}
        <img
          src="\Images\Untitled@3x.png" // Ajusta esta ruta según tu logo
          alt="Logo UTC"
          className="logo-image"
        />
        
        <div className="login-form">
          <h2>¡Regístrate y Únete!</h2>
          {error && <p className="error-message" role="alert">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="universidad">Universidad</label>
              <select
                id="universidad"
                name="universidad"
                value={formData.universidad}
                onChange={handleInputChange}
              >
                <option value="UTC">Universidad Tecnológica de Cancún</option>
                <option value="Anahuac">Anáhuac Cancún</option>
              </select>
            </div>
            <div className="form-group">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Registrando...' : 'Registrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrar;
