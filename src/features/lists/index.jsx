import { useState } from 'react';
import { Plus, ArrowLeft, Filter } from 'lucide-react';
import ListCard from './components/ListCard';
import ListForm from './components/ListForm';
import ItemCard from './components/ItemCard';
import ItemForm from './components/ItemForm';
import { useListsOperations } from './hooks/useListsQuery';
import { useAddItemToList, useToggleItemCompletion, useDeleteItem, useListItemsOperations } from './hooks/useListItemsQuery';

const Lists = () => {
  const {
    lists,
    isLoading: listsLoading,
    isError: listsError,
    error: listsErrorMessage,
    createList,
    updateList,
    deleteList,
    isCreating,
    isUpdating,
    isDeleting
  } = useListsOperations();

  // Item operations for inline management
  const addItemMutation = useAddItemToList();
  const toggleItemMutation = useToggleItemCompletion();
  const deleteItemMutation = useDeleteItem();

  const [showListForm, setShowListForm] = useState(false);
  const [editingList, setEditingList] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [showItemForm, setShowItemForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filters, setFilters] = useState({
    status: 'ACTIVE',
    isCompleted: false
  });

  // Get items for selected list
  const {
    items,
    isLoading: itemsLoading,
    addItem,
    updateItem,
    toggleCompletion,
    deleteItem,
    isAdding,
    isUpdating: itemUpdating,
    isDeleting: itemDeleting
  } = useListItemsOperations(selectedList?.id);

  // List handlers
  const handleCreateList = () => {
    setEditingList(null);
    setShowListForm(true);
  };

  const handleEditList = (list) => {
    setEditingList(list);
    setShowListForm(true);
  };

  const handleSubmitList = (listData) => {
    if (editingList) {
      updateList({ id: editingList.id, ...listData }, {
        onSuccess: () => {
          setShowListForm(false);
          setEditingList(null);
        }
      });
    } else {
      createList(listData, {
        onSuccess: () => {
          setShowListForm(false);
        }
      });
    }
  };

  const handleCancelList = () => {
    setShowListForm(false);
    setEditingList(null);
  };

  const handleViewList = (list) => {
    setSelectedList(list);
  };

  const handleBackToLists = () => {
    setSelectedList(null);
    setShowItemForm(false);
    setEditingItem(null);
  };

  // Item handlers
  const handleAddItem = () => {
    setEditingItem(null);
    setShowItemForm(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowItemForm(true);
  };

  const handleSubmitItem = (itemData) => {
    if (editingItem) {
      updateItem({ id: editingItem.id, ...itemData }, {
        onSuccess: () => {
          setShowItemForm(false);
          setEditingItem(null);
        }
      });
    } else {
      addItem(itemData, {
        onSuccess: () => {
          setShowItemForm(false);
        }
      });
    }
  };

  const handleCancelItem = () => {
    setShowItemForm(false);
    setEditingItem(null);
  };

  // Filter handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Inline item management handlers
  const handleAddItemInline = async (listId, itemData) => {
    return addItemMutation.mutateAsync({ listId, itemData });
  };

  const handleToggleItemInline = (itemId) => {
    toggleItemMutation.mutate(itemId);
  };

  const handleDeleteItemInline = (itemId) => {
    deleteItemMutation.mutate(itemId);
  };

  if (listsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (listsError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error al cargar las listas</p>
          <p className="text-sm text-gray-500">{listsErrorMessage?.message}</p>
        </div>
      </div>
    );
  }

  // If viewing a specific list and its items
  if (selectedList) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToLists}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedList.name}</h1>
              <p className="text-gray-600">{selectedList.description || 'Manage your list items'}</p>
            </div>
          </div>
          <button
            onClick={handleAddItem}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </button>
        </div>

        {/* Item Form */}
        {showItemForm && (
          <ItemForm
            onSubmit={handleSubmitItem}
            onCancel={handleCancelItem}
            initialData={editingItem}
            loading={isAdding || itemUpdating}
          />
        )}

        {/* Items List */}
        <div className="space-y-3">
          {itemsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No items in this list yet.</p>
              <button
                onClick={handleAddItem}
                className="mt-2 text-primary-600 hover:text-primary-700"
              >
                Add your first item
              </button>
            </div>
          ) : (
            items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={handleEditItem}
                onDelete={deleteItem}
                onToggleCompletion={toggleCompletion}
              />
            ))
          )}
        </div>
      </div>
    );
  }

  // Main lists view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lists</h1>
          <p className="text-gray-600">Organize your tasks and items into lists</p>
        </div>
        <button
          onClick={handleCreateList}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New List
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
        <Filter className="w-4 h-4 text-gray-500" />
        <div className="flex items-center space-x-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mr-2">Status:</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value="">All</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mr-2">Completed:</label>
            <select
              value={filters.isCompleted}
              onChange={(e) => handleFilterChange('isCompleted', e.target.value === 'true')}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value="">All</option>
              <option value="false">Incomplete</option>
              <option value="true">Complete</option>
            </select>
          </div>
        </div>
      </div>

      {/* List Form */}
      {showListForm && (
        <ListForm
          onSubmit={handleSubmitList}
          onCancel={handleCancelList}
          initialData={editingList}
          loading={isCreating || isUpdating}
        />
      )}

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 mb-4">No lists found.</p>
            <button
              onClick={handleCreateList}
              className="text-primary-600 hover:text-primary-700"
            >
              Create your first list
            </button>
          </div>
        ) : (
          lists.map((list) => (
            <ListCard
              key={list.id}
              list={list}
              onEdit={handleEditList}
              onDelete={deleteList}
              onView={handleViewList}
              onToggleItem={handleToggleItemInline}
              onAddItem={handleAddItemInline}
              onDeleteItem={handleDeleteItemInline}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Lists;