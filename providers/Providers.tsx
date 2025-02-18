
import PHProvider from "@/providers/PostHogProvider";
import TanStackProvider from "@/providers/TanstackQuery";

export const Providers = ({ children }) => {
  return (
    <PHProvider>
      <TanStackProvider>
        {children}
      </TanStackProvider>
    </PHProvider>
  );
}
