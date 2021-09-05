export async function awaitIterator<A>(iterable: AsyncIterable<A>): Promise<A[]> {
	const result: A[] = [];
	for await (const el of iterable) result.push(el);
	return result;
}

export function zip<A, B>(as: A[], bs: B[]): [A, B][] {
	return as.length > bs.length ? as.map((a, idx) => [a, bs[idx]]) : bs.map((b, idx) => [as[idx], b]);
}