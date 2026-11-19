"use client";

import { Menu } from "@base-ui/react/menu";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

import { useAsset } from "./asset";

export default function HeaderMenu() {
  const { assets, setAssetID } = useAsset();

  return (
    <Menu.Root>
      <Menu.Trigger className="m-2 rounded-full p-2 focus:bg-white/25 focus:outline-hidden">
        <EllipsisVerticalIcon className="h-5 w-5" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner align="end">
          <Menu.Popup className="block border border-black/25 bg-white/99 p-0 text-[85%] whitespace-nowrap outline-hidden">
            {assets.map((asset) => (
              <Menu.Item
                className="block cursor-pointer px-5 py-1.25 select-none data-highlighted:bg-[hsl(211_81%_36%)] data-highlighted:text-white data-highlighted:outline-hidden"
                data-asset-id={asset.sys.id}
                key={asset.sys.id}
                onClick={() => setAssetID(asset.sys.id)}
              >
                {asset.fields.name}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
