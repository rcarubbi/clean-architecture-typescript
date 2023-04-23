import Signup from "../../src/application/usecase/Signup";
import Login from "../../src/application/usecase/Login";
import UserMemoryRepository from "../../src/infra/repository/memory/UserMemoryRepository";
import ITokenGenerator from "../../src/domain/service/ITokenGenerator";
import {
	mock,
	instance,
	when,
	anyOfClass,
	anyNumber,
	anything,
} from "ts-mockito";

test("Deve fazer o signup", async () => {
	// given - arrange
	const userRepository = new UserMemoryRepository();
	const mockedTokenGenerator: ITokenGenerator = mock<ITokenGenerator>();
	const tokenGenerator: ITokenGenerator = instance(mockedTokenGenerator);
	const expectedToken = "123456";
	when(
		mockedTokenGenerator.generate(anything(), anyNumber(), anyOfClass(Date))
	).thenReturn(expectedToken);

	const signup = new Signup(userRepository);
	const signupInput = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		password: "12345678",
		age: 30,
	};

	// when - act
	await signup.execute(signupInput);

	// then - assert
	const login = new Login(userRepository, tokenGenerator);
	const loginInput = {
		email: signupInput.email,
		password: signupInput.password,
	};
	const loginOutput = await login.execute(loginInput);
	expect(loginOutput.name).toBe(signupInput.name);
	expect(loginOutput.token).toBe(expectedToken);
});

test("Não deve fazer o signup se o nome for inválido", async () => {
	// given - arrange
	const userRepository = new UserMemoryRepository();
	const signup = new Signup(userRepository);
	const signupInput = {
		name: "John",
		email: "john.doe@gmail.com",
		password: "12345678",
		age: 30,
	};

	// when - act, then - assert
	expect(async () => await signup.execute(signupInput)).rejects.toThrow(
		new Error("Invalid name")
	);
});
