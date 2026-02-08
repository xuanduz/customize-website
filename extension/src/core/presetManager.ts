import { StylePreset } from '../types/setting';

export class PresetManager {
  private presets: Map<string, StylePreset>;

  constructor(presets: StylePreset[]) {
    this.presets = new Map(presets.map(p => [p.id, p]));
  }

  getPreset(id: string): StylePreset | undefined {
    return this.presets.get(id);
  }

  getAllPresets(): StylePreset[] {
    return Array.from(this.presets.values());
  }

  addPreset(preset: StylePreset): void {
    this.presets.set(preset.id, preset);
  }

  updatePreset(id: string, updates: Partial<StylePreset>): boolean {
    const preset = this.presets.get(id);
    if (!preset) return false;

    this.presets.set(id, { ...preset, ...updates });
    return true;
  }

  deletePreset(id: string): boolean {
    return this.presets.delete(id);
  }
}
