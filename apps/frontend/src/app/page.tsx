import Image from "next/image";
import { CreateThreadModalContainer } from "./_create-thread-modal";
import { ThreadList } from "./_thread-list";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-100">
      <section className="relative isolate overflow-hidden bg-teal-500 h-[300px] sm:h-[400px]">
        <Image
          src="/forest.svg"
          alt=""
          aria-hidden
          priority
          fill
          sizes="100vw"
          className="pointer-events-none select-none"
          style={{ objectFit: "cover", objectPosition: "bottom" }}
        />
        <div className="relative mx-auto max-w-5xl flex h-full items-center justify-center">
          <h1 className="text-center text-4xl font-extrabold tracking-wide text-white sm:text-5xl mb-18">
            森林ちゃんねる
          </h1>
        </div>
      </section>
      <div className="relative mx-auto -mt-24 w-full max-w-[1350px] px-2 sm:px-6 sm:-mt-24">
        <div className="rounded-3xl bg-white shadow-xl  overflow-auto">
          <ThreadList />
          <div className="min-h-[420px]" />
        </div>
      </div>
      <CreateThreadModalContainer />
    </main>
  );
}
