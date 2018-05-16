/*global React*/

export const FetchError = ({ message, onRetry }) => React.createElement(
  "div",
  null,
  React.createElement(
    "p",
    null,
    "Could not fetch todos. ",
    message
  ),
  React.createElement(
    "button",
    { onClick: onRetry },
    "Retry"
  )
);
//# sourceMappingURL=../fetchError.js.map