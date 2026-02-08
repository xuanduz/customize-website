import { StorageManager } from '../storage/storage';
import { StyleApplier } from '../core/styleApplier';
import { DomainMatcher } from '../core/domainMatcher';

console.log('Content script loaded!');

// Display "Hello World" message when page loads
StyleApplier.showMessage('Hello World');

// Initialize extension
async function initialize() {
  try {
    const settings = await StorageManager.getSettings();
    
    if (!settings.globalEnabled) {
      return;
    }

    const currentDomain = DomainMatcher.getCurrentDomain();
    const domainSetting = settings.domainSettings.find(
      ds => DomainMatcher.matchesDomain(ds.domain, currentDomain) && ds.enabled
    );

    if (domainSetting) {
      const preset = settings.presets.find(p => p.id === domainSetting.presetId);
      if (preset) {
        StyleApplier.applyPreset(preset);
      }
    }
  } catch (error) {
    console.error('Failed to initialize extension:', error);
  }
}

// Listen for settings changes
StorageManager.onSettingsChanged(async (settings) => {
  if (!settings.globalEnabled) {
    StyleApplier.removeStyles();
    return;
  }

  const currentDomain = DomainMatcher.getCurrentDomain();
  const domainSetting = settings.domainSettings.find(
    ds => DomainMatcher.matchesDomain(ds.domain, currentDomain) && ds.enabled
  );

  if (domainSetting) {
    const preset = settings.presets.find(p => p.id === domainSetting.presetId);
    if (preset) {
      StyleApplier.applyPreset(preset);
    }
  } else {
    StyleApplier.removeStyles();
  }
});

// Run initialization
initialize();
