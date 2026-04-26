/**
 * System Storage Controller
 * Khusus untuk mengelola data user, wallpaper, dan sesi.
 */
const MyStorage = {
    // Menyimpan data (Otomatis jadi String)
    save: (key, value) => {
        const data = typeof value === 'object' ? JSON.stringify(value) : value;
        localStorage.setItem(key, data);
    },

    // Mengambil data (Otomatis jadi Object jika itu JSON)
    get: (key) => {
        const data = localStorage.getItem(key);
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    },

    // Menghapus data spesifik
    remove: (key) => {
        localStorage.removeItem(key);
    },

    // Hapus semua data (Reset System)
    clearAll: () => {
        localStorage.clear();
    }
};

