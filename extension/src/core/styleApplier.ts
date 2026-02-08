import { StylePreset } from '../types/setting';

export class StyleApplier {
  private static styleElement: HTMLStyleElement | null = null;

  static applyPreset(preset: StylePreset): void {
    this.removeStyles();

    const style = document.createElement('style');
    style.id = 'custom-page-styles';
    
    let css = '';
    
    if (preset.backgroundColor) {
      css += `body { background-color: ${preset.backgroundColor} !important; }\n`;
    }
    
    if (preset.textColor) {
      css += `body, body * { color: ${preset.textColor} !important; }\n`;
    }
    
    if (preset.fontSize) {
      css += `body { font-size: ${preset.fontSize} !important; }\n`;
    }
    
    if (preset.fontFamily) {
      css += `body, body * { font-family: ${preset.fontFamily} !important; }\n`;
    }

    style.textContent = css;
    document.head.appendChild(style);
    this.styleElement = style;
  }

  static removeStyles(): void {
    if (this.styleElement && this.styleElement.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
      this.styleElement = null;
    }
  }

  static showMessage(message: string): void {
    const div = document.createElement('div');
    div.textContent = message;
    div.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      z-index: 10000;
      font-size: 16px;
      font-weight: bold;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(div);
    
    setTimeout(() => {
      div.remove();
    }, 3000);
  }
}
