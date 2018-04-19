import EgressIntent from './egress-intent';

describe('Initialize', () => {
	test('With no options', () => {
		const egressIntent = new EgressIntent();
		expect(egressIntent).toBeDefined();
	});
	test('With options', () => {
		const egressIntent = new EgressIntent({
			callback: () => { console.log('a'); }
		});
		expect(egressIntent).toBeDefined();
	});
});

describe('Run methods', () => {
	test('Fire doesn\'t error', () => {
		const egressIntent = new EgressIntent();
		egressIntent.fire();
	});
	test('Disable doesn\'t error', () => {
		const egressIntent = new EgressIntent();
		egressIntent.disable();
	});
});
