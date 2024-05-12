# Selector Brainstorming

Some notes about the date selector component (e.g., possible ways to implement
it).

## Implementation

- Parent creates date state variale initialized to today
- Parent passes date state variable to date selector component
- Date selector component unpackages into two selectors: month and year
  - Single component for year and month selection; can use left and right arrows
    to change month and year
    - Should wrap back to January when going past December
  - Day selector component should only display as many days as there are in the
    selected month
    - Optional: day selector should wrap around to next month
-

## Problems

- Often moves through dates by twos. Can users of the library adjust spacing?
