import * as React from "react";

// Simple tooltip fallback using native title attribute for Tailwind-based UI
export const Tooltip = React.forwardRef(function Tooltip(props, ref) {
  const { children, disabled, content, ...rest } = props;

  if (disabled) return children;

  // If child is a valid React element, clone and add title
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      title: content,
      ref,
      ...rest,
    });
  }

  // Otherwise wrap in a span
  return (
    <span title={content} ref={ref} {...rest}>
      {children}
    </span>
  );
});
