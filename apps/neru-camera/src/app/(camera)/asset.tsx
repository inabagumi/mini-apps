"use client";

import type { Entry } from "contentful";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

import type { OverlayEntrySkeleton } from "#/lib/contentful";

export type OverlayEntry = Entry<
  OverlayEntrySkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS"
>;

interface AssetValues {
  current?: OverlayEntry;
  setAsset?: Dispatch<SetStateAction<OverlayEntry>>;
  values: OverlayEntry[];
}

const AssetContext = createContext<AssetValues>({
  values: [],
});

type SetAssetIDFn = (id: string) => void;
interface UseAsset {
  assets: OverlayEntry[];
  currentAsset: OverlayEntry;
  setAssetID: SetAssetIDFn;
}

export const useAsset = (): UseAsset => {
  const { current, setAsset, values } = useContext(AssetContext);

  const setAssetID = useCallback<SetAssetIDFn>(
    (assetID) => {
      if (typeof setAsset !== "function") {
        throw new TypeError("Asset could not be changed.");
      }

      const nextAsset = values.find((asset) => asset.sys.id === assetID);

      if (!nextAsset) {
        throw new TypeError("Asset matching ID does not exist.");
      }

      setAsset(nextAsset);
    },
    [setAsset, values]
  );

  if (!current) {
    throw new TypeError("Failed to initialize Asset.");
  }

  return {
    assets: values,
    currentAsset: current,
    setAssetID,
  };
};

interface AssetProviderProps {
  assets: OverlayEntry[];
  children: ReactNode;
}

export const AssetProvider = ({ assets, children }: AssetProviderProps) => {
  const [asset, setAsset] = useState(() => assets[0]);
  const value = useMemo(
    () => ({ current: asset, setAsset, values: assets }),
    [asset, assets]
  );

  return (
    <AssetContext.Provider value={value}>{children}</AssetContext.Provider>
  );
};
