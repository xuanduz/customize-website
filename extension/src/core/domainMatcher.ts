export class DomainMatcher {
  static getCurrentDomain(): string {
    return window.location.hostname;
  }

  static matchesDomain(pattern: string, domain: string): boolean {
    // Convert wildcard pattern to regex
    const regexPattern = pattern
      .replace(/\./g, '\\.')
      .replace(/\*/g, '.*');
    
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(domain);
  }

  static findMatchingDomain(patterns: string[], currentDomain: string): string | null {
    for (const pattern of patterns) {
      if (this.matchesDomain(pattern, currentDomain)) {
        return pattern;
      }
    }
    return null;
  }
}
