// types.ts

// Import only types to avoid circular dependencies
import type { Fsm } from "./fsm";

export type FsmClassCtx<TContext> = Pick<
  Fsm<TContext>,
  "start" | "reset" | "transition" | "assign" | "value"
>;

export interface IStates<TContext> {
  _onEnter: (this: FsmClassCtx<TContext>) => void;
  _onExit?: (this: FsmClassCtx<TContext>) => void;
}

export interface IFsmInput<TContext> {
  id: string;
  initial: string;
  context: TContext;
  states: Record<string, IStates<TContext>>;
}

export type TAssign<TContext> = TContext | ((value: TContext) => TContext);
