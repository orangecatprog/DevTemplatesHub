import type { User } from "../../../domain/entities/user/User";
import type { UserRepositoryContract } from "./UserRepository.contract";
import { FakeRepository } from "@/shared/core/application/contracts/repository/Repository.fake.test";

export class UserRepositoryFake extends FakeRepository<User> implements UserRepositoryContract {
    async findByEmail(email: string): Promise<User> {
        const user = this.items.find((item) => item.email === email);
        if (!user) {
            throw new Error(`User with email ${email} not found`);
        }
        return user;
    }
}
