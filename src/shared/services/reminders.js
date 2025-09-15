import { apiClient } from './api';

export const remindersService = {
  // Get all reminders for the authenticated user
  async getReminders() {
    try {
      const response = await apiClient.get('/reminders/user');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch reminders');
    }
  },

  // Create a new reminder
  async createReminder(reminderData) {
    try {
      // Mock implementation
      const newReminder = {
        id: Date.now(),
        ...reminderData,
        date: new Date(reminderData.date),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        data: newReminder,
        message: 'Reminder created successfully'
      };
      
      // In production: return await apiClient.post('/reminders', reminderData);
    } catch (error) {
      throw new Error(error.message || 'Failed to create reminder');
    }
  },

  // Update an existing reminder
  async updateReminder(id, updates) {
    try {
      // Mock implementation
      const updatedReminder = {
        id,
        ...updates,
        updatedAt: new Date()
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        success: true,
        data: updatedReminder,
        message: 'Reminder updated successfully'
      };
      
      // In production: return await apiClient.put(`/reminders/${id}`, updates);
    } catch (error) {
      throw new Error(error.message || 'Failed to update reminder');
    }
  },

  // Delete a reminder
  async deleteReminder(reminderId) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        success: true,
        message: 'Reminder deleted successfully'
      };
      
      // In production: return await apiClient.delete(`/reminders/${id}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to delete reminder');
    }
  },

  // Toggle reminder completion
  async toggleReminderCompletion(reminderId, completed) {
    try {
      return await this.updateReminder(reminderId, { completed });
    } catch (error) {
      throw new Error(error.message || 'Failed to toggle reminder completion');
    }
  }
};