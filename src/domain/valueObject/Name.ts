export default class Name {
	private _value: string;
	constructor(name: string) {
		if (name.split(" ").length < 2) {
			throw new Error("Invalid name");
		}
		this._value = name;
	}

	public get value(): string {
		return this._value;
	}
}
