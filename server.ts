import { createServer } from 'http';

export const server = createServer((req, res) => {
	res.end('Hello replit keepalive');
});

export function start(port = 80) {
	return new Promise<void>(resolve => {
		server.listen(port, () => resolve());
	});
}