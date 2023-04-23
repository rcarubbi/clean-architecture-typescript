import { AbstractSpecification } from "./Specification";
import User from "../entity/User";

export default class UserAgeSpecification extends AbstractSpecification<User> {
	isSatisfiedBy(t: User): boolean {
		return t.age >= 18;
	}
}
