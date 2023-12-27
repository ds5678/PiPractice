async function getJSON(url) {
	const response = await fetch(url);
	return await response.json();
}

async function getDigits(count) {
	let json = await getJSON('https://api.pi.delivery/v1/pi?start=0&numberOfDigits=' + count);
	return json.content;
}

const app = Vue.createApp({
	data() {
		return {
			digitCount: 314,
			lines: []
		}
	},
	methods: {
		async RecalculateLines() {
			let digitText = await getDigits(this.digitCount);
			let lines = [];
			lines.push("3.");
			for (let i = 1; i < digitText.length; i += 10) {
				let end = Math.min(i + 10, digitText.length);
				lines.push(digitText.substring(i, end));
			}
			this.lines = lines;
		}
	},
	async created() {
		await this.RecalculateLines();
	}
});