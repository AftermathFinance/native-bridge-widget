export function getEnvVariable(name: string): string | undefined {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    // Vite environment variable
    return import.meta.env[name] as string;
  }
  if (typeof process !== "undefined" && process.env) {
    // CRA or Node.js environment variable
    return process.env[name] as string;
  }
  return undefined;
}
