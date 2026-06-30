const express = require('express');
const { getDb } = require('../database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/me', authenticateToken, (req, res) => {
  try {
    const db = getDb();
    const user = db.data.users.find(u => u.id === req.user.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
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
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.patch('/me', authenticateToken, async (req, res) => {
  try {
    const db = getDb();
    const user = db.data.users.find(u => u.id === req.user.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const fieldMap = {
      phone: 'phone',
      idNumber: 'id_number',
      address: 'address',
      employmentStatus: 'employment_status',
      incomeRange: 'income_range',
      goal: 'goal',
      customGoal: 'custom_goal',
      duration: 'duration',
      riskAppetite: 'risk_appetite',
      monthlyContribution: 'monthly_contribution',
      cardLast4: 'card_last4',
      bankName: 'bank_name',
      kycStatus: 'kyc_status',
      onboardingComplete: 'onboarding_complete'
    };

    for (const [key, value] of Object.entries(req.body)) {
      if (fieldMap[key]) {
        user[fieldMap[key]] = value;
      }
    }

    await db.write();
    res.json({ message: 'Profile updated' });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
