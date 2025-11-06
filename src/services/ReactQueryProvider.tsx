import type { ReactElement } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export type ReactQueryProviderProps = {
  children: React.ReactNode;
};

function ReactQueryProvider(props: ReactQueryProviderProps): ReactElement {
  const { children } = props;
  const [queryClient] = useState(() => new QueryClient(({
    defaultOptions: {
      queries: {},
    },
  })));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false}/> */}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
