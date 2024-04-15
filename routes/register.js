const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }
    
    const hashear = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashear
    });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error('Error registrando usuario:', err.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;