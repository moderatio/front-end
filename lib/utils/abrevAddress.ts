export const abrevAddress = (address: string) => {
  return `${String(address).slice(0, 3)}...${String(address).slice(-3)}`;
};
