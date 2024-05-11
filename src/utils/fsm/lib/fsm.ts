import { EventEmitter } from "events";

import { cloneDeep, isFunction } from "lodash";

type FsmClassCtx<TContext> = Pick<
  Fsm<TContext>,
  "start" | "reset" | "transition" | "assign"
>;

interface IStates<TContext> {
  _onEnter: (this: FsmClassCtx<TContext>) => void;
  _onExit?: (this: FsmClassCtx<TContext>) => void;
}

export interface IFsmInput<TContext> {
  id: string;
  initial: string;
  context: TContext;
  states: Record<string, IStates<TContext>>;
}

export type TAssign<TContext> =
  | TContext
  | ((value: TContext | undefined) => TContext);

export class Fsm<TContext> extends EventEmitter {
  private stateMachine;
  currentState?: string;
  context: TContext | undefined;

  constructor(stateMachine: IFsmInput<TContext>) {
    super();

    this.stateMachine = cloneDeep(stateMachine); //cloning to prevent side-effects
    this.state = stateMachine.initial;
    this.assign(this.stateMachine.context);
  }

  start() {
    this.reset();
    this.transition(this.stateMachine.initial);
  }

  reset() {
    this.state = undefined;
    this.assign(this.stateMachine.context);
  }

  transition(state: string) {
    if (this.currentState !== undefined) {
      const prevTransition = this.stateMachine.states[this.currentState];
      const { _onExit } = prevTransition;
      _onExit && _onExit.call(this);
    }

    this.state = state;
    const currentTransition = this.stateMachine.states[state];
    if (!currentTransition) {
      console.error(`transition: state ${this.currentState} not found`);
      return;
    }

    const { _onEnter } = currentTransition;
    if (!_onEnter) {
      console.error(
        `transition: state ${this.currentState} _onEnter is not defined`
      );
      return;
    }
    _onEnter.call(this);
  }

  assign(value: TAssign<TContext>) {
    if (isFunction(value)) {
      this.value = value(this.context);
    } else {
      this.value = value;
    }
  }

  //   send() {}

  get id() {
    return this.stateMachine.id;
  }

  private set value(newValue) {
    this.context = newValue;
    this.emit("value", this.context);
  }

  get value() {
    return this.context;
  }

  private set state(newState) {
    this.currentState = newState;
    this.emit("state", newState);
  }

  get state() {
    return this.currentState;
  }
}

export function createMachine<TContext>(machine: IFsmInput<TContext>) {
  return new Fsm(machine);
}
