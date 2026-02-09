export default function isNumber(val: any): val is number {
	return typeof val === 'number';
}
