export function isCanvas(element: HTMLElement): boolean {
    return element instanceof HTMLCanvasElement;
}

export function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function shuffleArray<T>(array: T[]): T[] {
    return array.map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
}
