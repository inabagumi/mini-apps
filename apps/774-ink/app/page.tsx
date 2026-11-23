export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4">
      <h1 className="hidden">774 ink.</h1>
      <p className="my-12 text-5xl font-bold">
        <span className="max-xs:block">もしかして:&nbsp;</span>
        <a
          className="text-accent hover:underline max-xs:block"
          href="https://774.ai/"
          rel="noopener noreferrer"
          target="_blank"
        >
          774 inc.
        </a>
      </p>
    </div>
  );
}
