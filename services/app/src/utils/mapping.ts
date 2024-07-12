
export class Mapping<A extends string | number | symbol, B, Default extends B | undefined = undefined> {
    private mapping: Partial<Record<A, B>>
    private defaultValue: Default

    constructor(mapping: Partial<Record<A, B>>, defaultValue: Default) {
        this.mapping = mapping
        this.defaultValue = defaultValue
    }
    
    public match(value?: A | null) {
        if (!value) return this.defaultValue as Default extends undefined ? B | undefined : B
        return this.mapping[value] || this.defaultValue as Default extends undefined ? B | undefined : B
    }
}

type MappingTuple<A extends string | number | symbol, B, Default extends B | undefined> = [
    Partial<Record<A, B>>,
    Default
];

export class MultiMapping<A extends string | number | symbol, T extends [any, any][]> {
    private mappings: { [K in keyof T]: Mapping<A, T[K], T[K] | undefined> };

    constructor(...configs: { [K in keyof T]: MappingTuple<A, T[K][0], T[K][1]> }) {
        this.mappings = configs.map(([mapping, defaultValue]) => new Mapping(mapping, defaultValue)) as { [K in keyof T]: Mapping<A, T[K][0], T[K][1]> };
    }

    public match(value?: A | null) {
        return this.mappings.map(mapping => mapping.match(value)) as { [K in keyof T]: T[K][1] extends undefined ? T[K][0] | undefined : T[K][0] };
    }
}