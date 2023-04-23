import ITokenGenerator from "../../domain/service/ITokenGenerator";
import IUserRepository from "../repository/IUserRepository";

export default class Login {
	constructor(
		readonly userRepository: IUserRepository,
		readonly tokenGenerator: ITokenGenerator
	) {}

	async execute(input: Input): Promise<Output> {
		const user = await this.userRepository.getByEmail(input.email);

		const isValidPassword = await user?.validatePassword(input.password);

		if (!isValidPassword) {
			throw new Error("Authentication Failed");
		}

		const token = this.tokenGenerator.generate(user!, 100000, new Date());

		return {
			name: user!.name.value,
			token,
		};
	}
}

type Input = {
	email: string;
	password: string;
};

type Output = {
	name: string;
	token: string;
};
