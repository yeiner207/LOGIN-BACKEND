const { User } = require("../shared/utils");
const { generateToken } = require("../shared/utils/jwt");
const bcrypt = require("bcryptjs");

// ===================
// REGISTRO
// ===================
const Register = async (req, res) => {
    try {
        const { username, email, password, documentNumber } = req.body;

        // Validación básica
        if (!username || !email || !password || !documentNumber) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios",
                status: "error",
            });
        }

        // Verificar si ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                message: "El usuario ya existe",
                status: "error",
            });
        }

        // Encriptar password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            documentNumber,
        });

        // Generar token
        const token = generateToken({
            userId: user.id,
            version: "v1",
        });

        return res.status(201).json({
            message: "Usuario registrado exitosamente",
            status: "success",
            token,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error interno",
            status: "error",
            error: error.message,
        });
    }
};


// ===================
// LOGIN
// ===================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar datos
        if (!email || !password) {
            return res.status(400).json({
                message: "Correo y contraseña son obligatorios",
                status: "error",
            });
        }

        // Buscar usuario
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                status: "error",
            });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Credenciales incorrectas",
                status: "error",
            });
        }

        // Crear token
        const token = generateToken({
            userId: user.id,
            version: "v1",
        });

        return res.json({
            message: "Login exitoso",
            status: "success",
            token,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error interno",
            status: "error",
            error: error.message,
        });
    }
};

module.exports = {
    Register,
    login,
};

