let timeLeft = 180;
const timerDisplay = document.getElementById('timer');
const log = document.getElementById('log');
const malwareText = document.getElementById('malwareText');

const timer = setInterval(() => {
  timeLeft--;
  timerDisplay.textContent = timeLeft;
  if (timeLeft <= 0) clearInterval(timer);
}, 1000);

function logAction(msg, color = '#ff4f6d') {
  const div = document.createElement('div');
  div.textContent = msg;
  div.style.color = color;
  log.prepend(div);
}

document.getElementById('injectBtn').onclick = () => {
  const payload = malwareText.value.trim() || 'corruptSystem("random_injection");';
  const action = { type: 'ADD_MALWARE', payload };
  localStorage.setItem('impostor_action', JSON.stringify(action));
  logAction('💀 Injected malware: ' + payload);
  malwareText.value = '';
};

document.getElementById('disableBtn').onclick = () => {
  const action = { type: 'DISABLE_SELECTION' };
  localStorage.setItem('impostor_action', JSON.stringify(action));
  logAction('🚫 Firewall temporarily locked!');
};