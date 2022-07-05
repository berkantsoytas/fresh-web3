// deno-lint-ignore-file no-explicit-any

// bkz. https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul

export {};

declare global {
  interface Window {
    ethereum: any;
  }
}
