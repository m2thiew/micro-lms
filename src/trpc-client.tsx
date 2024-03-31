import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type TEndpoints } from "./trpc-server";

const client = createTRPCNext<TEndpoints>({
  config() {
    return { links: [httpBatchLink({ url: "http://localhost:3000/api/trpc" })] };
  },
});

function Content() {
  const username = client.getUserName.useQuery();

  if (username.data) {
    return <h1>Username: {username.data}</h1>;
  } else {
    return <p>loading data...</p>;
  }
}
