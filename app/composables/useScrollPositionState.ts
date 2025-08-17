export const useScrollPositionState = () => (
  useState('scrollPosition', () => ({
    top: 0,
    left: 0,
  }))
);