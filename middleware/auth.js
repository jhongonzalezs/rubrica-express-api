const jwt = require('jsonwebtoken');

// Genera un token JWT si las credenciales son válidas
const login = (req, res) => {
    const { user, password } = req.body;
    if (user === 'admin' && password === '1234') {
        const token = jwt.sign({ user }, 'yourSecretKey', { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ message: 'Credenciales incorrectas' });
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token requerido' });

    // Log para verificar el token recibido
    console.log('Token recibido:', token);

    // Eliminar 'Bearer ' del token
    const bearerToken = token.split(' ')[1];
    
    // Verificar si bearerToken está presente
    if (!bearerToken) {
        return res.status(403).json({ message: 'Token requerido' });
    }

    jwt.verify(bearerToken, 'yourSecretKey', (err, decoded) => {
        if (err) {
            console.log('Error de verificación:', err);
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = decoded.user;
        next();
    });
};




module.exports = { login, verifyToken };
