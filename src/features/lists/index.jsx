import { useState } from 'react';
import { Plus, CheckSquare, Trash2, Edit, MoreVertical } from 'lucide-react';

const Lists = () => {
  const [lists, setLists] = useState([
    {
      id: 1,
      title: 'Shopping List',
      items: [
        { id: 1, text: 'Milk', completed: false },
        { id: 2, text: 'Bread', completed: true },
        { id: 3, text: 'Eggs', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Work Tasks',
      items: [
        { id: 4, text: 'Review code', completed: true },
        { id: 5, text: 'Update documentation', completed: false },
        { id: 6, text: 'Team meeting prep', completed: false }
      ]
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newList, setNewList] = useState({ title: '', items: [] });
  // const [editingItem, setEditingItem] = useState(null);

  const handleCreateList = (e) => {
    e.preventDefault();
    const list = {
      id: Date.now(),
      title: newList.title,
      items: []
    };
    setLists([...lists, list]);
    setNewList({ title: '', items: [] });
    setShowForm(false);
  };

  const deleteList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  const addItem = (listId, text) => {
    setLists(lists.map(list => 
      list.id === listId 
        ? {
            ...list,
            items: [...list.items, { id: Date.now(), text, completed: false }]
          }
        : list
    ));
  };

  const toggleItem = (listId, itemId) => {
    setLists(lists.map(list =>
      list.id === listId
        ? {
            ...list,
            items: list.items.map(item =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            )
          }
        : list
    ));
  };

  const deleteItem = (listId, itemId) => {
    setLists(lists.map(list =>
      list.id === listId
        ? {
            ...list,
            items: list.items.filter(item => item.id !== itemId)
          }
        : list
    ));
  };

  const getCompletionStats = (items) => {
    const completed = items.filter(item => item.completed).length;
    const total = items.length;
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lists</h1>
          <p className="text-gray-600">Organize your tasks with lists</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New List
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New List</h3>
          <form onSubmit={handleCreateList} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">List Title</label>
              <input
                type="text"
                value={newList.title}
                onChange={(e) => setNewList({ ...newList, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Create List
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.map((list) => {
          const stats = getCompletionStats(list.items);
          
          return (
            <div key={list.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{list.title}</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteList(list.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>{stats.completed} of {stats.total} completed</span>
                  <span>{Math.round(stats.percentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${stats.percentage}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {list.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3 flex-1">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleItem(list.id, item.id)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {item.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteItem(list.id, item.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.target.newItem;
                  if (input.value.trim()) {
                    addItem(list.id, input.value.trim());
                    input.value = '';
                  }
                }}
                className="flex space-x-2"
              >
                <input
                  name="newItem"
                  type="text"
                  placeholder="Add new item..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lists;