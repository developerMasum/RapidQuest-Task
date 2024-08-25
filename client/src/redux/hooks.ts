import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useEffect, useState } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

type TDebounceProps = {
  searchQuery: string;
  delay: number;
};

export const useDebounced = ({ searchQuery, delay }: TDebounceProps) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
      return () => {
        clearTimeout(handler);
      };
    }, delay);
  }, [searchQuery, delay]);
  return debouncedValue;
};
