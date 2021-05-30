export interface CmdOptions {
  method?: string,
  args ?: {
    [k: string] : boolean | number | string | undefined
  }
}
