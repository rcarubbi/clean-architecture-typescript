import IUserRepository from "../../../application/repository/IUserRepository";
import User from "../../../domain/entity/User";

export default class UserMemoryRepository implements IUserRepository {
	users: User[];

	constructor() {
		this.users = [];
	}

	async save(user: User): Promise<void> {
		this.users.push(user);
	}

	async getByEmail(email: string): Promise<User | undefined> {
		return this.users.find((user: User) => user.email.value === email);
	}
}
