const emojiGuild = '884139129720422500';

function makeEmoji(name: string, id: string) {
	return `<:${name}:${id}>`;
}

console.log('after guild', emojiGuild);

export const alpha = makeEmoji('alpha', '884140924337291344');
export const beta = makeEmoji('beta', '884140924362444860');
export const mu = makeEmoji('mu', '884148767316647988');
export const sigma = makeEmoji('sigma', '884148767765438524');