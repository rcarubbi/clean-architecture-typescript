export default class Email {
	private _value: string;
	constructor(email: string) {
		if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
			throw new Error("Invalid email");
		}
		this._value = email;
	}

	public get value(): string {
		return this._value;
	}
}
