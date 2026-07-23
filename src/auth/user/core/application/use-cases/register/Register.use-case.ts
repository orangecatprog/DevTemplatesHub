import type { UseCase } from "@/shared/core/application/use-cases";
import type { RegisterInputDTO } from "./dtos/RegisterInput.dto";
import type { RegisterOutputDTO } from "./dtos/RegisterOutput.dto";
import type { UserRepositoryContract } from "../../contracts/repository";
import type { PasswordHasherContract } from "../../contracts/password-hasher";
import type { IdGeneratorContract } from "@/shared/core/application/contracts/id-generator/IdGenerator.contract";
import type { AccountRepositoryContract } from "@/auth/account/core/application/contracts/repository";

export class RegisterUseCase implements UseCase<RegisterInputDTO, RegisterOutputDTO> {
    constructor(
        private readonly userRepository: UserRepositoryContract,
        private readonly passwordHasher: PasswordHasherContract,
        private readonly idGenerator: IdGeneratorContract,
        private readonly accountRepository: AccountRepositoryContract,
    ) {}

    async execute(input: RegisterInputDTO): Promise<RegisterOutputDTO> {
        if (input.password !== input.confirmPassword) {
            throw new Error("Passwords do not match");
        }

        const hashedPassword = await this.passwordHasher.hash(input.password);

        const userId = this.idGenerator.generate();

        this.userRepository.save({
            id: userId,
            email: input.email,
            password: hashedPassword,
            accountId: "",
        });

        const accountId = this.idGenerator.generate();

        this.accountRepository.save({
            id: accountId,
            username: input.email,
            bio: "",
        });

        return {
            userId,
            accountId,
        };
    }
}
