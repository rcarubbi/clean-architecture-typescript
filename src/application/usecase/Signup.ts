import User from "../../domain/entity/User";
import IUserRepository from "../repository/IUserRepository";

export default class Signup {
	constructor(readonly userRepostory: IUserRepository) {}

	async execute(input: Input): Promise<void> {
		const user = await User.create(
			input.name,
			input.email,
			input.password,
			input.age
		);

		await this.userRepostory.save(user);
	}
}

type Input = {
	name: string;
	email: string;
	password: string;
	age: number;
};
