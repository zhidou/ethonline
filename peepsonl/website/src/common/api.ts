export async function lookupUsername(username: string): Promise<string | null> {
  return ["3n4", "6oo6", "123", "7cc"].includes(username) ? username : null;
}
