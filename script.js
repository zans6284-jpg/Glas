let isRegister = false;

// 1. Toggle Settings Sidebar
function toggleSettings() {
    document.getElementById('settings-sidebar').classList.toggle('active');
}

// 2. Wallpaper System
const bgUpload = document.getElementById('bg-upload');
const bgContainer = document.getElementById('bg-container');

bgUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            renderBackground(e.target.result, file.type);
        };
        reader.readAsDataURL(file);
    }
});

function renderBackground(src, type) {
    bgContainer.innerHTML = '';
    if (type.includes('video')) {
        bgContainer.innerHTML = `<video src="${src}" autoplay loop muted playsinline></video>`;
    } else {
        bgContainer.innerHTML = `<img src="${src}">`;
    }
}

function saveWallpaper() {
    const media = bgContainer.firstChild;
    if (media) {
        localStorage.setItem('savedBG', media.src);
        localStorage.setItem('bgType', media.tagName.toLowerCase());
        alert('Wallpaper Saved!');
    }
}

function resetWallpaper() {
    localStorage.removeItem('savedBG');
    location.reload();
}

// Load Wallpaper on Start
window.onload = () => {
    const saved = localStorage.getItem('savedBG');
    const type = localStorage.getItem('bgType');
    if (saved) {
        if (type === 'video') {
            bgContainer.innerHTML = `<video src="${saved}" autoplay loop muted></video>`;
        } else {
            bgContainer.innerHTML = `<img src="${saved}">`;
        }
    }
};

// 3. Auth System (Login/Register)
function switchForm(mode) {
    const title = document.getElementById('form-title');
    const btn = document.getElementById('submitBtn');
    const toggle = document.getElementById('toggle-text');

    if (mode === 'register') {
        isRegister = true;
        title.innerText = "REGISTER";
        btn.innerText = "REGISTER";
        toggle.innerHTML = 'Have an account? <a href="javascript:void(0)" onclick="switchForm(\'login\')">Login</a>';
    } else {
        isRegister = false;
        title.innerText = "LOGIN";
        btn.innerText = "SIGN IN";
        toggle.innerHTML = 'New here? <a href="javascript:void(0)" onclick="switchForm(\'register\')">Create Account</a>';
    }
}

document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (isRegister) {
        localStorage.setItem(`user_${user}`, pass);
        alert("Registration Success! Please Login.");
        switchForm('login');
    } else {
        const savedPass = localStorage.getItem(`user_${user}`);
        if (savedPass === pass) {
            alert("Welcome Back!");
            document.getElementById('auth-section').style.display = 'none';
            document.getElementById('main-app').style.display = 'flex';
        } else {
            alert("Wrong Username or Password!");
        }
    }
});
