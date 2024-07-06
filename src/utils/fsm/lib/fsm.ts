import { EventEmitter } from "events";

import { cloneDeep, isFunction } from "lodash";

type FsmClassCtx<TContext> = Pick<
  Fsm<TContext>,
  "start" | "reset" | "transition" | "assign" | "value"
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

type TAssign<TContext> = TContext | ((value: TContext) => TContext);

export class Fsm<TContext> extends EventEmitter {
  private stateMachine;
  private savedStateMachine;
  currentState: string | undefined;
  context: TContext;

  constructor(stateMachine: IFsmInput<TContext>) {
    super();

    this.stateMachine = cloneDeep(stateMachine); //cloning to prevent side-effects
    this.savedStateMachine = cloneDeep(stateMachine); //cloning to prevent side-effects
    this.context = this.stateMachine.context;
    this.currentState = this.stateMachine.initial;
  }

  start() {
    this.reset();
    this.transition(this.stateMachine.initial);
  }

  reset() {
    this.stateMachine = cloneDeep(this.savedStateMachine);
    this.setState(this.stateMachine.initial);
    this.assign(cloneDeep(this.stateMachine.context));
  }

  transition(state: string) {
    if (this.currentState !== undefined) {
      const prevTransition = this.stateMachine.states[this.currentState];
      const { _onExit } = prevTransition;
      _onExit && _onExit.call(this);
    }

    this.setState(state);
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
      this.context = value(this.context);
    } else {
      this.context = value;
    }
    this.emit("value", this.context);
  }

  get id() {
    return this.stateMachine.id;
  }

  get value() {
    return this.context;
  }

  private setState(newState: string | undefined) {
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
