import { EventEmitter } from "events";
import { cloneDeep, isFunction } from "lodash";
import type { IFsmInput, TAssign } from "./fsm.interface";

/**
 * Class representing a finite state machine.
 * @extends EventEmitter
 * @template TContext - The type of the context object.
 */
export class Fsm<TContext> extends EventEmitter {
  private stateMachine: IFsmInput<TContext>;
  private savedStateMachine: IFsmInput<TContext>;
  currentState: string | undefined;
  context: TContext;

  /**
   * Create a finite state machine.
   * @param {IFsmInput<TContext>} stateMachine - The initial state machine configuration.
   */
  constructor(stateMachine: IFsmInput<TContext>) {
    super();
    this.stateMachine = cloneDeep(stateMachine);
    this.savedStateMachine = cloneDeep(stateMachine);
    this.context = this.stateMachine.context;
    this.currentState = this.stateMachine.initial;
  }

  /**
   * Start the state machine by resetting it and transitioning to the initial state.
   */
  start(): void {
    this.reset();
    this.transition(this.stateMachine.initial);
  }

  /**
   * Reset the state machine to its initial state and context.
   */
  reset(): void {
    this.stateMachine = cloneDeep(this.savedStateMachine);
    this.setState(this.stateMachine.initial);
    this.assign(cloneDeep(this.stateMachine.context));
  }

  /**
   * Transition to a new state.
   * @param {string} state - The state to transition to.
   */
  transition(state: string): void {
    if (this.currentState !== undefined) {
      const prevTransition = this.stateMachine.states[this.currentState];
      const { _onExit } = prevTransition;
      if (_onExit) _onExit.call(this);
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

  /**
   * Assign a new context value.
   * @param {TAssign<TContext>} value - The new context value or a function to update the context.
   */
  assign(value: TAssign<TContext>): void {
    if (isFunction(value)) {
      this.context = value(this.context);
    } else {
      this.context = value;
    }
    this.emit("value", this.context);
  }

  /**
   * Get the ID of the state machine.
   * @returns {string} - The ID of the state machine.
   */
  get id(): string {
    return this.stateMachine.id;
  }

  /**
   * Get the current context value.
   * @returns {TContext} - The current context value.
   */
  get value(): TContext {
    return this.context;
  }

  /**
   * Set the current state of the state machine.
   * @param {string | undefined} newState - The new state to set.
   * @private
   */
  private setState(newState: string | undefined): void {
    this.currentState = newState;
    this.emit("state", newState);
  }

  /**
   * Get the current state of the state machine.
   * @returns {string | undefined} - The current state.
   */
  get state(): string | undefined {
    return this.currentState;
  }
}

/**
 * Create a new finite state machine.
 * @template TContext - The type of the context object.
 * @param {IFsmInput<TContext>} machine - The state machine configuration.
 * @returns {Fsm<TContext>} - A new finite state machine instance.
 */
export function createMachine<TContext>(
  machine: IFsmInput<TContext>
): Fsm<TContext> {
  return new Fsm(machine);
}
