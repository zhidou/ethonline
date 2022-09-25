export function removeAtSign(s: string) {
  if (s.length === 0) return s;
  return s[0] === "@" ? s.substring(1) : s;
}
