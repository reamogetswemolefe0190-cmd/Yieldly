const express = require('express');
const { getDb } = require('../database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const db = getDb();
    const stokvels = db.data.stokvels.map(s => {
      const members = db.data.stokvelMembers.filter(m => m.stokvel_id === s.id);
      const admin = db.data.users.find(u => u.id === s.admin_id);
      return {
        id: s.id,
        name: s.name,
        description: s.description,
        goal: s.goal,
        customGoal: s.custom_goal,
        duration: s.duration,
        monthlyContribution: s.monthly_contribution,
        maxMembers: s.max_members,
        currentMembers: members.length,
        riskAppetite: s.risk_appetite,
        privacy: s.privacy,
        adminId: s.admin_id,
        adminName: admin?.name || 'Unknown',
        createdAt: s.created_at
      };
    });
    
    res.json(stokvels);
  } catch (error) {
    console.error('Get stokvels error:', error);
    res.status(500).json({ error: 'Failed to fetch stokvels' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const db = getDb();
    const stokvel = db.data.stokvels.find(s => s.id === req.params.id);
    
    if (!stokvel) {
      return res.status(404).json({ error: 'Stokvel not found' });
    }

    const members = db.data.stokvelMembers
      .filter(m => m.stokvel_id === req.params.id)
      .map(m => {
        const user = db.data.users.find(u => u.id === m.user_id);
        return {
          id: m.user_id,
          name: user?.name || 'Unknown',
          role: m.role,
          contributionStatus: m.contribution_status
        };
      });

    res.json({
      id: stokvel.id,
      name: stokvel.name,
      description: stokvel.description,
      goal: stokvel.goal,
      customGoal: stokvel.custom_goal,
      duration: stokvel.duration,
      monthlyContribution: stokvel.monthly_contribution,
      maxMembers: stokvel.max_members,
      currentMembers: members.length,
      riskAppetite: stokvel.risk_appetite,
      privacy: stokvel.privacy,
      members,
      createdAt: stokvel.created_at
    });
  } catch (error) {
    console.error('Get stokvel error:', error);
    res.status(500).json({ error: 'Failed to fetch stokvel' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, goal, customGoal, duration, monthlyContribution, maxMembers, riskAppetite, privacy } = req.body;
    
    const db = getDb();
    const now = new Date().toISOString();
    
    const newStokvel = {
      id: Date.now().toString(),
      name,
      description,
      goal,
      custom_goal: customGoal,
      duration,
      monthly_contribution: monthlyContribution,
      max_members: maxMembers,
      risk_appetite: riskAppetite,
      privacy,
      admin_id: req.user.userId,
      created_at: now
    };
    
    db.data.stokvels.push(newStokvel);
    
    // Add creator as admin member
    db.data.stokvelMembers.push({
      id: Date.now().toString() + '_m',
      stokvel_id: newStokvel.id,
      user_id: req.user.userId,
      role: 'admin',
      contribution_status: 'paid',
      joined_at: now
    });
    
    await db.write();

    res.status(201).json({ id: newStokvel.id, message: 'Stokvel created' });
  } catch (error) {
    console.error('Create stokvel error:', error);
    res.status(500).json({ error: 'Failed to create stokvel' });
  }
});

router.post('/:id/join', authenticateToken, async (req, res) => {
  try {
    const db = getDb();
    const stokvelId = req.params.id;
    const userId = req.user.userId;

    const existing = db.data.stokvelMembers.find(m => m.stokvel_id === stokvelId && m.user_id === userId);
    if (existing) {
      return res.status(409).json({ error: 'Already a member' });
    }

    const stokvel = db.data.stokvels.find(s => s.id === stokvelId);
    const memberCount = db.data.stokvelMembers.filter(m => m.stokvel_id === stokvelId).length;
    
    if (memberCount >= stokvel.max_members) {
      return res.status(400).json({ error: 'Stokvel is full' });
    }

    db.data.stokvelMembers.push({
      id: Date.now().toString() + '_m',
      stokvel_id: stokvelId,
      user_id: userId,
      role: 'member',
      contribution_status: 'pending',
      joined_at: new Date().toISOString()
    });
    
    await db.write();

    res.json({ message: 'Joined successfully' });
  } catch (error) {
    console.error('Join stokvel error:', error);
    res.status(500).json({ error: 'Failed to join stokvel' });
  }
});

module.exports = router;
