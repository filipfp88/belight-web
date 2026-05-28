// Strips dangerous HTML while keeping safe formatting tags (strong, em, span, br, a).
// Blocks: <script>, <iframe>, <object>, event handlers (on*=...), javascript: URIs.
export function sanitizeHtml(input: string): string {
  return input
    // Remove script/iframe/object/style blocks entirely
    .replace(/<(script|iframe|object|embed|style|base|form|input|button)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|iframe|object|embed|style|base|form|input|button)[^>]*\/?>/gi, "")
    // Strip event handlers (onclick, onmouseover, onerror, etc.)
    .replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, "")
    // Strip javascript: and data: URIs in href/src/action
    .replace(/(href|src|action)\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*'|javascript:\S*)/gi, "")
    .replace(/(href|src|action)\s*=\s*(?:"data:[^"]*"|'data:[^']*'|data:\S*)/gi, "")
}
