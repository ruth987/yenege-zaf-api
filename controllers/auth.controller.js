const User = require('../models/user.model');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Basic validation
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
  
      // Email uniqueness check
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' });
      }
  
      // Password validation
      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Registration failed' }); 
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body; 
    
        // Basic validation
        if (!email || !password) {
          return res.status(400).json({ error: 'Please provide email and password' });
        }
    
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
    
        // Compare password using bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
    
        // Generate JWT on successful login
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
          expiresIn: '1h',
        });
        res.status(200).json({ token });
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Login failed' }); // Generic error for client
      }
};


module.exports = { register, login };

