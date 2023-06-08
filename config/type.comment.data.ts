// All properties on a domain are optional
export const domain = {
  name: "moderatio",
  version: "0.1",
  chainId: 80001,
} as const;

// The named list of all type definitions
export const types = {
  Comment: [
    { name: "caseId", type: "string" },
    { name: "content", type: "string" },
  ],
} as const;

// message exmaple for further usage:
export const value = {
  caseId: 1,
  content: "example",
  createdAt: new Date(),
  contents:
    "I'm saying that all arguments above are invalid because I said so.",
} as const;
