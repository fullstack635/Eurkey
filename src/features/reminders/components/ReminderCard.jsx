import { Calendar, Clock, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { getPriorityColor } from '../utils/priorityHelpers';

const ReminderCard = ({ reminder, onToggleComplete, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <input
            type="checkbox"
            checked={reminder.completed}
            onChange={() => onToggleComplete(reminder.id)}
            className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${
              reminder.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {reminder.title}
            </h3>
            {reminder.description && (
              <p className={`text-sm mt-1 ${
                reminder.completed ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {reminder.description}
              </p>
            )}
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {format(reminder.date, 'PPP')}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {format(reminder.date, 'p')}
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(reminder.priority)}`}>
                {reminder.priority}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit?.(reminder)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(reminder.id)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;