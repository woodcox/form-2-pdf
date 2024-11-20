import { ErrorBoundary } from 'solid-js';

export default function ErrorBoundaryWrapper({ children }) {
  return (
    <ErrorBoundary fallback={(e) => <p>{e.message}</p>}>
      {children}
    </ErrorBoundary>
  );
}
