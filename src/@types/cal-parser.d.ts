interface ParseStringReturnValue {
  events: any;
}

declare module "cal-parser" {
  export function parseString(st: string, max?: number): ParseStringReturnValue;
}
