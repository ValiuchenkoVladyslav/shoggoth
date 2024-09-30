"use client";

import {
  QueryClient,
  QueryClientProvider as _QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export function QueryClientProvider(props: React.PropsWithChildren) {
  return <_QueryClientProvider client={queryClient} {...props} />;
}
