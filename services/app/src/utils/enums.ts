import { FC } from "react"

export class EnumMatcher<EnumA extends string, EnumB extends string, DefaultValue extends EnumB | undefined> {
    private mapping: Partial<Record<EnumA, EnumB>>
    private defaultValue: DefaultValue
  
    constructor(mapping: Partial<Record<EnumA, EnumB>>, defaultValue: DefaultValue) {
      this.mapping = mapping
      this.defaultValue = defaultValue
    }

    match(value?: EnumA | null): DefaultValue extends undefined ? EnumB | undefined : EnumB {
        if (!value) {
            return this.defaultValue as unknown as DefaultValue extends undefined ? EnumB | undefined : EnumB
        }

        const result = this.mapping[value] || this.defaultValue;
        
        return result as DefaultValue extends undefined ? EnumB | undefined : EnumB
    }
}

export class EnumToFCMatcher<EnumA extends string, ComponentT extends FC = FC, DefaultValue extends ComponentT | undefined = undefined> {
    private mapping: Partial<Record<EnumA, ComponentT>>
    private defaultValue: DefaultValue
  
    constructor(mapping: Partial<Record<EnumA, ComponentT>>, defaultValue: DefaultValue) {
      this.mapping = mapping
      this.defaultValue = defaultValue
    }

    match(value?: EnumA): DefaultValue extends undefined ? ComponentT | undefined : ComponentT {
        if (!value) {
            return this.defaultValue as unknown as DefaultValue extends undefined ? ComponentT | undefined : ComponentT
        }

        const result = this.mapping[value] || this.defaultValue;
        
        return result as DefaultValue extends undefined ? ComponentT | undefined : ComponentT
    }
}