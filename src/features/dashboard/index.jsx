import { Calendar, CheckSquare, Clock, Plus, AlertCircle } from 'lucide-react';
import { useListsOperations } from '../lists/hooks/useListsQuery';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { lists, isLoading } = useListsOperations();

  // Calculate stats from actual data
  const stats = [
    { name: 'Active Reminders', value: '0', icon: Clock, color: 'text-blue-600' },
    { name: 'Completed Tasks', value: '0', icon: CheckSquare, color: 'text-green-600' },
    { name: 'Upcoming Events', value: '0', icon: Calendar, color: 'text-purple-600' },
    { name: 'Total Lists', value: lists?.length?.toString() || '0', icon: Plus, color: 'text-orange-600' },
  ];

  // Get upcoming reminders from all lists
  const upcomingReminders = [];
  if (lists) {
    lists.forEach(list => {
      if (list.items) {
        list.items.forEach(item => {
          if (item.scheduledAt && !item.isCompleted) {
            const reminderDate = new Date(item.scheduledAt);
            const now = new Date();
            const isOverdue = reminderDate < now;
            upcomingReminders.push({
              ...item,
              reminderDate,
              isOverdue,
              listName: list.name
            });
          }
        });
      }
    });
  }

  // Sort by date and take first 5
  upcomingReminders.sort((a, b) => a.reminderDate - b.reminderDate);
  const recentReminders = upcomingReminders.slice(0, 5);

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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Reminders</h3>
          <div className="space-y-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
              </div>
            ) : recentReminders.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                <p>No upcoming reminders</p>
                <button
                  onClick={() => navigate('/dashboard/lists')}
                  className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  Create your first reminder
                </button>
              </div>
            ) : (
              recentReminders.map((reminder) => (
                <div key={reminder.id} className={`flex items-center justify-between p-3 rounded-lg ${
                  reminder.isOverdue ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                }`}>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {reminder.isOverdue && <AlertCircle className="w-4 h-4 text-red-500" />}
                      <p className="font-medium text-gray-900">{reminder.content}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {reminder.reminderDate.toLocaleDateString()} at {reminder.reminderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-xs text-gray-400">in {reminder.listName}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    reminder.isOverdue
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {reminder.isOverdue ? 'Overdue' : 'Upcoming'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard/lists')}
              className="w-full flex items-center p-3 text-left bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Plus className="w-5 h-5 mr-3" />
              Quick Add Item/Reminder
            </button>
            <button
              onClick={() => navigate('/dashboard/lists')}
              className="w-full flex items-center p-3 text-left bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
            >
              <CheckSquare className="w-5 h-5 mr-3" />
              Manage Lists
            </button>
            <button
              onClick={() => navigate('/dashboard/settings')}
              className="w-full flex items-center p-3 text-left bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;