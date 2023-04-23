import User from "../../domain/entity/User";
import ITokenGenerator, { Payload } from "../../domain/service/ITokenGenerator";
import { sign, verify } from "jsonwebtoken";

export default class JwtTokenGenerator implements ITokenGenerator {
	constructor(readonly key: string) {}
	verify(token: string): Payload {
		return verify(token, this.key) as Payload;
	}
	generate(user: User, expiresIn: number, issueDate: Date): string {
		return sign(
			{ email: user.email.value, iat: issueDate.getTime(), expiresIn },
			this.key
		);
	}
}
