/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Wallet from "../islands/Wallet.tsx";

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <Wallet />
    </div>
  );
}
