import type { IdGeneratorContract } from "./IdGenerator.contract";

export class FakeIdGenerator implements IdGeneratorContract {
    private counter = 0;

    generate(): string {
        return this.counter.toString();
    }
}
