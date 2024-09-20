// Function to add a rule row
function addRuleRow(rule = {}) {
    const ruleDiv = document.createElement('div');
    ruleDiv.className = 'rule';
    
    ruleDiv.innerHTML = `
      <label>Hostname (no protocol): <input type="text" class="hostname" value="${rule.hostname || ''}"></label>
      <label>Instance name: <input type="text" class="instanceName" value="${rule.instanceName || ""}"></label>
      <button class="removeRule">Remove</button>
    `;
    
    document.getElementById('rules').appendChild(ruleDiv);
  
    ruleDiv.querySelector('.removeRule').addEventListener('click', () => {
      ruleDiv.remove();
    });
  }
  
  // Load existing rules
  chrome.storage.sync.get(['rules'], (data) => {
    const rules = data.rules || [];
    rules.forEach(rule => addRuleRow(rule));
    
    document.getElementById('onlyUseWithRules').checked = data.onlyUseWithRules || false;
    
    document.getElementById('hideObjectType').checked = data.hideObjectType || false;
  });
  
  // Add new rule
  document.getElementById('addRule').addEventListener('click', () => addRuleRow());
  
  // Save the rules to storage
  document.getElementById('save').addEventListener('click', () => {
    const rules = [];
    document.querySelectorAll('.rule').forEach(ruleDiv => {
      const hostname = ruleDiv.querySelector('.hostname').value;
      const instanceName = ruleDiv.querySelector('.instanceName').value;
  
      if (hostname) {
        rules.push({
            hostname: hostname,
          instanceName: instanceName,
        });
      }
    });
  
    // Save rules to chrome storage
    chrome.storage.sync.set({ 
        rules: rules,
        onlyUseWithRules: document.getElementById('onlyUseWithRules').checked,
        hideObjectType: document.getElementById('hideObjectType').checked,
     }, () => {
      alert('Settings saved.');
    });
  });
  