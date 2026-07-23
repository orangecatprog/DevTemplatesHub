import { describe, test, expect } from "vitest";
import { RegisterUseCase } from "./Register.use-case";
import { UserRepositoryFake } from "../../contracts/repository/UserRepository.fake.test";
import { FakePasswordHasher } from "../../contracts/password-hasher/PasswordHasher.fake.test";
import { FakeIdGenerator } from "@/shared/core/application/contracts/id-generator/IdGenerator.fake.test";
import { AccountRepositoryFake } from "@/auth/account/core/application/contracts/repository/AccountRepository.fake.test";

describe("Register UseCase", () => {
    describe("should register a valid user", () => {
        test("should register a valid user", async () => {
            const userRepository = new UserRepositoryFake();
            const passwordHasher = new FakePasswordHasher();
            const idGenerator = new FakeIdGenerator();
            const accountRepository = new AccountRepositoryFake();

            const useCase = new RegisterUseCase(
                userRepository,
                passwordHasher,
                idGenerator,
                accountRepository,
            );

            const result = await useCase.execute({
                email: "test@email.com",
                password: "test_-password123",
                confirmPassword: "test_-password123",
            });

            const user = await userRepository.findById(result.userId);

            expect(user.email).toBe("test@email.com");
            expect(user.password).toBe(await passwordHasher.hash("test_-password123"));

            const account = await accountRepository.findById(result.accountId);

            expect(account.username).toBe(user.email);
            expect(account.bio).toBe("");
        });
    });
});
