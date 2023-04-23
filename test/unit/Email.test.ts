import Email from "../../src/domain/valueObject/Email";

test("Deve criar um email válido", () => {
	const email = new Email("john.doe@gmail.com");
	expect(email.value).toBe("john.doe@gmail.com");
});

test("Não deve criar um email válido", () => {
	expect(() => new Email("john.doe@gmail")).toThrow(new Error("Invalid email"));
});
