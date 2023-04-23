import UserAgeSpecification from "../specification/UserAgeSpecification";
import Email from "../valueObject/Email";
import Name from "../valueObject/Name";
import Password from "../valueObject/Password";

export default class User {
	private constructor(
		readonly name: Name,
		readonly email: Email,
		readonly password: Password,
		readonly age: number
	) {
		const ageSpeficication = new UserAgeSpecification();

		if (ageSpeficication.not().isSatisfiedBy(this)) {
			throw Error("Invalid age");
		}
	}

	static async create(
		name: string,
		email: string,
		password: string,
		age: number
	) {
		return new User(
			new Name(name),
			new Email(email),
			await Password.create(password, "salt"),
			age
		);
	}

	static async buildExistingUser(
		name: string,
		email: string,
		hashPassword: string,
		salt: string,
		age: number
	) {
		return new User(
			new Name(name),
			new Email(email),
			new Password(hashPassword, salt),
			age
		);
	}

	async validatePassword(plainPassword: string): Promise<boolean> {
		return this.password.validate(plainPassword);
	}
}
