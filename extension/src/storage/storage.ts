import { ExtensionSettings, DEFAULT_SETTINGS } from '../types/setting';

export class StorageManager {
  private static readonly STORAGE_KEY = 'extensionSettings';

  static async getSettings(): Promise<ExtensionSettings> {
    return new Promise((resolve) => {
      chrome.storage.sync.get([this.STORAGE_KEY], (result) => {
        resolve(result[this.STORAGE_KEY] || DEFAULT_SETTINGS);
      });
    });
  }

  static async saveSettings(settings: ExtensionSettings): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [this.STORAGE_KEY]: settings }, () => {
        resolve();
      });
    });
  }

  static async updateSettings(partial: Partial<ExtensionSettings>): Promise<void> {
    const current = await this.getSettings();
    const updated = { ...current, ...partial };
    await this.saveSettings(updated);
  }

  static onSettingsChanged(callback: (settings: ExtensionSettings) => void): void {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync' && changes[this.STORAGE_KEY]) {
        callback(changes[this.STORAGE_KEY].newValue);
      }
    });
  }
}
