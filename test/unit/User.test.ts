import User from "../../src/domain/entity/User";

test("Deve criar um usuário", async () => {
	const name = "John Doe";
	const email = "john.doe@gmail.com";
	const password = "12345678";
	const expectedPassword =
		"f1fa680348802c16e610e0afa109ef9fd2ea21001bf0449ea4372229cee93a13c3eb08a30068a92b82d376d195f5ed4bebfd9b51413a0ae23dbb38da9141a4b4";
	const age = 30;
	const user = await User.create(name, email, password, age);
	expect(user.name.value).toBe(name);
	expect(user.email.value).toBe(email);
	expect(user.password.value).toBe(expectedPassword);
	expect(user.age).toBe(age);
});

test("Não deve criar um usuário com senha inválida", () => {
	const name = "John Doe";
	const email = "john.doe@gmail.com";
	const password = "123456";
	const age = 30;

	expect(
		async () => await User.create(name, email, password, age)
	).rejects.toThrow(new Error("Invalid password"));
});

test("Não deve criar um usuário com idade inválida", () => {
	const name = "John Doe";
	const email = "john.doe@gmail.com";
	const password = "12345678";
	const age = 17;

	expect(
		async () => await User.create(name, email, password, age)
	).rejects.toThrow(new Error("Invalid age"));
});
