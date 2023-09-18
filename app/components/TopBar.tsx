import * as React from "react";

import { cx } from "~/utils";

import { TeledipityLogo } from "~/components";

export interface TopBarProps {
  children?: React.ReactNode;
  /**
   * Custom CSS classes visually expand this component
   */
  className?: string;
  /**
   * Should display the logo's condensed version, without the words?
   */
  condensedLogo?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  children,
  className = "",
  condensedLogo = false,
}) => {
  return (
    <div className="border-b bg-iceage border-b-softcarbon">
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
