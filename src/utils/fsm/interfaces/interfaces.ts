// interface IStates extends Fsm {
//   _onEnter: () => void;
//   _onExit?: () => void;
// }

// export interface IFsmInput<TContext> {
//   id: string;
//   initial: string;
//   context: TContext;
//   states: Record<string, IStates>;
// }

// export type TAssign<TContext> =
//   | TContext
//   | ((value: TContext | undefined) => TContext);
