import { Suspense } from "react";

import Loader from "./Loader";

// Function to wrap lazy components in <Suspense>
// eslint-disable-next-line no-unused-vars
export default function LazyLoad(Component) {
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
}
