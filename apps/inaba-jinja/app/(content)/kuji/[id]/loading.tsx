import Skeleton from "@inabagumi/components/skeleton";

import SimpleTitle from "#/components/simple-title";

export default function KujiLoading() {
  return (
    <>
      <SimpleTitle>
        <Skeleton className="h-4 w-24" />
      </SimpleTitle>

      <div className="flex items-center justify-center">
        <Skeleton className="block h-135 w-63.5" />
      </div>

      <nav className="mt-12">
        <ul className="flex items-center justify-center">
          <li>
            <span className="pointer-events-none inline-block rounded-full bg-x px-6 py-2 text-sm font-semibold tracking-wide text-white opacity-50">
              Xに共有する
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
}
