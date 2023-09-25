import * as React from "react";

import { cx } from "~/utils";

import { TeledipityLogo } from "~/components";

type WithChildren<T = {}> = T & { children?: React.ReactNode };

type TopBarProps = WithChildren<{
  className?: string;
  condensedLogo?: boolean;
}>;

export const TopBar = ({
  children,
  className = "",
  condensedLogo = false,
}: TopBarProps) => {
  return (
    <div className="border-b bg-zinc-100 border-b-zinc-300">
      <div
        className={cx(
          "flex  items-center w-full  max-w-400 px-6 py-2 container mx-auto",
          className
        )}
      >
        <TeledipityLogo
          className={cx(!condensedLogo && "w-[200px]")}
          condensed={condensedLogo}
        />
        {children}
      </div>
    </div>
  );
};

TopBar.displayName = "TopBar";
