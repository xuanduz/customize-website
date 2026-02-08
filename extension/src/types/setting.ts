export interface StylePreset {
  id: string;
  name: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  fontFamily?: string;
}

export interface DomainSetting {
  domain: string;
  presetId: string;
  enabled: boolean;
}

export interface ExtensionSettings {
  presets: StylePreset[];
  domainSettings: DomainSetting[];
  globalEnabled: boolean;
}

export const DEFAULT_SETTINGS: ExtensionSettings = {
  presets: [
    {
      id: 'default',
      name: 'Default',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif'
    }
  ],
  domainSettings: [],
  globalEnabled: true
};
