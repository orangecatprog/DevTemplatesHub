import type { RepositoryContract } from "@/shared/core/application/contracts/repository/Repository.contract";
import type { User } from "@/auth/user/core/domain/entities/user";

export interface UserRepositoryContract extends RepositoryContract<User> {
    findByEmail(email: string): Promise<User>;
}
