const SAFE_PROTOCOLS = new Set(['https:']);
const SAFE_HOSTS = new Set<string>();

export function configureAllowedHosts(hosts: string[]): void {
  SAFE_HOSTS.clear();
  for (const host of hosts) SAFE_HOSTS.add(host.toLowerCase());
}

export function isAllowedExternalUrl(input: string): boolean {
  try {
    const url = new URL(input);
    return SAFE_PROTOCOLS.has(url.protocol) && (SAFE_HOSTS.size === 0 || SAFE_HOSTS.has(url.host.toLowerCase()));
  } catch { return false; }
}

export function safeExternalUrl(input: string): string | null {
  return isAllowedExternalUrl(input) ? input : null;
}
