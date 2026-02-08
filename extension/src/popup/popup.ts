import { StorageManager } from '../storage/storage';

document.addEventListener('DOMContentLoaded', async () => {
  const globalToggle = document.getElementById('globalToggle') as HTMLInputElement;
  const statusText = document.getElementById('statusText') as HTMLSpanElement;
  const optionsBtn = document.getElementById('optionsBtn') as HTMLButtonElement;

  // Load current settings
  const settings = await StorageManager.getSettings();
  globalToggle.checked = settings.globalEnabled;
  updateStatusText(settings.globalEnabled);

  // Toggle extension on/off
  globalToggle.addEventListener('change', async () => {
    const enabled = globalToggle.checked;
    await StorageManager.updateSettings({ globalEnabled: enabled });
    updateStatusText(enabled);
    
    // Reload current tab to apply changes
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id) {
      chrome.tabs.reload(tab.id);
    }
  });

  // Open options page
  optionsBtn.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  function updateStatusText(enabled: boolean) {
    statusText.textContent = enabled ? 'Extension Enabled' : 'Extension Disabled';
  }
});
