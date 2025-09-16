import { Calendar, CheckSquare, Clock, Plus } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Active Reminders', value: '12', icon: Clock, color: 'text-blue-600' },
    { name: 'Completed Tasks', value: '24', icon: CheckSquare, color: 'text-green-600' },
    { name: 'Upcoming Events', value: '5', icon: Calendar, color: 'text-purple-600' },
    { name: 'Total Lists', value: '8', icon: Plus, color: 'text-orange-600' },
  ];

  const recentReminders = [
    { id: 1, title: 'Team meeting', time: '2:00 PM today', status: 'upcoming' },
    { id: 2, title: 'Buy groceries', time: '6:00 PM today', status: 'upcoming' },
    { id: 3, title: 'Call dentist', time: 'Tomorrow 9:00 AM', status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your reminders and lists</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reminders</h3>
          <div className="space-y-3">
            {recentReminders.map((reminder) => (
              <div key={reminder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{reminder.title}</p>
                  <p className="text-sm text-gray-500">{reminder.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${reminder.status === 'upcoming'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {reminder.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center p-3 text-left bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors bg-black">
              <Plus className="w-5 h-5 mr-3" />
              Create New Reminder
            </button>
            <button className="w-full flex items-center p-3 text-left bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors bg-black">
              <CheckSquare className="w-5 h-5 mr-3" />
              Create New List
            </button>
            <button className="w-full flex items-center p-3 text-left bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors bg-black">
              <Calendar className="w-5 h-5 mr-3" />
              View Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;