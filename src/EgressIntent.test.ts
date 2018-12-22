import EgressIntent from './EgressIntent';

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
