import { classBuilder } from "../classes";
import styles from './styles.module.css';

export enum FlexGap {
    /**
     *@gap 24px
    */
    Gap24 = 'gap_24',
    /**
     *@gap 20px
    */
    Gap20 = 'gap_20',
    /**
     *@gap 16px
    */
    Gap16 = 'gap_16',
    /**
     *@gap 12px
    */
    Gap12 = 'gap_12',
    /**
     *@gap 8px
    */
    Gap8 = 'gap_8',
    /**
     *@gap 4px
    */
    Gap4 = 'gap_4',
}

export enum FlexDirection {
    /**
     *@flex-direction column
    */
    Column = 'column',
    /**
     *@flex-direction row
    */
    Row = 'row'
}

export enum AlignItems {
    /**
     *@align-items flex-start
    */
    FlexStart = 'align_flex_start',
    /**
     *@align-items flex-end
    */
    FlexEnd = 'align_flex_end'
}

export enum JustifyContent {
    /**
     *@justify-content flex-start
    */
    FlexStart = 'justify_flex_start',
    /**
     *@justify-content flex-end
    */
    FlexEnd = 'justify_flex_end',
    /**
     *@justify-content space-between
    */
    SpaceBetween = 'justify_space_between'
}

type FlexGapBuilderProps = {
    gap?: FlexGap,
    direction?: FlexDirection,
    /** @width 100% */
    fillFullWidth?: boolean,
    alignItems?: AlignItems,
    justifyContent?: JustifyContent,
    hideOverflow?: boolean
}

export class FlexGapBuilder implements FlexGapBuilderProps {
    gap: FlexGap | undefined;
    direction: FlexDirection | undefined;
    fillFullWidth: boolean | undefined;
    alignItems: AlignItems| undefined;
    justifyContent: JustifyContent | undefined;
    hideOverflow: boolean | undefined;

    constructor(params: FlexGapBuilderProps) {
        Object.assign(this, params)
    }

    public update(params: FlexGapBuilderProps) {
        const { ...oldProps } = this;
        Object.assign(
            oldProps,
            Object.fromEntries(
                Object
                .entries(params)
                .filter(([_, val]) => !!val)
            )
        )
        return new FlexGapBuilder(oldProps)
    }
    
    public get className () {
        return classBuilder(
            styles,
            [this.direction, this.gap, { fill_full_width: this.fillFullWidth }, this.alignItems, this.justifyContent, { hide_overflow: this.hideOverflow }]
        )
    }
}

export const FlexGapRowFullWidth = new FlexGapBuilder({ direction: FlexDirection.Row, fillFullWidth: true })
export const FlexGapRowFullWidthJustifyFlexStart = FlexGapRowFullWidth.update({ justifyContent: JustifyContent.FlexStart })
export const FlexGapRowFullWidthJustifyFlexEnd = FlexGapRowFullWidth.update({ justifyContent: JustifyContent.FlexEnd })
export const FlexGapRowFullWidthJustifySpaceBetween = FlexGapRowFullWidth.update({ justifyContent: JustifyContent.SpaceBetween })

export const FlexGapRow4 = new FlexGapBuilder({ direction: FlexDirection.Row, gap: FlexGap.Gap4 })
export const FlexGapRow4FullWidth = FlexGapRow4.update({ fillFullWidth: true })
export const FlexGapRow8 = new FlexGapBuilder({ direction: FlexDirection.Row, gap: FlexGap.Gap8 })
export const FlexGapRow8FullWidthJustifySpaceBetween = FlexGapRow8.update({ fillFullWidth: true, justifyContent: JustifyContent.SpaceBetween })
export const FlexGapRow12 = new FlexGapBuilder({ direction: FlexDirection.Row, gap: FlexGap.Gap12 })
export const FlexGapRow12FullWidth = FlexGapRow12.update({ fillFullWidth: true })
export const FlexGapRow16 = new FlexGapBuilder({ direction: FlexDirection.Row, gap: FlexGap.Gap16 })
export const FlexGapRow16FullWidth = FlexGapRow16.update({ fillFullWidth: true })

export const FlexGapColumn = new FlexGapBuilder({ direction: FlexDirection.Column })
export const FlexGapColumn4 = new FlexGapBuilder({ direction: FlexDirection.Column, gap: FlexGap.Gap4 })
export const FlexGapColumn4AlignFlexStart = FlexGapColumn4.update({ alignItems: AlignItems.FlexStart })
export const FlexGapColumn8 = new FlexGapBuilder({ direction: FlexDirection.Column, gap: FlexGap.Gap8 })
export const FlexGapColumn8FullWidth = FlexGapColumn8.update({ fillFullWidth: true })
export const FlexGapColumn12 = new FlexGapBuilder({ direction: FlexDirection.Column, gap: FlexGap.Gap12 })
export const FlexGapColumn12FullWidth = FlexGapColumn12.update({ fillFullWidth: true })
export const FlexGapColumn16 = new FlexGapBuilder({ direction: FlexDirection.Column, gap: FlexGap.Gap16 })
export const FlexGapColumn16FullWidth = FlexGapColumn16.update({ fillFullWidth: true })
export const FlexGapColumn20 = new FlexGapBuilder({ direction: FlexDirection.Column, gap: FlexGap.Gap20 })
export const FlexGapColumn20FullWidth = FlexGapColumn20.update({ fillFullWidth: true })
export const FlexGapColumn24 = new FlexGapBuilder({ direction: FlexDirection.Column, gap: FlexGap.Gap24 })
export const FlexGapColumn24FullWidth = FlexGapColumn24.update({ fillFullWidth: true })