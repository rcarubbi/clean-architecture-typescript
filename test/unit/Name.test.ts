import Name from "../../src/domain/valueObject/Name";

test("Deve criar um nome válido", () => {
	const name = new Name("John Doe");
	expect(name.value).toBe("John Doe");
});

test("Não deve criar um nome válido", () => {
	expect(() => new Name("John")).toThrow(new Error("Invalid name"));
});
