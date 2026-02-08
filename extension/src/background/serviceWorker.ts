import { StorageManager } from '../storage/storage';

console.log('Service worker loaded!');

// Initialize default settings on install
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extension installed!');
  
  const settings = await StorageManager.getSettings();
  await StorageManager.saveSettings(settings);
  
  console.log('Default settings initialized');
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message);
  
  if (message.type === 'GET_SETTINGS') {
    StorageManager.getSettings().then(settings => {
      sendResponse({ settings });
    });
    return true; // Keep channel open for async response
  }
  
  if (message.type === 'SAVE_SETTINGS') {
    StorageManager.saveSettings(message.settings).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  return false;
});

// Log when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  console.log('Extension icon clicked on tab:', tab.id);
});
