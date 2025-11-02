/**
 * Gets the base path from environment variable
 * In production, this will be '/ismgroup17/ubookit', in development it's empty
 */
export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || '';
}

/**
 * Prefixes a path with the base path if needed
 * This ensures images and other assets work correctly with basePath
 */
export function withBasePath(path: string): string {
  const basePath = getBasePath();
  // If path already starts with basePath, return as is
  if (basePath && path.startsWith(basePath)) {
    return path;
  }
  // If basePath exists and path starts with '/', combine them
  if (basePath && path.startsWith('/')) {
    return `${basePath}${path}`;
  }
  // Otherwise, ensure path starts with '/'
  return path.startsWith('/') ? path : `/${path}`;
}

