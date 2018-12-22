import EgressIntent from './EgressIntent';

function deleteAllCookies() {
	var cookies = document.cookie.split(";");

	for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			var eqPos = cookie.indexOf("=");
			var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
}

describe('Fire', () => {
	afterEach(() => {
		deleteAllCookies();
	});

	it('should not error', () => {
		const egressIntent = new EgressIntent();
		egressIntent.fire();
	});

	it('should call the passed callback', () => {
		const cb = jest.fn();
		const egressIntent = new EgressIntent({ callback: cb });

		egressIntent.fire();

		expect(cb).toBeCalledTimes(1);
	});

	it('should call disable', () => {
		const egressIntent = new EgressIntent();
		const spy = jest.spyOn(egressIntent, 'disable');

		egressIntent.fire();

		expect(spy).toBeCalledTimes(1);
	});

	it('should not call the passed callback if already disabled', () => {
		const cb = jest.fn();
		const egressIntent = new EgressIntent({ callback: cb });

		egressIntent.disable();
		egressIntent.fire();

		expect(cb).toBeCalledTimes(0);
	});

	it('should not call disable if already disabled', () => {
		const egressIntent = new EgressIntent();

		egressIntent.disable();

		const spy = jest.spyOn(egressIntent, 'disable');

		egressIntent.fire();

		expect(spy).toBeCalledTimes(0);
	});

	it('should not call the passed callback a second time', () => {
		const cb = jest.fn();
		const egressIntent = new EgressIntent({ callback: cb });

		egressIntent.fire();
		egressIntent.fire();

		expect(cb).toBeCalledTimes(1);
	});

	it('should fire callback every time if set to aggressive', () => {
		const cb = jest.fn();
		const egressIntent = new EgressIntent({ callback: cb, aggressive: true });

		egressIntent.fire();
		egressIntent.fire();

		expect(cb).toBeCalledTimes(2);
	});
});

describe('Disable', () => {
	it(`should not error`, () => {
		const egressIntent = new EgressIntent();
		egressIntent.disable();
	});

	it('should call removeEventListener twice on its target', () => {
		const spy = jest.spyOn(document.documentElement, 'removeEventListener');
		const egressIntent = new EgressIntent();
		egressIntent.disable();
		expect(spy).toBeCalledTimes(2);
	});

	it('should call removeEventListener with mouseleave', () => {
		const spy = jest.spyOn(document.documentElement, 'removeEventListener');
		const egressIntent = new EgressIntent();
		egressIntent.disable();
		expect(spy).toBeCalledWith('mouseleave', expect.any(Function));
	});

	it('should call removeEventListener with mouseenter', () => {
		const spy = jest.spyOn(document.documentElement, 'removeEventListener');
		const egressIntent = new EgressIntent();
		egressIntent.disable();
		expect(spy).toBeCalledWith('mouseenter', expect.any(Function));
	});
});
