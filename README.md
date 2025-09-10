This project is a modern web-based dashboard system designed for both staff members and supervisors. It’s built with plain HTML, CSS and JavaScript on the front-end so it’s lightweight, responsive and easy for a backend team to integrate with your APIs or databases.

👩‍💻 Staff Dashboard

The staff side gives each employee a simple, mobile-friendly interface to:

Log in and view their tasks or status.

Update their status (working, on break, lunch, shift ended, etc.).

Search/filter their tasks or time entries.

Switch between light and dark themes for comfort.

It’s intentionally limited — staff cannot export data or see other staff’s information beyond what’s relevant to them.

🧑‍💼 Supervisor Dashboard

Supervisors get a broader view of the whole team:

A table of all team members with avatars, names, current status, last update time and session duration.

Search and filter across staff.

A CSV export button to download current data for reporting.

Dark/light theme toggle for personal preference.

Supervisors can monitor productivity in real time and pass the exported data to other systems.

🏗️ Tech Stack

HTML/CSS/JS for the front-end.

Glassmorphism + red/white theme for a modern look.

No frameworks required — backend team can plug in any API (Node, Python, PHP, etc.).

Role-based UI so features like “Export CSV” only appear for supervisors.

💡 Purpose

The goal is to give an organisation:

A simple attendance & status tracking tool for staff.

A real-time monitoring and reporting tool for supervisors.

A clean, extendable front-end that your backend team can hook up to databases, authentication, and analytics.

<! -- New dashbaord features -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Advanced Technology - Staff Activities</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    :root {
      --primary: #ef4444; /* Red */
      --primary-dark: #b91c1c; /* Darker Red */
      --secondary: #ffffff; /* White */
      --accent: #ef4444; /* Red accent */
      --danger: #b91c1c; /* Dark Red */
      --warning: #f59e0b;
      --text: #1e293b; /* Dark text */
      --text-muted: #64748b;
      --bg: linear-gradient(135deg, #fff 0%, #ffe5e5 100%); /* White to light red */
      --card-bg: rgba(255, 255, 255, 0.95);
      --border: rgba(239, 68, 68, 0.2); /* Red border */
      --shadow: 0 20px 25px -5px rgba(239, 68, 68, 0.08), 0 10px 10px -5px rgba(239, 68, 68, 0.04);
      --glass-bg: rgba(255, 255, 255, 0.15);
      --glass-border: rgba(239, 68, 68, 0.2);
    }

    [data-theme="dark"] {
      --text: #f8fafc;
      --text-muted: #fca5a5; /* Light red muted */
      --bg: linear-gradient(135deg, #000 0%, #b91c1c 100%); /* Black to dark red */
      --card-bg: rgba(0, 0, 0, 0.95);
      --secondary: #1e293b;
      --border: rgba(239, 68, 68, 0.3);
      --glass-bg: rgba(0, 0, 0, 0.25);
      --glass-border: rgba(239, 68, 68, 0.3);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hidden {
      display: none !important;
    }

    /* Login Screen */
    .login-card {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 24px;
      padding: 3rem;
      width: 100%;
      max-width: 400px;
      box-shadow: var(--shadow);
      animation: slideIn 0.6s ease-out;
    }

    .login-card h2 {
      text-align: center;
      margin-bottom: 2rem;
      font-weight: 600;
      font-size: 1.75rem;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .form-group {
      position: relative;
      margin-bottom: 1.5rem;
    }

    .form-input {
      width: 100%;
      padding: 1rem 1.25rem;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      font-size: 1rem;
      color: var(--text);
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .form-input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      transform: translateY(-1px);
    }

    .form-input::placeholder {
      color: var(--text-muted);
    }

    .btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      color: white;
      width: 100%;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
    }

    .btn-primary:active {
      transform: translateY(0);
    }

    /* App Screen */
    .app-container {
      width: 100%;
      max-width: 1200px;
      animation: slideIn 0.6s ease-out;
    }

    .app-header {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      padding: 1.5rem 2rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .app-title {
      font-size: 1.5rem;
      font-weight: 600;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .user-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 1.2rem;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .welcome-text {
      font-weight: 500;
      color: var(--text);
    }

    .time-info {
      font-size: 0.875rem;
      color: var(--text-muted);
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .work-timer {
      background: var(--accent);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 8px;
      font-weight: 500;
    }

    .header-actions {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }

    .icon-btn {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 10px;
      background: var(--card-bg);
      color: var(--text);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .icon-btn:hover {
      transform: translateY(-1px);
      background: var(--secondary);
    }

    .btn-logout {
      background: var(--danger);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      border: none;
      font-weight: 500;
    }

    .btn-logout:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    }

    /* Main Content */
    .main-content {
      display: grid;
      gap: 2rem;
    }

    .status-section {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      padding: 2rem;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: var(--text);
    }

    .status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .status-btn {
      background: var(--card-bg);
      border: 2px solid var(--border);
      border-radius: 16px;
      padding: 1.5rem;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      backdrop-filter: blur(10px);
    }

    .status-btn:hover {
      transform: translateY(-3px);
      border-color: var(--primary);
      box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.2);
    }

    .status-btn.active {
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      color: white;
      border-color: var(--primary);
    }

    .status-icon {
      font-size: 2rem;
    }

    .status-label {
      font-weight: 500;
      font-size: 0.95rem;
      color: var(--text);
    }
    [data-theme="dark"] .status-label {
      color: #fff;
    }

    .current-status {
      background: linear-gradient(135deg, var(--accent), #059669);
      border-radius: 12px;
      padding: 1rem;
      color: white;
      margin-bottom: 1rem;
    }

    .status-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .info-card {
      background: var(--card-bg);
      border-radius: 12px;
      padding: 1rem;
      border: 1px solid var(--border);
      backdrop-filter: blur(10px);
    }

    .info-label {
      font-size: 0.875rem;
      color: var(--text-muted);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .info-value {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text);
    }

    /* History Section */
    .history-controls {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      align-items: center;
    }

    .search-input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid var(--border);
      border-radius: 10px;
      background: var(--card-bg);
      color: var(--text);
      backdrop-filter: blur(10px);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .btn-export {
      background: var(--accent);
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 10px;
      font-weight: 500;
      white-space: nowrap;
    }

    .btn-export:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }

    .history-table {
      background: var(--card-bg);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--border);
      backdrop-filter: blur(10px);
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      color: white;
    }

    th {
      padding: 1rem;
      text-align: left;
      font-weight: 500;
    }

    td {
      padding: 1rem;
      border-bottom: 1px solid var(--border);
    }

    tr:last-child td {
      border-bottom: none;
    }

    tbody tr {
      transition: all 0.2s ease;
    }

    tbody tr:hover {
      background: var(--secondary);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .status-working { background: rgba(16, 185, 129, 0.1); color: var(--accent); }
    .status-break { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
    .status-lunch { background: rgba(139, 69, 19, 0.1); color: #8b4513; }
    .status-shift-end { background: rgba(239, 68, 68, 0.1); color: var(--danger); }

    /* Animations */
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .pulse {
      animation: pulse 2s infinite;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .container { padding: 1rem; }
      .app-header { 
        flex-direction: column; 
        text-align: center;
      }
      .user-section {
        flex-direction: column;
        align-items: center;
      }
      .time-info {
        flex-direction: column;
        gap: 0.5rem;
      }
      .status-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }
      .history-controls {
        flex-direction: column;
        align-items: stretch;
      }
    }

    /* Floating Action Button */
    .fab {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .fab:hover {
      transform: scale(1.1);
      box-shadow: 0 8px 30px rgba(99, 102, 241, 0.6);
    }
    .staff-input {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  backdrop-filter: blur(10px);
}
.staff-input h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: var(--text);
}
#update-form {
  display: flex;
  flex-wrap: wrap;
  gap: .75rem;
}
#update-form input,
#update-form select {
  flex: 1;
  min-width: 200px;
  padding: .75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--card-bg);
  color: var(--text);
}
#update-form button {
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 10px;
  padding: .75rem 1.5rem;
  cursor: pointer;
}
#update-form button:hover {
  transform: translateY(-1px);
}
.form-message {
  margin-top: .5rem;
  font-size: .9rem;
  color: var(--text-muted);
}
.hidden { display: none !important; }
.leaderboard {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  backdrop-filter: blur(10px);
}
.leaderboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.leaderboard-header h2 {
  font-size: 1.25rem;
  color: var(--text);
}
.btn-top3 {
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 10px;
  padding: .5rem 1rem;
  cursor: pointer;
}
.btn-top3:hover {
  transform: translateY(-1px);
}
.leaderboard table {
  width: 100%;
  border-collapse: collapse;
}
.leaderboard th, .leaderboard td {
  padding: .75rem;
  text-align: left;
}
.leaderboard tbody tr:hover {
  background: var(--secondary);
}


  </style>
</head>
<body>
  <div class="container">
    <!-- LOGIN SCREEN -->
    <div id="login-screen" class="login-card">
      <h2>APP Staff Portal</h2>
      <div class="form-group">
        <input type="text" id="username" class="form-input" placeholder="Enter username" />
      </div>
      <div class="form-group">
        <input type="password" id="password" class="form-input" placeholder="Enter password" />
      </div>
      <div class="form-group">
        <input type="file" id="profile-pic" accept="image/*" class="form-input" style="padding:0.5rem;" placeholder="Enter Profile Picture" />
      </div>
      <button id="login-btn" class="btn btn-primary">Sign In</button>
    </div>

    <!-- MAIN APP -->
    <div id="app-screen" class="app-container hidden">
      <header class="app-header">
        <h1 class="app-title">Staff Activities Dashboard</h1>
        <div class="user-section">
          <div class="avatar" id="avatar">U</div>
          <div class="user-info">
            <div class="welcome-text" id="welcome">Welcome</div>
            <div class="time-info">
              <span id="clock"></span>
              <div class="work-timer" id="work-timer">00:00:00</div>
            </div>
          </div>
        </div>
        <div class="header-actions">
          <button id="theme-toggle" class="icon-btn" title="Toggle theme">🌙</button>
          <button id="logout-btn" class="btn btn-logout">Logout</button>
        </div>
      </header>

      <main class="main-content">
        <section class="status-section">
          <h2 class="section-title">Update Status</h2>
          
          <div id="current-status-display" class="current-status hidden">
            <div class="info-label">Current Status</div>
            <div class="info-value" id="current-status">Ready to start</div>
          </div>

          <div class="status-grid">
            <button class="status-btn" data-status="Working" data-icon="💼">
              <div class="status-icon">💼</div>
              <div class="status-label">Working</div>
            </button>
            <button class="status-btn" data-status="Break" data-icon="☕">
              <div class="status-icon">☕</div>
              <div class="status-label">Break</div>
            </button>
            <button class="status-btn" data-status="Lunch" data-icon="🍽">
              <div class="status-icon">🍽</div>
              <div class="status-label">Lunch</div>
            </button>
            <button class="status-btn" data-status="Shift End" data-icon="🏁">
              <div class="status-icon">🏁</div>
              <div class="status-label">End Shift</div>
            </button>
          </div>

          <div class="status-info-grid">
            <div class="info-card">
              <div class="info-label">Last Activity</div>
              <div class="info-value" id="last-submitted">No activity yet</div>
            </div>
            <div class="info-card">
              <div class="info-label">Session Duration</div>
              <div class="info-value" id="session-duration">00:00:00</div>
            </div>
          </div>
        </section>

        <section class="staff-input">
        <h2>Log an Update</h2>
          <form id="update-form">
            <input type="text" id="update-text" placeholder="Describe your activity..." required>
            <select id="update-type" required>
                <option value="" disabled selected>Select type</option>
                <option value="progress">Progress Update</option>
                <option value="issue">On Hold</option>
                <option value="request">Resolved</option>
                <option value="other">Requests</option>
            </select>
              <button type="submit">Submit</button>
            </form>
            <div id="form-message" class="form-message"></div>
</section>


        <section class="status-section">
          <h2 class="section-title">Activity History</h2>
          <div class="history-controls">
            <input type="text" id="search" class="search-input" placeholder="Search activities..." />
            <button id="export-btn" class="btn btn-export">📊 Export CSV</button>
          </div>
          <div class="history-table">
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody id="history-body">
                <!-- History items will be inserted here -->
              </tbody>
            </table>
          </div>
        </section>
                    <section class="leaderboard" id="leaderboard">
              <div class="leaderboard-header">
                <h2>Resolved Leaderboard</h2>
                <button id="toggle-top3" class="btn-top3">Show Top 3</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Engineer</th>
                    <th>Total Resolves</th>
                  </tr>
                </thead>
                <tbody id="leaderboard-body"></tbody>
              </table>
            </section>

      </main>
    </div>
  </div>

  <!-- Quick Status FAB -->
  <button id="quick-status" class="fab hidden" title="Quick Status">⚡</button>

  <script>
    class StaffApp {
      constructor() {
        this.elements = {
          loginScreen: document.getElementById('login-screen'),
          appScreen: document.getElementById('app-screen'),
          loginBtn: document.getElementById('login-btn'),
          logoutBtn: document.getElementById('logout-btn'),
          welcome: document.getElementById('welcome'),
          avatar: document.getElementById('avatar'),
          statusBtns: document.querySelectorAll('.status-btn'),
          currentStatus: document.getElementById('current-status'),
          currentStatusDisplay: document.getElementById('current-status-display'),
          lastSubmitted: document.getElementById('last-submitted'),
          sessionDuration: document.getElementById('session-duration'),
          historyBody: document.getElementById('history-body'),
          clock: document.getElementById('clock'),
          workTimer: document.getElementById('work-timer'),
          themeToggle: document.getElementById('theme-toggle'),
          search: document.getElementById('search'),
          exportBtn: document.getElementById('export-btn'),
          quickStatusFab: document.getElementById('quick-status')
        };

        this.state = {
          currentUser: null,
          workSeconds: 0,
          sessionStart: null,
          workInterval: null,
          sessionInterval: null,
          currentStatusType: null,
          lastStatusTime: null,
          activities: JSON.parse(localStorage.getItem('activities') || '[]')
        };

        this.init();
      }

      init() {
        this.setupEventListeners();
        this.startClock();
        this.loadTheme();
        this.renderHistory();
        this.startSessionTimer();
      }

      setupEventListeners() {
        // Login
        this.elements.loginBtn.addEventListener('click', () => this.handleLogin());
        
        // Logout
        this.elements.logoutBtn.addEventListener('click', () => this.handleLogout());
        
        // Status buttons
        this.elements.statusBtns.forEach(btn => {
          btn.addEventListener('click', () => this.updateStatus(btn));
        });
        
        // Theme toggle
        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Search
        this.elements.search.addEventListener('input', (e) => this.filterHistory(e.target.value));
        
        // Export
        this.elements.exportBtn.addEventListener('click', () => this.exportCSV());
        
        // Quick status FAB
        this.elements.quickStatusFab.addEventListener('click', () => this.showQuickStatus());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Enter key for login
        [document.getElementById('username'), document.getElementById('password')].forEach(input => {
          input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleLogin();
          });
        });
      }

      handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const profilePicInput = document.getElementById('profile-pic');
        
        if (!username) {
          this.showNotification('Please enter a username', 'warning');
          return;
        }
        // Handle profile picture
        let profilePicUrl = '';
        if (profilePicInput.files && profilePicInput.files[0]) {
          const file = profilePicInput.files[0];
          profilePicUrl = URL.createObjectURL(file);
          localStorage.setItem('profilePicUrl', profilePicUrl);
        } else {
          localStorage.removeItem('profilePicUrl');
        }
        this.state.currentUser = username;
        this.state.sessionStart = new Date();
        this.elements.welcome.textContent = `Welcome, ${username}`;
        // Show avatar image if uploaded
        const savedPic = localStorage.getItem('profilePicUrl');
        if (savedPic) {
          this.elements.avatar.innerHTML = `<img src="${savedPic}" alt="avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />`;
        } else {
          this.elements.avatar.textContent = username.charAt(0).toUpperCase();
        }
        this.elements.loginScreen.classList.add('hidden');
        this.elements.appScreen.classList.remove('hidden');
        this.elements.quickStatusFab.classList.remove('hidden');
        this.showNotification('Login successful!', 'success');
      }

      handleLogout() {
        this.stopWorkTimer();
        this.state = {
          ...this.state,
          currentUser: null,
          workSeconds: 0,
          sessionStart: null,
          currentStatusType: null
        };
        
        this.elements.appScreen.classList.add('hidden');
        this.elements.quickStatusFab.classList.add('hidden');
        this.elements.loginScreen.classList.remove('hidden');
        
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        
        localStorage.removeItem('profilePicUrl');
        
        this.showNotification('Logged out successfully', 'info');
      }

      updateStatus(btn) {
        const status = btn.dataset.status;
        const icon = btn.dataset.icon;
        const now = new Date();
        const time = now.toLocaleTimeString();
        
        // Update UI
        this.elements.statusBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        this.elements.currentStatus.textContent = `${icon} ${status}`;
        this.elements.currentStatusDisplay.classList.remove('hidden');
        this.elements.lastSubmitted.textContent = `${status} at ${time}`;
        
        // Calculate duration from last status
        let duration = '---';
        if (this.state.lastStatusTime) {
          const diff = now - this.state.lastStatusTime;
          duration = this.formatDuration(Math.floor(diff / 1000));
        }
        
        // Add to history
        const activity = {
          status,
          icon,
          time,
          timestamp: now.toISOString(),
          duration: this.state.lastStatusTime ? duration : '---',
          user: this.state.currentUser
        };
        
        this.state.activities.unshift(activity);
        this.saveActivities();
        this.renderHistory();
        
        // Update timers
        if (status === 'Working') {
          this.startWorkTimer();
        } else {
          this.stopWorkTimer();
        }
        
        this.state.currentStatusType = status;
        this.state.lastStatusTime = now;
        
        this.showNotification(`Status updated to ${status}`, 'success');
      }

      startWorkTimer() {
        this.stopWorkTimer();
        this.state.workInterval = setInterval(() => {
          this.state.workSeconds++;
          this.elements.workTimer.textContent = this.formatDuration(this.state.workSeconds);
          this.elements.workTimer.classList.add('pulse');
        }, 1000);
      }

      stopWorkTimer() {
        if (this.state.workInterval) {
          clearInterval(this.state.workInterval);
          this.state.workInterval = null;
          this.elements.workTimer.classList.remove('pulse');
        }
      }

      startSessionTimer() {
        this.state.sessionInterval = setInterval(() => {
          if (this.state.sessionStart) {
            const diff = new Date() - this.state.sessionStart;
            const seconds = Math.floor(diff / 1000);
            this.elements.sessionDuration.textContent = this.formatDuration(seconds);
          }
        }, 1000);
      }

      startClock() {
        const updateClock = () => {
          const now = new Date();
          this.elements.clock.textContent = now.toLocaleTimeString();
        };
        
        setInterval(updateClock, 1000);
        updateClock();
      }

      formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        return [hours, minutes, secs]
          .map(v => v.toString().padStart(2, '0'))
          .join(':');
      }

      renderHistory() {
        this.elements.historyBody.innerHTML = '';
        
        this.state.activities.forEach(activity => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>
              <div class="status-badge status-${activity.status.toLowerCase().replace(' ', '-')}">
                ${activity.icon} ${activity.status}
              </div>
            </td>
            <td>${activity.time}</td>
            <td>${activity.duration}</td>
          `;
          this.elements.historyBody.appendChild(row);
        });
      }

      filterHistory(term) {
        const rows = this.elements.historyBody.querySelectorAll('tr');
        const searchTerm = term.toLowerCase();
        
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
      }

      exportCSV() {
        if (this.state.activities.length === 0) {
          this.showNotification('No data to export', 'warning');
          return;
        }
        
        let csv = 'Status,Time,Duration,User\n';
        this.state.activities.forEach(activity => {
          csv += `"${activity.status}","${activity.time}","${activity.duration}","${activity.user}"\n`;
        });
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `staff_activities_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        
        this.showNotification('Data exported successfully!', 'success');
      }

      toggleTheme() {
        const isDark = document.documentElement.hasAttribute('data-theme');
        
        if (isDark) {
          document.documentElement.removeAttribute('data-theme');
          this.elements.themeToggle.textContent = '🌙';
          localStorage.setItem('theme', 'light');
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          this.elements.themeToggle.textContent = '☀️';
          localStorage.setItem('theme', 'dark');
        }
      }

      loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          this.elements.themeToggle.textContent = '☀️';
        }
      }

      saveActivities() {
        localStorage.setItem('activities', JSON.stringify(this.state.activities));
      }

      showQuickStatus() {
        // Simple quick status toggle - cycles through common statuses
        const quickStatuses = ['Working', 'Break', 'Lunch'];
        const currentIndex = quickStatuses.indexOf(this.state.currentStatusType);
        const nextIndex = (currentIndex + 1) % quickStatuses.length;
        const nextStatus = quickStatuses[nextIndex];
        
        const targetBtn = Array.from(this.elements.statusBtns)
          .find(btn => btn.dataset.status === nextStatus);
        
        if (targetBtn) {
          this.updateStatus(targetBtn);
        }
      }

      handleKeyboard(e) {
        // Only handle shortcuts when app is visible
        if (this.elements.appScreen.classList.contains('hidden')) return;
        
        if (e.altKey) {
          switch(e.code) {
            case 'Digit1':
              e.preventDefault();
              this.elements.statusBtns[0].click();
              break;
            case 'Digit2':
              e.preventDefault();
              this.elements.statusBtns[1].click();
              break;
            case 'Digit3':
              e.preventDefault();
              this.elements.statusBtns[2].click();
              break;
            case 'Digit4':
              e.preventDefault();
              this.elements.statusBtns[3].click();
              break;
            case 'KeyT':
              e.preventDefault();
              this.toggleTheme();
              break;
            case 'KeyS':
              e.preventDefault();
              this.elements.search.focus();
              break;
            case 'KeyE':
              e.preventDefault();
              this.exportCSV();
              break;
          }
        }
      }

      showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
          position: fixed;
          top: 2rem;
          right: 2rem;
          background: ${type === 'success' ? 'var(--accent)' : 
                      type === 'warning' ? 'var(--warning)' :
                      type === 'error' ? 'var(--danger)' : 'var(--primary)'};
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: var(--shadow);
          z-index: 1000;
          animation: slideInRight 0.3s ease-out;
          font-weight: 500;
          max-width: 300px;
        `;
        
        // Add animation keyframes if not already added
        if (!document.querySelector('#notification-styles')) {
          const style = document.createElement('style');
          style.id = 'notification-styles';
          style.textContent = `
            @keyframes slideInRight {
              from {
                opacity: 0;
                transform: translateX(100%);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            @keyframes slideOutRight {
              from {
                opacity: 1;
                transform: translateX(0);
              }
              to {
                opacity: 0;
                transform: translateX(100%);
              }
            }
          `;
          document.head.appendChild(style);
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
          notification.style.animation = 'slideOutRight 0.3s ease-out';
          setTimeout(() => {
            if (notification.parentNode) {
              notification.parentNode.removeChild(notification);
            }
          }, 300);
        }, 3000);
      }
    }

    // Initialize the app
    document.addEventListener('DOMContentLoaded', () => {
      new StaffApp();
    });

    // Service Worker registration for PWA capabilities
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
    const updateForm = document.getElementById('update-form');
const updateText = document.getElementById('update-text');
const updateType = document.getElementById('update-type');
const formMessage = document.getElementById('form-message');

updateForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = updateText.value.trim();
  const type = updateType.value;

  if (!text || !type) return;

  // This is where you send the data to your backend:
  // Example:
  // fetch('/api/staff/update', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ text, type })
  // }).then(...)

  console.log('Submitted:', { text, type }); // for demo

  formMessage.textContent = 'Your update has been submitted!';
  updateForm.reset();
  setTimeout(() => formMessage.textContent = '', 3000);
});
const logSection = document.getElementById('log-section');
const statusSelect = document.getElementById('status-select');

function toggleLogSection(status) {
  if (status === 'Working') {
    logSection.classList.remove('hidden');
  } else {
    logSection.classList.add('hidden');
  }
}

// initial load
toggleLogSection(statusSelect.value);

// when status changes
statusSelect.addEventListener('change', () => {
  toggleLogSection(statusSelect.value);
});
const leaderboardBody = document.getElementById('leaderboard-body');
const toggleTop3Btn = document.getElementById('toggle-top3');

let showTop3 = false;

// Example request counts – you’ll fill from backend later
let requestCounts = [
  { name: 'Alice', total: 5 },
  { name: 'Bob', total: 8 },
  { name: 'Carol', total: 2 },
  { name: 'Dave', total: 6 }
];

function renderLeaderboard() {
  // sort descending by total
  const sorted = [...requestCounts].sort((a,b) => b.total - a.total);
  const toDisplay = showTop3 ? sorted.slice(0,3) : sorted;

  leaderboardBody.innerHTML = '';
  toDisplay.forEach((user, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${user.name}</td>
      <td>${user.total}</td>
    `;
    leaderboardBody.appendChild(tr);
  });
  toggleTop3Btn.textContent = showTop3 ? 'Show All' : 'Show Top 3';
}

toggleTop3Btn.addEventListener('click', () => {
  showTop3 = !showTop3;
  renderLeaderboard();
});

// call initially
renderLeaderboard();

updateForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = updateText.value.trim();
  const type = updateType.value;

  if (!text || !type) return;

  // add to backend here …

  // increment local count (example for logged-in user):
  const currentUser = 'Alice'; // you can get from backend login
  const existing = requestCounts.find(u => u.name === currentUser);
  if (existing) existing.total++;
  else requestCounts.push({ name: currentUser, total: 1 });

  renderLeaderboard();

  formMessage.textContent = 'Your update has been submitted!';
  updateForm.reset();
  setTimeout(() => formMessage.textContent = '', 3000);
});



  </script>
</body>
</html>
