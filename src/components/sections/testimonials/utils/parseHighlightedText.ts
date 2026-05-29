interface TextSegment {
  text: string;
  highlight: boolean;
}

/**
 * Parses markdown-style bold syntax (**text**) into segments.
 *
 * @example
 * parseHighlightedText("A **game-changer** in my journey")
 * // → [
 * //   { text: "A ", highlight: false },
 * //   { text: "game-changer", highlight: true },
 * //   { text: " in my journey", highlight: false }
 * // ]
 */
export function parseHighlightedText(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  const pattern = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, match.index),
        highlight: false,
      });
    }
    segments.push({ text: match[1], highlight: true });
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), highlight: false });
  }

  return segments;
}
