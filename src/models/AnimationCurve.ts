import { assert } from "console";

enum AnimationCurveType {
    linear,
    ease,
    custom
}

type Formula = (at: number) => number

export class AnimationCurve {
    
    private type: AnimationCurveType;
    private formula?: Formula;

    private constructor(type: AnimationCurveType, formula?: Formula) {
        this.type = type;
        this.formula = formula;
    }

    static get linear(): AnimationCurve {
        return new AnimationCurve(AnimationCurveType.linear);
    }

    static get ease(): AnimationCurve {
        return new AnimationCurve(AnimationCurveType.ease);
    }

    static custom(formula: Formula): AnimationCurve {
        return new AnimationCurve(AnimationCurveType.custom, formula)
    }

    public value(at: number): number {
        switch (this.type) {
            case AnimationCurveType.linear:
                return at;
            case AnimationCurveType.linear:
                console.log(`ease animation not implemented yet`);
                return at;
            case AnimationCurveType.custom:
                assert(this.formula, 'formula should be set when AnimationCurveType is .custom')
                if (this.formula === undefined || this.formula === null) { return at; }
                return this.formula(at);
            default:
                console.log(`AnimationCurveType ${this.type} not implemented`);
                return at;
        }
    }
}

export default AnimationCurve