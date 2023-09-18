import type { V2_MetaFunction } from "@remix-run/node";
import { TopBar } from "~/components";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <TopBar>
        <h1 className="text-zinc-800 text-2xl text-center">Tailwind CSS</h1>
      </TopBar>
    </>
  );
}
