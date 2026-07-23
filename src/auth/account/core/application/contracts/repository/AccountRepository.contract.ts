import type { RepositoryContract } from "@/shared/core/application/contracts/repository";
import type { Account } from "../../../domain/entities/account";

export interface AccountRepositoryContract extends RepositoryContract<Account> {
    findByUsername(username: string): Promise<Account>;
}
