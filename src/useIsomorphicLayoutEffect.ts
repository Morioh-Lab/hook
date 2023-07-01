import { useLayoutEffect, useEffect } from "react";
import { isBrowser } from "./helper";

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;