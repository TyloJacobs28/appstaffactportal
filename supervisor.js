// Demo data – replace with backend data later
const staffData = [
  {
    name: 'Alice',
    status: 'Working',
    avatar: 'https://via.placeholder.com/40x40.png?text=A',
    lastUpdate: '10:15:00',
    duration: '01:20:00'
  },
  {
    name: 'Bob',
    status: 'Break',
    avatar: 'https://via.placeholder.com/40x40.png?text=B',
    lastUpdate: '10:30:00',
    duration: '00:45:00'
  },
  {
    name: 'Carol',
    status: 'Lunch',
    avatar: 'https://via.placeholder.com/40x40.png?text=C',
    lastUpdate: '11:00:00',
    duration: '02:10:00'
  }
];

const teamBody = document.getElementById('team-body');
const searchInput = document.getElementById('search');
const exportBtn = document.getElementById('export-btn');
const themeToggle = document.getElementById('theme-toggle');

function renderTable(data) {
  teamBody.innerHTML = '';
  data.forEach(member => {
    const row = document.createElement('tr');
    const badgeClass = 'status-' + member.status.toLowerCase().replace(' ', '-');
    row.innerHTML = `
      <td><div class="avatar"><img src="${member.avatar}" alt="${member.name}"></div></td>
      <td>${member.name}</td>
      <td><span class="status-badge ${badgeClass}">${member.status}</span></td>
      <td>${member.lastUpdate}</td>
      <td>${member.duration}</td>
    `;
    teamBody.appendChild(row);
  });
}
renderTable(staffData);

// Search filter
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = staffData.filter(m =>
    m.name.toLowerCase().includes(term) ||
    m.status.toLowerCase().includes(term)
  );
  renderTable(filtered);
});

// Export CSV
exportBtn.addEventListener('click', () => {
  let csv = 'Name,Status,Last Update,Session Duration\n';
  staffData.forEach(m => {
    csv += `"${m.name}","${m.status}","${m.lastUpdate}","${m.duration}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `team_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
});

// Dark/light mode toggle
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.hasAttribute('data-theme');
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
});

// Load saved theme on page load
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '☀️';
}
