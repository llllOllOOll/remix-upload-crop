import * as React from "react";

import { cx } from "~/utils";

export interface TeledipityLogoProps {
  /**
   * Custom CSS classes visually expand this component
   */
  className?: string;
  /**
   * Should display the condensed version, without the words?
   */
  condensed?: boolean;
}

export const TeledipityLogo: React.FC<TeledipityLogoProps> = ({
  className = "",
  condensed = false,
}) => {
  return (
    <div className={className}>
      <img
        src={`/svg/logo${condensed ? "-condensed" : ""}.svg`}
        alt="Teledipity"
        className={cx(condensed && "w-9 h-9")}
      />
    </div>
  );
};

TeledipityLogo.displayName = "TeledipityLogo";
