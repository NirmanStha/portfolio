export interface MemoryCard {
  key: string;
  skillName: string;
}

export function buildDeck(
  skillNames: string[],
  random: () => number = Math.random,
): MemoryCard[] {
  const cards: MemoryCard[] = skillNames.flatMap((name) => [
    { key: `${name}-a`, skillName: name },
    { key: `${name}-b`, skillName: name },
  ]);
  // Fisher–Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export function isMatch(a: MemoryCard, b: MemoryCard): boolean {
  return a.skillName === b.skillName && a.key !== b.key;
}
