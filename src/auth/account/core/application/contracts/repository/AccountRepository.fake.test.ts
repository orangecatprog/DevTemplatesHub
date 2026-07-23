import { FakeRepository } from "@/shared/core/application/contracts/repository/Repository.fake.test";
import type { Account } from "../../../domain/entities/account";
import type { AccountRepositoryContract } from "./AccountRepository.contract";

export class AccountRepositoryFake
    extends FakeRepository<Account>
    implements AccountRepositoryContract
{
    async findByUsername(username: string): Promise<Account> {
        const account = this.items.find((item) => item.username === username);
        if (!account) {
            throw new Error(`Account with username ${username} not found`);
        }
        return account;
    }
}
