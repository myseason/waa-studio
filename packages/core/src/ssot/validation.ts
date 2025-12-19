export type ValidationSeverity = "info" | "warning" | "error";

export interface ValidationIssue {
  issueId: string;
  severity: ValidationSeverity;
  message: string;
  targetRef?: { type: "page" | "node" | "flow"; id: string };
}

export type ValidationRule<TState> = (state: TState, affectedIds: string[]) => ValidationIssue[];

export class ValidationEngine<TState> {
  constructor(private rules: ValidationRule<TState>[]) {}
  run(state: TState, affectedIds: string[]): ValidationIssue[] {
    return this.rules.flatMap((r) => r(state, affectedIds));
  }
}
