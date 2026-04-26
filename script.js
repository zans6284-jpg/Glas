document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const bgContainer = document.getElementById('bg-container');
    const settingsMenu = document.getElementById('settings-menu');
    const settingsToggle = document.getElementById('settings-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const wallpaperInput = document.getElementById('wallpaper-input');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authContainer = document.getElementById('auth-container');
    const mainInterface = document.getElementById('main-interface');
    const chatBox = document.getElementById('chat-box');
    const hideChatBtn = document.getElementById('hide-chat');

    // 1. Wallpaper System
    const loadWallpaper = () => {
        const savedBg = localStorage.getItem('customBg');
        const type = localStorage.getItem('bgType');
        if (savedBg) {
            renderBackground(savedBg, type);
        } else {
            bgContainer.innerHTML = `<img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80">`;
        }
    };

    const renderBackground = (src, type) => {
        if (type.includes('video')) {
            bgContainer.innerHTML = `<video autoplay muted loop playsinline src="${src}"></video>`;
        } else {
            bgContainer.innerHTML = `<img src="${src}">`;
        }
    };

    wallpaperInput.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            const type = file.type;
            renderBackground(result, type);
            // Save to LocalStorage
            document.getElementById('save-bg').onclick = () => {
                localStorage.setItem('customBg', result);
                localStorage.setItem('bgType', type);
                alert("Wallpaper Saved!");
            };
        };
        reader.readAsDataURL(file);
    };

    document.getElementById('reset-bg').onclick = () => {
        localStorage.removeItem('customBg');
        localStorage.removeItem('bgType');
        location.reload();
    };

    // 2. Auth System (Local Storage)
    document.getElementById('go-to-register').onclick = () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    };

    document.getElementById('go-to-login').onclick = () => {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    };

    registerForm.onsubmit = (e) => {
        e.preventDefault();
        const u = document.getElementById('reg-user').value;
        const p = document.getElementById('reg-pass').value;
        localStorage.setItem(`user_${u}`, p);
        alert("Account Created! Please Login.");
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    };

    loginForm.onsubmit = (e) => {
        e.preventDefault();
        const u = document.getElementById('login-user').value;
        const p = document.getElementById('login-pass').value;
        const savedPass = localStorage.getItem(`user_${u}`);

        if (savedPass && savedPass === p) {
            alert(`Welcome back, ${u}!`);
            authContainer.style.display = 'none';
            mainInterface.style.display = 'flex';
        } else {
            alert("Invalid Username or Password!");
        }
    };

    // 3. AI Search Simulation
    document.getElementById('send-btn').onclick = () => {
        const query = document.getElementById('search-input').value;
        if (!query) return;

        chatBox.innerHTML += `<div class="user-msg" style="text-align:right; margin:10px; color:#00f2ff;">You: ${query}</div>`;
        
        setTimeout(() => {
            const googleLink = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            const youtubeLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
            
            chatBox.innerHTML += `
                <div class="bot-msg" style="background:rgba(255,255,255,0.1); padding:10px; border-radius:10px; margin:10px;">
                    Searching for "${query}"... <br>
                    🔗 <a href="${googleLink}" target="_blank" style="color:cyan">View on Google</a><br>
                    🎬 <a href="${youtubeLink}" target="_blank" style="color:red">View on YouTube</a>
                </div>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);
        document.getElementById('search-input').value = "";
    };

    // 4. UI Toggles
    settingsToggle.onclick = () => settingsMenu.classList.add('active');
    closeMenu.onclick = () => settingsMenu.classList.remove('active');

    hideChatBtn.onclick = () => {
        if (chatBox.style.visibility === 'hidden') {
            chatBox.style.visibility = 'visible';
            document.querySelector('.input-area').style.visibility = 'visible';
            hideChatBtn.className = 'fas fa-eye';
        } else {
            chatBox.style.visibility = 'hidden';
            document.querySelector('.input-area').style.visibility = 'hidden';
            hideChatBtn.className = 'fas fa-eye-slash';
        }
    };

    loadWallpaper();
});
