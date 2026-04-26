let isRegisterMode = false;

// --- WALLPAPER SYSTEM ---
const wallInput = document.getElementById('wall-input');
const bgPhoto = document.getElementById('bg-photo');
const bgVideo = document.getElementById('bg-video');

wallInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        applyWallpaper(url, file.type);
    }
});

function applyWallpaper(url, type) {
    if (type.includes('video')) {
        bgPhoto.classList.remove('active');
        bgVideo.src = url;
        bgVideo.classList.add('active');
        bgVideo.muted = false; // Suara aktif
        bgVideo.play();
    } else {
        bgVideo.classList.remove('active');
        bgPhoto.src = url;
        bgPhoto.classList.add('active');
    }
}

function saveWallpaper() {
    const currentSrc = bgVideo.classList.contains('active') ? bgVideo.src : bgPhoto.src;
    localStorage.setItem('savedWallpaper', currentSrc);
    localStorage.setItem('isVid', bgVideo.classList.contains('active'));
    alert("Wallpaper Saved!");
}

function resetWallpaper() {
    localStorage.removeItem('savedWallpaper');
    location.reload();
}

// Load wallpaper on refresh
window.onload = () => {
    const saved = localStorage.getItem('savedWallpaper');
    const isVid = localStorage.getItem('isVid') === 'true';
    if (saved) applyWallpaper(saved, isVid ? 'video' : 'image');
};

// --- AUTH SYSTEM ---
function toggleAuthMode() {
    isRegisterMode = !isRegisterMode;
    document.getElementById('auth-title').innerText = isRegisterMode ? "REGISTER" : "LOGIN";
    document.getElementById('submitBtn').innerText = isRegisterMode ? "Sign Up" : "Sign In";
    document.getElementById('auth-toggle-text').innerHTML = isRegisterMode ? 
        `Already have an account? <a href="#" onclick="toggleAuthMode()">Login</a>` : 
        `New here? <a href="#" onclick="toggleAuthMode()">Create Account</a>`;
}

document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (isRegisterMode) {
        localStorage.setItem(`user_${user}`, pass);
        alert("Registration Success! Please Login.");
        toggleAuthMode();
    } else {
        const savedPass = localStorage.getItem(`user_${user}`);
        if (savedPass === pass) {
            document.getElementById('auth-page').style.display = 'none';
            document.getElementById('main-page').style.display = 'flex';
        } else {
            alert("Invalid Credentials!");
        }
    }
});

// --- SETTINGS UI ---
function toggleSettings() {
    document.getElementById('settings-panel').classList.toggle('open');
}

// --- BOT CHAT SEARCH SYSTEM ---
document.getElementById('sendBtn').onclick = () => {
    const query = document.getElementById('chatInput').value;
    if (!query) return;

    const display = document.getElementById('chat-display');
    display.innerHTML += `<div><b>You:</b> ${query}</div>`;
    
    // Bot Logic
    setTimeout(() => {
        let response = `Searching for "${query}"...<br>`;
        response += `<a href="https://www.google.com/search?q=${query}" target="_blank" style="color:cyan">Search on Google</a> | `;
        response += `<a href="https://www.youtube.com/results?search_query=${query}" target="_blank" style="color:cyan">YouTube</a> | `;
        response += `<a href="https://www.tiktok.com/search?q=${query}" target="_blank" style="color:cyan">TikTok</a>`;
        
        display.innerHTML += `<div style="margin-top:10px"><b>System Bot:</b><br>${response}</div><hr>`;
        document.getElementById('chatInput').value = "";
        display.scrollTop = display.scrollHeight;
    }, 1000);
};
