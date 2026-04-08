export const siteConfig = {
	title: 'Kike Dev\'s | Full Stack Developer',
	description: 'Desarrollador Full Stack especializado en crear soluciones digitales escalables, modernas y de alto rendimiento. Transformo ideas en código que impulsa tu negocio.',
	author: 'Enrique A. Pacheco',
	shortName: 'Kike Dev\'s',
	email: 'kikedevelopers@gmail.com',
	github: 'https://github.com/kikedevelopers',
	linkedin: 'https://www.linkedin.com/in/kikepacheco/',
	twitter: ''
};

export const navItems = [
	{ label: 'Inicio', href: '#home' },
	{ label: 'Sobre Mí', href: '#about' },
	{ label: 'Skills', href: '#skills' },
	{ label: 'Proyectos', href: '#projects' },
	{ label: 'Contacto', href: '#contact' }
];

export const skills = [
	{ name: 'React', category: 'Frontend', level: 95, icon: 'react' },
	{ name: 'TypeScript', category: 'Frontend', level: 92, icon: 'typescript' },
	{ name: 'Tailwind CSS', category: 'Frontend', level: 90, icon: 'css' },
	{ name: 'Redux Toolkit', category: 'Frontend', level: 88, icon: 'redux' },
	{ name: 'Electron', category: 'Frontend', level: 85, icon: 'electron' },
	{ name: 'React Native', category: 'Frontend', level: 82, icon: 'mobile' },
	{ name: 'Node.js & Express', category: 'Backend', level: 93, icon: 'nodejs' },
	{ name: 'NestJS', category: 'Backend', level: 87, icon: 'nestjs' },
	{ name: 'Socket.io', category: 'Backend', level: 88, icon: 'websocket' },
	{ name: 'MongoDB', category: 'Database', level: 90, icon: 'mongodb' },
	{ name: 'PostgreSQL', category: 'Database', level: 85, icon: 'postgresql' },
	{ name: 'MySQL', category: 'Database', level: 83, icon: 'mysql' },
	{ name: 'SQLite', category: 'Database', level: 80, icon: 'sqlite' },
	{ name: 'Docker', category: 'DevOps', level: 82, icon: 'docker' },
	{ name: 'Git & CI/CD', category: 'DevOps', level: 88, icon: 'git' },
	{ name: 'GCP', category: 'DevOps', level: 78, icon: 'cloud' },
	{ name: 'Performance Opt.', category: 'Quality', level: 88, icon: 'performance' },
	{ name: 'Claude Code', category: 'AI', level: 92, icon: 'ai' },
	{ name: 'Windsurf', category: 'AI', level: 90, icon: 'ai' }
];

export const projects = [
	{
		id: 1,
		title: 'Sistema POS Multi-Sucursal',
		description: 'Plataforma de punto de venta completa con sincronización en tiempo real entre sucursales, gestión de inventario y reportes de ventas.',
		technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Electron'],
		github: 'https://github.com',
		demo: 'https://demo.com'
	},
	{
		id: 2,
		title: 'Dashboard Analytics',
		description: 'Panel de control con visualización de datos en tiempo real, gráficos interactivos y generación automática de reportes exportables.',
		technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Redis'],
		github: 'https://github.com',
		demo: 'https://demo.com'
	},
	{
		id: 3,
		title: 'API Gateway Microservices',
		description: 'Arquitectura de microservicios con autenticación JWT, rate limiting, documentación Swagger y despliegue con Docker.',
		technologies: ['NestJS', 'PostgreSQL', 'Docker', 'Redis', 'JWT'],
		github: 'https://github.com',
		demo: null
	},
	{
		id: 4,
		title: 'E-Commerce Platform',
		description: 'Tienda online completa con pasarela de pagos, gestión de productos, carrito de compras y panel administrativo.',
		technologies: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
		github: 'https://github.com',
		demo: 'https://demo.com'
	}
];

export const aboutData = {
	quote: '"Transformando ideas en código, código en soluciones, soluciones en éxito."',
	description: 'Soy Enrique A. Pacheco, Full Stack Developer apasionado por crear experiencias digitales excepcionales. Especializado en el ecosistema JavaScript, combino creatividad técnica con pensamiento estratégico para desarrollar soluciones que no solo funcionan, sino que destacan.',
	highlights: [
		{
			title: 'Arquitectura Frontend',
			description: 'Interfaces modernas con React y Next.js, enfocadas en performance, accesibilidad y experiencia de usuario impecable.',
			icon: 'code'
		},
		{
			title: 'Backend Escalable',
			description: 'APIs robustas y eficientes con Node.js, NestJS y Express, diseñadas para crecer con tu negocio.',
			icon: 'server'
		},
		{
			title: 'Calidad Premium',
			description: 'Código limpio, testing integral y optimización continua. Tu proyecto merece lo mejor.',
			icon: 'check'
		}
	],
	stats: [
		{ value: '5+', label: 'Años de experiencia' },
		{ value: '50+', label: 'Proyectos exitosos' },
		{ value: '30+', label: 'Clientes satisfechos' },
		{ value: '100%', label: 'Compromiso total' }
	]
};
