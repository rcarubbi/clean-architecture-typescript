import ITokenGenerator, { Payload } from "../../domain/service/ITokenGenerator";

export default class GetSession {
	constructor(readonly tokenGenerator: ITokenGenerator) {}

	async execute(token: string): Promise<Payload> {
		const payload = this.tokenGenerator.verify(token);
		return payload;
	}
}
