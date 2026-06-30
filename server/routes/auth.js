const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../database');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const db = getDb();
    
    const existing = db.data.users.find(u => u.email === email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password_hash: passwordHash,
      phone: null,
      id_number: null,
      address: null,
      employment_status: null,
      income_range: null,
      goal: null,
      custom_goal: null,
      duration: 12,
      risk_appetite: 'moderate',
      monthly_contribution: 1000,
      card_last4: null,
      bank_name: null,
      kyc_status: 'pending',
      onboarding_complete: false,
      created_at: now
    };
    
    db.data.users.push(newUser);
    await db.write();

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || 'yieldly-dev-secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        kycStatus: newUser.kyc_status,
        onboardingComplete: newUser.onboarding_complete
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const db = getDb();
    const user = db.data.users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'yieldly-dev-secret',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        idNumber: user.id_number,
        address: user.address,
        employmentStatus: user.employment_status,
        incomeRange: user.income_range,
        goal: user.goal,
        customGoal: user.custom_goal,
        duration: user.duration,
        riskAppetite: user.risk_appetite,
        monthlyContribution: user.monthly_contribution,
        cardLast4: user.card_last4,
        bankName: user.bank_name,
        kycStatus: user.kyc_status,
        onboardingComplete: user.onboarding_complete
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
