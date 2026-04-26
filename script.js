const authForm = document.getElementById('authForm');
const bgContainer = document.getElementById('bg-container');
let isRegistering = false;

// --- WALLPAPER SYSTEM ---
document.getElementById('wall-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const url = event.target.result;
        applyWallpaper(url, file.type);
    };
    reader.readAsDataURL(file);
});

function applyWallpaper(url, type) {
    bgContainer.innerHTML = '';
    if (type.includes('video')) {
        const video = document.createElement('video');
        video.src = url; video.autoplay = true; video.loop = true; video.muted = false;
        video.style.width = '100%'; video.style.height = '100%'; video.style.objectFit = 'cover';
        bgContainer.appendChild(video);
    } else {
        bgContainer.style.background = `url(${url}) center/cover no-repeat`;
    }
    localStorage.setItem('customWall', JSON.stringify({url, type}));
}

function saveWallpaper() { alert("Wallpaper Saved to LocalStorage!"); }

function resetWallpaper() {
    localStorage.removeItem('customWall');
    location.reload();
}

// Load wallpaper on boot
window.onload = () => {
    const saved = localStorage.getItem('customWall');
    if (saved) {
        const {url, type} = JSON.parse(saved);
        applyWallpaper(url, type);
    }
};

// --- AUTH SYSTEM ---
function switchAuth(e, mode) {
    e.preventDefault();
    isRegistering = mode === 'reg';
    document.getElementById('auth-title').innerText = isRegistering ? 'REGISTER' : 'LOGIN';
    document.getElementById('authBtn').innerText = isRegistering ? 'Register' : 'Sign In';
    document.getElementById('toggle-text').innerHTML = isRegistering ? 
        'Have an account? <a href="#" onclick="switchAuth(event, \'login\')">Login</a>' :
        'New here? <a href="#" onclick="switchAuth(event, \'reg\')">Create Account</a>';
}

authForm.onsubmit = (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (isRegistering) {
        localStorage.setItem(`user_${user}`, pass);
        alert("Registration Success! Please Login.");
        switchAuth(e, 'login');
    } else {
        const savedPass = localStorage.getItem(`user_${user}`);
        if (savedPass && savedPass === pass) {
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('main-dashboard').style.display = 'flex';
        } else {
            alert("Invalid Credentials!");
        }
    }
};

// --- SEARCH BOT LOGIC ---
function handleSearch() {
    const input = document.getElementById('user-query');
    const chatBox = document.getElementById('chat-box');
    if (!input.value) return;

    chatBox.innerHTML += `<div class="user-msg">${input.value}</div>`;
    
    // Simple Search Response Logic
    setTimeout(() => {
        chatBox.innerHTML += `<div class="bot-msg">Searching for "${input.value}" in database... Results found: 124 videos, 50 photos.</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
    
    input.value = '';
}

function toggleSettings() {
    const panel = document.getElementById('settings-panel');
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}
