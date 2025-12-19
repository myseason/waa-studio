export interface Command<TType extends string = string, TPayload = unknown> {
  type: TType;
  payload: TPayload;
}

export interface CommandBatch {
  id: string;
  title: string;
  summary: string;
  commands: Command[];
  risk?: "low" | "medium" | "high";
}

export interface ApplyResult { affectedIds: string[]; }

export type CommandApplier<TState> = (state: TState, command: Command) => ApplyResult;

export class CommandBus<TState> {
  private history: CommandBatch[] = [];
  constructor(private state: TState, private applier: CommandApplier<TState>) {}

  getState(): TState { return this.state; }

  apply(batch: CommandBatch): ApplyResult {
    const affected = new Set<string>();
    for (const cmd of batch.commands) {
      const res = this.applier(this.state, cmd);
      res.affectedIds.forEach((id) => affected.add(id));
    }
    this.history.push(batch);
    return { affectedIds: [...affected] };
  }
}
