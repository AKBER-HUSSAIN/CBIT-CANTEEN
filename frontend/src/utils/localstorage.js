// utils/localStorage.js
export const setLocalStorageItem = (key, value) => {
    try {
        if (value) {
            localStorage.setItem(key, value);
        } else {
            console.error(`❌ Invalid value for ${key}`);
        }
    } catch (error) {
        console.error(`❌ Error setting ${key} in localStorage:`, error);
    }
};

export const getLocalStorageItem = (key) => {
    try {
        const value = localStorage.getItem(key);
        return value ? value : null; // Return null if not found
    } catch (error) {
        console.error(`❌ Error getting ${key} from localStorage:`, error);
        return null;
    }
};

export const removeLocalStorageItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`❌ Error removing ${key} from localStorage:`, error);
    }
};
