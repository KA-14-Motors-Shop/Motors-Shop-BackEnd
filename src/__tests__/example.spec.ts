// Exemplo de estrutura para os testes
import { AppDataSource } from "../data-source";

describe("test file", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });
  it("Shoul sum numbers", () => {
    expect(2 + 2).toBe(4);
  });
});
