import { sendFormData, sendJsonData } from './apiUtils';

export const loginUser = async (formData) => {
    return sendFormData('/api/signin', formData);
};

export const registerUser = async (formData) => {
    return sendJsonData('/api/user/register', formData, 'post');
};

export const sendPasswordUpdateEmail = async (formData) => {
    return sendJsonData('/api/user/password', formData, 'post');
};

export const updatePassword = async (formData) => {
    return sendJsonData('/api/user/password', formData, 'put');
};

export const updateUsername = async (formData) => {
    return sendJsonData('/api/user/private/username', formData, 'put');
};

export const updateEmail = async (formData) => {
    return sendJsonData('/api/user/private/email', formData, 'put');
};

export const logoutUser = async () => {
    return sendJsonData('/api/user/logout', [], 'post');
};

export const getAuth = async () => {
    return sendJsonData('/api/user/private/auth', [], 'get');
};

export const getUserList = async () => {
    return sendJsonData('/api/user/admin/users', [], 'get');
};

export const deleteUser = async (formData) => {
    return sendJsonData('/api/user/admin/disable', formData, 'delete');
};

export const updateRoleToUser = async (formData) => {
    return sendJsonData('/api/user/admin/role/user', formData, 'put');
};

export const updateRoleToAdmin = async (formData) => {
    return sendJsonData('/api/user/admin/role/admin', formData, 'put');
};

export const getMenuItemUserList = async () => {
    return sendJsonData('/api/user/private/users/active', [], 'get');
};

export const getuserIdUsernameList = async () => {
    return sendJsonData('/api/user/private/users/all', [], 'get');
};