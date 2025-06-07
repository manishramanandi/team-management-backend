const user = require('../models/User.js');

// dashboard summary
//
const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = req.user;

    const dashboardData = {
      user: {
        name: user.name,
        email: user.email,
        memberSince: user.createdAt
      },
      stats: {
        teamMembers: {
          count: Math.floor(Math.random() * 15 + 5,) // 5-20 members
          recent: [
            {name: 'Manish', role:'Backend dev', status: 'online'},
            {name: 'Rohit', role:'frontend dev', status: 'away'},
            {name: 'shubahm', role:'designer', status: 'online'},
            {name: 'ajay', role: 'team lead', status: 'offline'}
          ]
        },
        activeProjects: {
          count: Math.floor(Math.random() * 8) +3, // project 3-10
          recent: [
            {
              name: "mobile app design",
              progress: 75,
              status: 'in progress',
              deadline: '01-08-2025'
            },
            {
              name: 'website bug fix',
              progress: 45,
              status: 'in progress',
              deadline: '01--9-2005',
            },
            {
              name: 'API integration',
              progress: 90,
              status: 'review',
              deadline: '01-10-2025'
              
            }
          ]
        },
        notifications: {
          count: Math.floor(Math.random() * 10) + 2,
          unread : Math.floor(Math.random() *5) + 1,
          recent: [
            {
               id: 1,
              type: 'project',
              title: 'Project deadline approaching',
              message: 'mobile app design is due',
              time: '2 hours ago',
              read: false
            },
            {
              id: 2,
              type: 'team',
              title: 'new team member joined',
              message: 'pranit joined y team',
              time: '5 hr ago',
              read: false
            },
            {
             id: 3,
              type: 'system',
              message: 'y team weekly progress report is available',
              time: '1 day ago',
              read: true
            }
          ]
        }
      },
      weeklyProgress: [
          { day: 'Mon', tasks: 8, completed: 6 },
        { day: 'Tue', tasks: 12, completed: 10 },
        { day: 'Wed', tasks: 10, completed: 8 },
        { day: 'Thu', tasks: 15, completed: 12 },
        { day: 'Fri', tasks: 9, completed: 9 },
        { day: 'Sat', tasks: 5, completed: 4 },
        { day: 'Sun', tasks: 3, completed: 2 }
      ],
      quickActions: [
        { label: 'Create New Project', icon: 'plus', action: '/projects/new' },
        { label: 'Invite Team Member', icon: 'user-plus', action: '/team/invite' },
        { label: 'View Reports', icon: 'chart', action: '/reports' },
        { label: 'Settings', icon: 'settings', action: '/settings' }

      ]
    };

    res.json({
      success: true,
      message: 'dashboard data retrives successfully',
      data: dashboardData
    });
  } catch (error) {
    console.error('dashboard summary error:', error);
    res.status(500).json({
      success: false,
      message: 'server error while fatching dashbaord data'
    });
    }
},

  // recent activity
  const getRecentActivity = async (req, res) => {
    try {
      const activities = [
        {
          id: 1,
          type: 'project_update',
          user: 'manish',
          action: 'updated project status',
          target: 'backend architecture design',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // few hr ago
          details: 'change status from "in progress" to "review'
        },
        {
        
          id: 2,
          type: 'project_update',
          user: 'manish',
          action: 'updated project status',
          target: 'backend architecture design',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // few hr ago
          details: 'change status from "in progress" to "review'
        },{

          id: 3,
          type: 'project_update',
          user: 'manish',
          action: 'updated project status',
          target: 'backend architecture design',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // few hr ago
          details: 'change status from "in progress" to "review'
        }, {

          id: 4,
          type: 'project_update',
          user: 'manish',
          action: 'updated project status',
          target: 'backend architecture design',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // few hr ago
          details: 'change status from "in progress" to "review'
        }
      ];

      res.json({
        success: true,
        message: 'recent activity retirved successfully',
        data: { activities}
      });
    } catch (error) {
      console.error('Recert activity error:', error);
      res.status(500).json({
        success: false,
        message: ' server error while fetching recent activity'
    })
  }
  };

module.export = {
  getDashboardSummary,
  getRecentActivity
};





























