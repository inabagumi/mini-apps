import { connection } from "next/server";

import { getAnyFortuneID } from "#/lib/contentful";
import { delay } from "#/lib/timer";

import Redirect from "./redirect";

export default async function FortuneRedirect() {
  await connection();

  // Create the promise here rather than in `Redirect`: a promise created in a
  // Client Component is recreated on every render, so it never settles while
  // the component is suspended.
  const idPromise = Promise.all([getAnyFortuneID(), delay(2)]).then(
    ([id]) => id
  );

  return <Redirect idPromise={idPromise} />;
}
