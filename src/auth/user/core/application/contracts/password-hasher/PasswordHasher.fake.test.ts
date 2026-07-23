import type { PasswordHasherContract } from "./PasswordHasher.contract";

export class FakePasswordHasher implements PasswordHasherContract {
    async hash(password: string): Promise<string> {
        return "hashed-password#" + password;
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return hashedPassword === "hashed-password#" + password;
    }
}
