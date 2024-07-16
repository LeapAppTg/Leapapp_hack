import { classBuilder } from "../classes";
import styles from './styles.module.css';

export enum TextSize {
    /**
     *@size 48px
    */
    XXXLarge = 'x_x_x_large',
    /**
     *@size 40px
    */
    XXLarge = 'x_x_large',
    /**
     *@size 32px
    */
    ExtraLarge = 'extra_large',
    /**
     *@size 24px
    */
    Large = 'large',
    /**
     *@size 20px
    */
    Medium = 'medium',
    /**
     *@size 18px
    */
    Small = 'small',
    /**
     *@size 16px
    */
    XSmall = 'x_small',
    /**
     *@size 14px
    */
    XXSmall = 'x_x_small',
    /**
     *@size 12px
    */
    XXXSmall = 'x_x_x_small',
}

export enum TextColor {
    /**
     *@color color-main-white
    */
    MainWhite = 'color_main_white',
    /**
     *@color color-grey-400
    */
    Grey400 = 'color_grey_400',
    /**
     *@color color-grey-500
    */
    Grey500 = 'color_grey_500',
    /**
     *@color color-purple-400
    */
    Purple400 = 'color_purple_400',
    /**
     *@color color-main-bg
    */
    MainBg = 'color_main_bg',
}

/**@default weight 400 */
export enum TextWeight {
    /**@weight 500*/
    Medium = 'medium_weight',
    /**@weight 600*/
    SemiBold = 'semi_bold_weight',
    /**@weight 700*/
    Bold = 'bold_weight'
}

/**@default line-height unset */
export enum TextLineHeight {
    /**@line-height 160% */
    ExtraLarge = 'extra_large_line_height',
    /**@line-height 150% */
    Large = 'large_line_height',
    /**@line-height 140% */
    Big = 'big_line_height',
    /**@line-height 120% */
    Medium = 'medium_line_height',
    /**@line-height 110% */
    MediumSmall = 'medium_small_line_height',
}

/**@default text-align center */
export enum TextAlign {
    /**@text-align left */
    Left = 'text_align_left'
}

/**@default text-transform none */
export enum TextTransform {
    /**@text-transform uppercase */
    Uppercase = 'uppercase',
    /**@text-transform uppercase */
    Lowercase = 'lowercase'
}

type TextStyleBuilderProps = {
    size?: TextSize,
    color?: TextColor,
    weight?: TextWeight,
    lineHeight?: TextLineHeight,
    textAlign?: TextAlign,
    /** @width 100% */
    fillFullWidth?: boolean,
    textTransfrom?: TextTransform,
    cropText?: boolean
}

export class TextStyleBuilder implements TextStyleBuilderProps {
    color?: TextColor | undefined;
    size?: TextSize | undefined;
    lineHeight?: TextLineHeight | undefined;
    weight?: TextWeight | undefined;
    textAlign?: TextAlign | undefined;
    fillFullWidth?: boolean | undefined;
    textTransfrom?: TextTransform | undefined;
    cropText?: boolean | undefined;

    constructor(params: TextStyleBuilderProps) {
        Object.assign(this, params)
    }

    public update(params: TextStyleBuilderProps) {
        const { ...oldProps } = this;
        Object.assign(
            oldProps,
            Object.fromEntries(
                Object
                .entries(params)
                .filter(([_, val]) => !!val)
            )
        )
        return new TextStyleBuilder(oldProps)
    }
    
    public get className () {
        return classBuilder(
            styles,
            [this.color, this.size, this.lineHeight, this.weight, this.textAlign, { fill_full_width: this.fillFullWidth }, this.textTransfrom, { crop_text: this.cropText }]
        )
    }
}

export const TextXXXSRegularGrey400 = new TextStyleBuilder({ size: TextSize.XXXSmall, color: TextColor.Grey400, lineHeight: TextLineHeight.MediumSmall })
export const TextSRegular = new TextStyleBuilder({ size: TextSize.Small, color: TextColor.MainWhite, lineHeight: TextLineHeight.Big })
export const TextSMedium = TextSRegular.update({ weight: TextWeight.Medium })
export const TextSSemiBold = TextSRegular.update({ weight: TextWeight.SemiBold })
export const TextXSRegular = new TextStyleBuilder({ size: TextSize.XSmall, color: TextColor.MainWhite, lineHeight: TextLineHeight.Big })
export const TextXSRegularGrey400 = TextXSRegular.update({ color: TextColor.Grey400 })
export const TextXSMedium = TextXSRegular.update({ weight: TextWeight.Medium })
export const TextXXSRegular = new TextStyleBuilder({ size: TextSize.XXSmall, color: TextColor.MainWhite, lineHeight: TextLineHeight.Big })
export const TextXXSRegularGrey400 = TextXXSRegular.update({ color: TextColor.Grey400 })
export const TextMSemiBold = new TextStyleBuilder({ size: TextSize.Medium, color: TextColor.MainWhite, weight: TextWeight.SemiBold, lineHeight: TextLineHeight.Big })
export const TextMMedium = TextMSemiBold.update({ weight: TextWeight.Medium })
export const TextLSemiBold = new TextStyleBuilder({ size: TextSize.Large, color: TextColor.MainWhite, weight: TextWeight.SemiBold })
export const TextXLSemiBold = new TextStyleBuilder({ size: TextSize.ExtraLarge, color: TextColor.MainWhite, weight: TextWeight.SemiBold, lineHeight: TextLineHeight.Big })
export const TextXLMedium = TextXLSemiBold.update({ weight: TextWeight.Medium })
export const TextXXLMedium = new TextStyleBuilder({ size: TextSize.XXLarge, color: TextColor.MainWhite, weight: TextWeight.Medium, lineHeight: TextLineHeight.ExtraLarge })
export const TextXXXLBold = new TextStyleBuilder({ size: TextSize.XXXLarge, color: TextColor.MainWhite, weight: TextWeight.Bold, lineHeight: TextLineHeight.ExtraLarge })