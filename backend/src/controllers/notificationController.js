import { Notification } from '../models/Notification.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const filter = {};

    // Filter notifications for user if not Admin fallback
    if (userId && userId !== 'admin-fallback') {
      filter.$or = [{ receiver: userId }, { receiver: null }];
    }

    const notifications = await Notification.find(filter).sort('-createdAt').limit(50);
    return sendSuccess(res, 'Notifications fetched successfully.', notifications);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!notification) return sendError(res, 'Notification not found.', 404);
    return sendSuccess(res, 'Notification marked as read.', notification);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const createNotification = async (req, res) => {
  try {
    const { title, message, receiver, type } = req.body;
    const notification = await Notification.create({
      title,
      message,
      receiver: receiver || null,
      type: type || 'System'
    });
    return sendSuccess(res, 'Notification created successfully.', notification, 201);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};
