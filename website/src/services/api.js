const API_BASE_URL = 'http://localhost:5001/api';

// Menu API calls
export const menuAPI = {
    // Get all menu items
    getAllItems: async () => {
        try {
        const response = await fetch(`${API_BASE_URL}/menu`);
        if (!response.ok) throw new Error('Failed to fetch menu items');
        return await response.json();
        } catch (error) {
        console.error('Error fetching menu:', error);
        throw error;
        }
    },

    // Get menu items by category
    getByCategory: async (category) => {
        try {
        const response = await fetch(`${API_BASE_URL}/menu?category=${category}`);
        if (!response.ok) throw new Error('Failed to fetch menu items');
        return await response.json();
        } catch (error) {
        console.error('Error fetching menu by category:', error);
        throw error;
        }
    },

    // Get a single menu item by ID
    getItem: async (id) => {
        try {
        const response = await fetch(`${API_BASE_URL}/menu/${id}`);
        if (!response.ok) throw new Error('Failed to fetch menu item');
        return await response.json();
        } catch (error) {
        console.error('Error fetching menu item:', error);
        throw error;
        }
    }
};

// Order API calls
export const orderAPI = {
    // Create new order
    createOrder: async (orderData) => {
        try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        if (!response.ok) throw new Error('Failed to create order');
        return await response.json();
        } catch (error) {
        console.error('Error creating order:', error);
        throw error;
        }
    },

    // Get all orders
    getAllOrders: async () => {
        try {
        const response = await fetch(`${API_BASE_URL}/orders`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        return await response.json();
        } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
        }
    },

    // Get a single order by ID
    getOrder: async (id) => {
        try {
        const response = await fetch(`${API_BASE_URL}/orders/${id}`);
        if (!response.ok) throw new Error('Failed to fetch order');
        return await response.json();
        } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
        }
    },

    // Update order status
    updateOrder: async (id, updateData) => {
        try {
        const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
        });
        if (!response.ok) throw new Error('Failed to update order');
        return await response.json();
        } catch (error) {
        console.error('Error updating order:', error);
        throw error;
        }
    }
};