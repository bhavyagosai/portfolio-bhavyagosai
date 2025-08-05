import { LoaderProvider } from "@/context/LoaderContext";
import { CursorFlareProvider } from "@/context/CursorFlareContext";
import { AppRefProvider } from "@/context/AppRefContext";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoaderProvider>
      <CursorFlareProvider>
        <AppRefProvider>{children}</AppRefProvider>
      </CursorFlareProvider>
    </LoaderProvider>
  );
}
