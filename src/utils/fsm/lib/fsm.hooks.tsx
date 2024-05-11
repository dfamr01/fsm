import { useEffect, useState } from "react";
import { Fsm } from "./fsm";

type TReturnUseMachine<TContext> = [
  state: string | undefined,
  value: TContext | undefined,
  transition: (state: string) => void,
  assign: (value: TContext) => void
];

export function useMachine<TContext>(
  fsm: Fsm<TContext>
): TReturnUseMachine<TContext> {
  const [state, setState] = useState(fsm.state);
  const [value, setValue] = useState(fsm.value);

  useEffect(() => {
    const stateUpdate = (state: string) => {
      setState(state);
    };

    const valueUpdate = (value: TContext) => {
      setValue(value);
    };

    fsm.on("state", stateUpdate);
    fsm.on("value", valueUpdate);
    return () => {
      fsm.off("state", stateUpdate);
      fsm.off("value", valueUpdate);
    };
  }, [fsm]);

  const transition = (state: string) => {
    fsm.transition(state);
  };

  const assign = (value: TContext) => {
    fsm.assign(value);
  };

  return [state, value, transition, assign];
}
