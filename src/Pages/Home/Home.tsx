import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Datos para la gráfica
const graphData = [
	{ name: 'Con Auto', value: 17 },
	{ name: 'Sin Auto', value: 83 }
];

const Home: React.FC = () => {
	return (
		<div className="home">
			{/* Sección de Header */}
			<header className="home-header">
				<div className="home-header-content">
					<img
						src="/Images/Home-Image.png"
						alt="UniDrive"
						className="home-image"
					/>
					<div className="home-welcome">
						<h1>¡Bienvenido a UniDrive!</h1>
						<p>
							UniDrive es la solución perfecta para los estudiantes universitarios que buscan compartir un ride de manera fácil y segura.
							A través de nuestra plataforma, puedes encontrar otros estudiantes que viajan por la misma ruta, ¡y lo mejor es que puedes
							ganar dinero al ofrecer tu servicio de ride! Conecta, organiza y viaja.
						</p>
					</div>
				</div>
			</header>

			{/* Sección ¿Cómo Funciona? */}
			<section className="home-section">
				<div className="home-section-title-block">
					<h2>¿Cómo Funciona?</h2>
				</div>
				<div className="home-steps">
					<div className="home-step">
						<img
							src="/Images/icon-registro.png"
							alt="Registro Icono"
							className="home-step-icon"
						/>
						<h3>1. Regístrate</h3>
						<p>Crea una cuenta con tu correo institucional y accede a nuestra plataforma exclusiva para estudiantes universitarios.</p>
					</div>
					<div className="home-step">
						<img
							src="/Images/icon-publicar.png"
							alt="Publicar Icono"
							className="home-step-icon"
						/>
						<h3>2. Publica tu Ride</h3>
						<p>Publica tu ruta de viaje en el mapa, indicando punto de salida y destino, y deja que otros estudiantes se sumen a tu ride.</p>
					</div>
					<div className="home-step">
						<img
							src="/Images/icon-conducir.png"
							alt="Conducir Icono"
							className="home-step-icon"
						/>
						<h3>3. ¡Conduce y Gana!</h3>
						<p>Ofrece tu servicio y cobra por el ride. ¡Ayuda a tus compañeros y haz que tu viaje sea más económico!</p>
					</div>
				</div>
			</section>

			{/* Sección ¿Por qué elegirnos? */}
			<section className="home-why-choose-us">
				<div className="home-section-title-block">
					<h2>¿Por qué elegirnos?</h2>
				</div>
				<p>
					UniDrive facilita la conexión entre estudiantes, ya sea que tengan auto o no. Con el 17% de los estudiantes con auto y el 83% sin auto, nuestra plataforma ofrece una solución ideal para que todos puedan compartir sus viajes y reducir costos. ¡Conéctate con nosotros y haz que tu viaje sea más económico!
				</p>
			</section>

			{/* Sección Gráfico */}
			<section className="home-graph">
				<div className="home-graph-title-block">
					<h2>Distribución de Estudiantes con y sin Auto</h2>
				</div>
				<div className="graph-container">
					<div className="graph">
						<PieChart width={300} height={300}>
							<Pie
								data={graphData}
								cx="50%"
								cy="50%"
								innerRadius={70}
								outerRadius={100}
								fill="#8884d8"
								dataKey="value"
								labelLine={false}
								label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
							>
								<Cell fill="#82ca9d" />
								<Cell fill="#ff6666" />
							</Pie>
							<Tooltip />
							<Legend verticalAlign="bottom" align="center" />
						</PieChart>
					</div>
					<div className="graph-info">
						<p>
							¿Sabías qué? El 17% de los estudiantes universitarios cuenta con automovil personal, mientras que el 83% depende de otras opciones de transporte.
						</p>
						<p>
							UniDrive conecta a ambos grupos para que puedan optimizar sus viajes, reducir costos y compartir experiencias. ¡Sé parte del cambio con nosotros!
						</p>
					</div>
				</div>
			</section>

			{/* Sección Call to Action */}
			<section className="home-cta">
				<h2>Únete a la Comunidad UniDrive</h2>
				<p>Descubre cómo UniDrive puede transformar tu manera de viajar y compartir gastos. ¡Empieza a compartir tu ride hoy mismo!</p>
				<img
					src="/Images/Unete.jpg"
					alt="Únete a UniDrive"
					className="home-unete-image"
				/>
				<Link to="/registrar">
					<button>
						¡Regístrate Ahora!
					</button>
				</Link>
			</section>
		</div>
	);
};

export default Home;