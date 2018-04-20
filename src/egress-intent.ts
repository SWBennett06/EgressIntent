export interface EgressIntentOptions {
	aggressive?: boolean;
	timer?: number;
	delay?: number;
	callback: Function;
	cookieExpire?: number;
	cookieDomain?: string;
	cookieName?: string;
	sitewide?: boolean;
	target?: HTMLElement;
}

export interface EgressIntentDisableOptions {
	cookieExpire?: number;
	cookieDomain?: string;
	cookieName?: string;
	sitewide?: boolean;
}

export default class EgressIntent {
	private defaultOptions: EgressIntentOptions = {
		aggressive: false,
		timer: 1000,
		delay: 0,
		cookieExpire: 1,
		cookieDomain: '',
		cookieName: 'triggeredEI',
		target: document.documentElement,
		callback: function(): void {}
	};
	private config: EgressIntentOptions;
	private delayTimer: number;

	constructor(options?: EgressIntentOptions) {
		this.config = { ...this.defaultOptions, ...options };

		setTimeout(this.attachListeners, this.config.timer);
	}

	public fire = (): void => {
		if (this.isDisabled())
			return;

		if (this.config.callback)
			this.config.callback();

		this.disable();
	}
	public disable(options?: EgressIntentDisableOptions): void {
		const disableOptions = { ...this.config, ...options };
		document.cookie
			= this.buildCookie(
				disableOptions.cookieName,
				disableOptions.cookieExpire,
				disableOptions.cookieDomain,
				disableOptions.sitewide
			);

		this.config.target.removeEventListener('mouseleave', this.handleMouseLeave);
		this.config.target.removeEventListener('mouseenter', this.handleMouseEnter);
	}

	private attachListeners = (): void => {
		if (this.isDisabled())
			return;

		this.config.target.addEventListener('mouseleave', this.handleMouseLeave);
		this.config.target.addEventListener('mouseenter', this.handleMouseEnter);
	}

	private checkCookieValue(cookieName: string, value: string): boolean {
		return document.cookie.split('; ').indexOf(`${cookieName}=${value}`) >= 0;
	}

	private isDisabled(): boolean {
		return this.checkCookieValue(this.config.cookieName, 'true') && !this.config.aggressive;
	}

	private buildCookie(
		name: string = this.config.cookieName,
		expire: number = this.config.cookieExpire,
		domain: string = this.config.cookieDomain,
		sitewide: boolean = this.config.sitewide
	): string {
		let time = 0;
		if (expire) {
			// convert to milliseconds
			time = expire * 24 * 60 * 60 * 1000;
		}
		const date = new Date(Date.now() + time);

		const domainString =
			domain
				? `;domain=${domain}`
				: '';

		const sitewideString =
			sitewide
				? '; path=/'
				: '';

		return `${name}=true; expires=${date.toUTCString()}${domainString}${sitewideString}`;
	}

	private handleMouseLeave = (event: MouseEvent) => {
		this.delayTimer = setTimeout(this.fire, this.config.delay);
	}
	private handleMouseEnter = (event: MouseEvent) => {
		if (this.delayTimer) {
			clearTimeout(this.delayTimer);
			this.delayTimer = undefined;
		}
	}
}
