import { useCallback, useEffect, useState } from "react";
import { Fsm } from "./fsm";

interface IReturn<TContext> {
  state: string | undefined;
  value: TContext | undefined;
  transition: (state: string) => void;
  assign: (value: TContext) => void;
  start: () => void;
  reset: () => void;
}

export function useMachine<TContext>(fsm?: Fsm<TContext>): IReturn<TContext> {
  const [state, setState] = useState(fsm?.state);
  const [value, setValue] = useState(fsm?.value);

  useEffect(() => {
    const stateUpdate = (state?: string) => {
      setState(state);
    };

    const valueUpdate = (value: TContext) => {
      setValue(value);
    };
    if (fsm) {
      stateUpdate(fsm.state);
      valueUpdate(fsm.value);
      fsm.on("state", stateUpdate);
      fsm.on("value", valueUpdate);
      return () => {
        fsm.off("state", stateUpdate);
        fsm.off("value", valueUpdate);
        setState(undefined);
        setValue(undefined);
      };
    }
  }, [fsm]);

  const transition = useCallback(
    (state: string) => {
      fsm?.transition(state);
    },
    [fsm]
  );

  const assign = useCallback(
    (value: TContext) => {
      fsm?.assign(value);
    },
    [fsm]
  );

  const start = useCallback(() => {
    fsm?.start();
  }, [fsm]);

  const reset = useCallback(() => {
    fsm?.reset();
  }, [fsm]);

  return { state, value, transition, assign, start, reset };
}
