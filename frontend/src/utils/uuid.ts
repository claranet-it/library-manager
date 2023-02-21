export function uuidv4(): string {
  return self.crypto.randomUUID();
}
