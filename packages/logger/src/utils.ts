export function transformTime(num: string | number) {
	if (typeof num !== 'number') return num;
	if (num < 1000) return `${num.toFixed(2)}ms`;
	if (num < 60000) return `${(num / 1000).toFixed(2)}s`;
	return `${(num / 60000).toFixed(2)}m`;
}
