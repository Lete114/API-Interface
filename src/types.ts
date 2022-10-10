export type KV = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export type FN = {
  // eslint-disable-next-line no-unused-vars
  [key: string]: (params: KV) => Promise<KV>
}
