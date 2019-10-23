const onMissingThrow = <T>(value: T, name: string): T => {
  if (value == null || value === undefined) {
    throw Error(`Missing configuration property: ${name}`);
  }
  return value;
};

export class Config {
  public static from(raw: any): Config {
    return new Config(
      onMissingThrow(raw.port, 'server.port')
    );
  }

  constructor(readonly port: number) {}
}
