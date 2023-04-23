import User from "../../../src/domain/entity/User";
import JwtTokenGenerator from "../../../src/infra/service/JwtTokenGenerator";

test("Deve gerar o token", async () => {
	const tokenGenerator = new JwtTokenGenerator("secret");
	const user = await User.create(
		"John Doe",
		"john.doe@gmail.com",
		"12345678",
		30
	);
	const expectedToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY2NDgwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDB9.f9AKA8brALSYMb6Go2qq53F21IeoMv_pjlvMlCNNNbE";
	const token = tokenGenerator.generate(
		user,
		100000,
		new Date("2023-03-01T10:00:00")
	);
	expect(token).toBe(expectedToken);
});

test("Deve verificar o token", async () => {
	const tokenGenerator = new JwtTokenGenerator("secret");
	const expectedEmail = "john.doe@gmail.com";
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY2NDgwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDB9.f9AKA8brALSYMb6Go2qq53F21IeoMv_pjlvMlCNNNbE";
	const payload = tokenGenerator.verify(token);
	expect(payload.email).toBe(expectedEmail);
});
