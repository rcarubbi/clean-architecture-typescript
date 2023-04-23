import { pbkdf2, randomBytes } from "crypto";

export default class Password {
	constructor(readonly value: string, readonly salt: string) {}

	static create(password: string, salt?: string): Promise<Password> {
		if (password.length < 8) throw new Error("Invalid password");

		const generatedSalt = salt || randomBytes(20).toString("hex");
		return Password.encrypt(password, generatedSalt);
	}

	private static encrypt(password: string, salt: string): Promise<Password> {
		return new Promise((resolve) => {
			pbkdf2(password, salt, 100, 64, "sha512", (_error, value) => {
				resolve(new Password(value.toString("hex"), salt));
			});
		});
	}

	async validate(plainPassword: string): Promise<boolean> {
		const password = await Password.encrypt(plainPassword, this.salt);
		return this.value === password.value;
	}
}
