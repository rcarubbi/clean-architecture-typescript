import User from "../entity/User";

export default interface ITokenGenerator {
	generate(user: User, expiresIn: number, issueDate: Date): string;
	verify(token: string): Payload;
}

export type Payload = {
	email: string;
};
