import { useRouter } from "next/router";

function Component() {
  const router = useRouter();

  return (
    <div>
      <p>Current ID parameter: {router.query.id}</p>
    </div>
  );
}

export const exp = Component;
