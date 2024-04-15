const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      const token = jwt.sign({ email: user.email }, 'secretKey');
      res.status(200).json({ token });
    } catch (err) {
      console.error('Error iniciando sesión:', err.message);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });