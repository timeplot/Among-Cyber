const baseBlocks = [
    { text: 'firewall.enableProtection(true);', safe: true },
    { text: 'scan.start("C:\\\\System32");', safe: true },
    { text: 'deleteAll(*.exe);', safe: false },
    { text: 'openPort(8080);', safe: false },
    { text: 'updateDefinitions();', safe: true },
    { text: 'encryptUserData();', safe: false },
    { text: 'blockIP("192.168.1.5");', safe: true },
    { text: 'installMalware("trojan.dll");', safe: false }
  ];
  
  let selectedBlocks = [];
  let codeBlocks = [...baseBlocks];
  let timeLeft = 180;
  
  const container = document.getElementById('codeBlocks');
  const timerDisplay = document.getElementById('timer');
  const result = document.getElementById('result');
  
  function renderBlocks() {
    container.innerHTML = '';
    codeBlocks.forEach((block, i) => {
      const div = document.createElement('div');
      div.classList.add('code-block');
      div.textContent = block.text;
      if (selectedBlocks.includes(i)) div.classList.add('selected');
      div.onclick = () => toggleSelect(i, div);
      container.appendChild(div);
    });
  }
  renderBlocks();
  
  function toggleSelect(index, div) {
    if (selectedBlocks.includes(index)) {
      selectedBlocks = selectedBlocks.filter(i => i !== index);
      div.classList.remove('selected');
    } else {
      selectedBlocks.push(index);
      div.classList.add('selected');
    }
  }
  
  const timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById('submitBtn').disabled = true;
      checkFirewall();
    }
  }, 1000);
  
  document.getElementById('submitBtn').onclick = checkFirewall;
  
  function checkFirewall() {
    clearInterval(timer);
    const correct =
      selectedBlocks.every(i => codeBlocks[i].safe) &&
      codeBlocks.filter(b => b.safe).length === selectedBlocks.length;
  
    result.textContent = correct
      ? '✅ Firewall Built Successfully!'
      : '❌ Malware Detected in Your Firewall! YOU HAVE BEEN KILLED';
    result.style.color = correct ? '#00ff90' : '#ff5555';
  }
  
  window.addEventListener('storage', e => {
    if (e.key === 'impostor_action') {
      const action = JSON.parse(e.newValue);
      if (action.type === 'ADD_MALWARE') {
        codeBlocks.push({ text: action.payload, safe: false });
        renderBlocks();
      }
      if (action.type === 'DISABLE_SELECTION') {
        document.querySelectorAll('.code-block').forEach(b => b.style.pointerEvents = 'none');
        result.textContent = '⚠️ System Lockdown: Impostor interference detected!';
        result.style.color = '#ffbf00';
      }
    }
  });