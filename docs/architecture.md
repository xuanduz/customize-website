# Architecture

## Overview

This Chrome extension follows a modular architecture with TypeScript for type safety and maintainability.

## Components

### 1. Content Script (`content/contentScript.ts`)

- Runs on all web pages
- Displays "Hello World" message on page load
- Applies custom styles based on settings
- Listens for settings changes in real-time

**Key Functions:**
- `initialize()` - Loads and applies settings
- Event listeners for storage changes

### 2. Background Service Worker (`background/serviceWorker.ts`)

- Runs in the background
- Handles extension lifecycle events
- Manages message passing between components
- Initializes default settings on installation

**Key Events:**
- `chrome.runtime.onInstalled` - Setup default settings
- `chrome.runtime.onMessage` - Handle inter-component messages

### 3. Popup (`popup/`)

- User interface for quick actions
- Toggle extension on/off
- Link to options page

**Files:**
- `popup.html` - Structure
- `popup.css` - Styling
- `popup.ts` - Logic and event handlers

### 4. Options Page (`options/`)

- Advanced configuration interface
- Manage style presets
- Configure domain-specific rules
- Test functionality

**Files:**
- `options.html` - Structure
- `options.css` - Styling
- `options.ts` - Logic and CRUD operations

### 5. Core Modules (`core/`)

#### StyleApplier
Handles applying and removing custom styles to web pages.

```typescript
class StyleApplier {
  static applyPreset(preset: StylePreset): void
  static removeStyles(): void
  static showMessage(message: string): void
}
```

#### PresetManager
Manages style preset CRUD operations.

```typescript
class PresetManager {
  getPreset(id: string): StylePreset | undefined
  getAllPresets(): StylePreset[]
  addPreset(preset: StylePreset): void
  updatePreset(id: string, updates: Partial<StylePreset>): boolean
  deletePreset(id: string): boolean
}
```

#### DomainMatcher
Matches current domain against configured patterns.

```typescript
class DomainMatcher {
  static getCurrentDomain(): string
  static matchesDomain(pattern: string, domain: string): boolean
  static findMatchingDomain(patterns: string[], currentDomain: string): string | null
}
```

### 6. Storage (`storage/storage.ts`)

Wrapper around Chrome Storage API with type safety.

```typescript
class StorageManager {
  static async getSettings(): Promise<ExtensionSettings>
  static async saveSettings(settings: ExtensionSettings): Promise<void>
  static async updateSettings(partial: Partial<ExtensionSettings>): Promise<void>
  static onSettingsChanged(callback: (settings: ExtensionSettings) => void): void
}
```

### 7. Types (`types/setting.ts`)

TypeScript interfaces and types for the entire extension.

```typescript
interface StylePreset {
  id: string;
  name: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  fontFamily?: string;
}

interface DomainSetting {
  domain: string;
  presetId: string;
  enabled: boolean;
}

interface ExtensionSettings {
  presets: StylePreset[];
  domainSettings: DomainSetting[];
  globalEnabled: boolean;
}
```

### 8. Utils (`utils/debounce.ts`)

Utility functions used across the extension.

```typescript
function debounce<T>(func: T, wait: number): (...args: Parameters<T>) => void
```

## Data Flow

```
User Action (Popup/Options)
    ↓
StorageManager.saveSettings()
    ↓
Chrome Storage API
    ↓
Storage Change Event
    ↓
Content Script Listener
    ↓
StyleApplier.applyPreset()
    ↓
DOM Updated
```

## Build Process

```
TypeScript Source (.ts)
    ↓
Webpack + ts-loader
    ↓
JavaScript Bundle (.js)
    ↓
Copy Plugin
    ↓
extension/dist/
```

## Security Considerations

1. **Content Security Policy**: Follows Manifest V3 requirements
2. **Permissions**: Minimal permissions requested
3. **Storage**: Uses Chrome's sync storage with encryption
4. **Input Validation**: All user inputs sanitized

## Performance Optimizations

1. **Debouncing**: User input debounced to reduce operations
2. **Lazy Loading**: Components loaded only when needed
3. **Efficient DOM Updates**: Minimal DOM manipulation
4. **Caching**: Settings cached to reduce storage reads

## Extension Permissions

- `storage`: For saving settings
- `activeTab`: For interacting with current tab

## Browser Compatibility

- Chrome 88+
- Edge 88+
- Other Chromium-based browsers supporting Manifest V3
