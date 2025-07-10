
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
}

function showLocalClock() {
  setInterval(() => {
    const now = new Date();
    document.getElementById('localTime').innerText =
      'Current Local Time: ' + now.toLocaleString();
  }, 1000);
}

async function loadData() {
  const res = await fetch('/api/data');
  const data = await res.json();
  document.getElementById('trainerName').innerText = 'Name: ' + data.trainer.name;
  document.getElementById('trainerEmail').innerText = 'Email: ' + data.trainer.email;
  document.getElementById('trainerPhone').innerText = 'Phone: ' + data.trainer.phone;
  document.getElementById('courseList').innerHTML =
    data.courses.map(c => `<li>${c}</li>`).join('');
}
loadData();
showLocalClock();