export class PatchAdminCommand {
  constructor(
    public readonly id: string,
    public readonly key: string,
    public readonly value: string,
    public readonly prevPassword?: string,
  ) {}
}
