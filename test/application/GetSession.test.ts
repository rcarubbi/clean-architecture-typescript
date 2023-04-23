import GetSession from "../../src/application/usecase/GetSession";
import { mock, instance, when } from "ts-mockito";
import ITokenGenerator from "../../src/domain/service/ITokenGenerator";

test("Deve verificar se está autenticado", async () => {
	const mockedTokenGenerator: ITokenGenerator = mock<ITokenGenerator>();
	const tokenGenerator: ITokenGenerator = instance(mockedTokenGenerator);
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY2NDgwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDB9.f9AKA8brALSYMb6Go2qq53F21IeoMv_pjlvMlCNNNbE";

	when(mockedTokenGenerator.verify(token)).thenReturn({
		email: "john.doe@gmail.com",
	});

	const getSession = new GetSession(tokenGenerator);

	const payload = await getSession.execute(token);

	expect(payload.email).toBe("john.doe@gmail.com");
});
