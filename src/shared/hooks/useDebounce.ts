/**
 * Shared custom debounce hook
 */
export function useDebounce<T>(value: T, delay: number = 300): () => T {
  let currentValue = value;
  let timer: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      currentValue = value;
    }, delay);
    return currentValue;
  };
}
