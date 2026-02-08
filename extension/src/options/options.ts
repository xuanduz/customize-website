import { StorageManager } from '../storage/storage';
import { ExtensionSettings, DEFAULT_SETTINGS } from '../types/setting';

let currentSettings: ExtensionSettings;

document.addEventListener('DOMContentLoaded', async () => {
  currentSettings = await StorageManager.getSettings();
  
  renderPresets();
  renderDomains();
  
  // Event listeners
  document.getElementById('testBtn')?.addEventListener('click', testHelloWorld);
  document.getElementById('resetBtn')?.addEventListener('click', resetSettings);
  document.getElementById('addPresetBtn')?.addEventListener('click', addPreset);
  document.getElementById('addDomainBtn')?.addEventListener('click', addDomain);
});

function renderPresets() {
  const container = document.getElementById('presetsList');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (currentSettings.presets.length === 0) {
    container.innerHTML = '<p style="color: #666;">No presets configured</p>';
    return;
  }
  
  currentSettings.presets.forEach(preset => {
    const item = document.createElement('div');
    item.className = 'preset-item';
    item.innerHTML = `
      <div class="preset-info">
        <div class="preset-name">${preset.name}</div>
        <div class="preset-details">
          BG: ${preset.backgroundColor || 'N/A'} | 
          Text: ${preset.textColor || 'N/A'} | 
          Size: ${preset.fontSize || 'N/A'}
        </div>
      </div>
      <div class="item-actions">
        <button class="btn btn-danger btn-small" data-id="${preset.id}">Delete</button>
      </div>
    `;
    
    item.querySelector('.btn-danger')?.addEventListener('click', () => {
      deletePreset(preset.id);
    });
    
    container.appendChild(item);
  });
}

function renderDomains() {
  const container = document.getElementById('domainsList');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (currentSettings.domainSettings.length === 0) {
    container.innerHTML = '<p style="color: #666;">No domain rules configured</p>';
    return;
  }
  
  currentSettings.domainSettings.forEach((domain, index) => {
    const preset = currentSettings.presets.find(p => p.id === domain.presetId);
    const item = document.createElement('div');
    item.className = 'domain-item';
    item.innerHTML = `
      <div class="domain-info">
        <div class="domain-name">${domain.domain}</div>
        <div class="domain-details">
          Preset: ${preset?.name || 'Unknown'} | 
          Status: ${domain.enabled ? 'Enabled' : 'Disabled'}
        </div>
      </div>
      <div class="item-actions">
        <button class="btn btn-danger btn-small" data-index="${index}">Delete</button>
      </div>
    `;
    
    item.querySelector('.btn-danger')?.addEventListener('click', () => {
      deleteDomain(index);
    });
    
    container.appendChild(item);
  });
}

async function testHelloWorld() {
  showStatus('Testing Hello World message...', 'success');
  
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab.id) {
    await chrome.tabs.sendMessage(tab.id, { type: 'SHOW_HELLO' });
  }
}

async function resetSettings() {
  if (!confirm('Are you sure you want to reset all settings to default?')) {
    return;
  }
  
  currentSettings = DEFAULT_SETTINGS;
  await StorageManager.saveSettings(currentSettings);
  
  renderPresets();
  renderDomains();
  showStatus('Settings reset successfully!', 'success');
}

function addPreset() {
  const name = prompt('Enter preset name:');
  if (!name) return;
  
  const newPreset = {
    id: `preset_${Date.now()}`,
    name: name,
    backgroundColor: '#ffffff',
    textColor: '#000000',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif'
  };
  
  currentSettings.presets.push(newPreset);
  saveSettings();
  renderPresets();
}

async function deletePreset(id: string) {
  if (!confirm('Delete this preset?')) return;
  
  currentSettings.presets = currentSettings.presets.filter(p => p.id !== id);
  await saveSettings();
  renderPresets();
}

function addDomain() {
  const domain = prompt('Enter domain (e.g., example.com or *.example.com):');
  if (!domain) return;
  
  if (currentSettings.presets.length === 0) {
    alert('Please create a preset first!');
    return;
  }
  
  const newDomain = {
    domain: domain,
    presetId: currentSettings.presets[0].id,
    enabled: true
  };
  
  currentSettings.domainSettings.push(newDomain);
  saveSettings();
  renderDomains();
}

async function deleteDomain(index: number) {
  if (!confirm('Delete this domain rule?')) return;
  
  currentSettings.domainSettings.splice(index, 1);
  await saveSettings();
  renderDomains();
}

async function saveSettings() {
  await StorageManager.saveSettings(currentSettings);
  showStatus('Settings saved successfully!', 'success');
}

function showStatus(message: string, type: 'success' | 'error') {
  const statusEl = document.getElementById('saveStatus');
  if (!statusEl) return;
  
  statusEl.textContent = message;
  statusEl.className = `save-status ${type}`;
  
  setTimeout(() => {
    statusEl.style.display = 'none';
  }, 3000);
}
