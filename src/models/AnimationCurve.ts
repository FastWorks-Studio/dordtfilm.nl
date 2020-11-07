import * as Utility from '../utility/module';

enum AnimationCurveType {
    linear,
    ease,
    easeOut,
    easeIn,
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

    static get easeOut(): AnimationCurve {
        return new AnimationCurve(AnimationCurveType.easeOut);
    }

    static spring(args?: { damping: number }): AnimationCurve {
        return new AnimationCurve(AnimationCurveType.custom, function(x: number) { 
            const a = 0.15;
            const w = (1 - Utility.unwrap({ optional: args?.damping, fallback: 0.8 })) * 20;
            return -(Math.pow(Math.E, (-x / a)) * Math.cos(x * w)) + 1;
        });
    }

    static custom(formula: Formula): AnimationCurve {
        return new AnimationCurve(AnimationCurveType.custom, formula)
    }

    public value(at: number): number {
        switch (this.type) {
            case AnimationCurveType.linear:
                return at;
            case AnimationCurveType.ease:
                return Math.sin((at * Math.PI) - Math.PI * 0.5) * 0.5 + 0.5;
            case AnimationCurveType.easeIn:
                return -Math.cos(at * Math.PI * 0.5) + 1
            case AnimationCurveType.easeOut:
                return Math.sin((at * Math.PI * 0.5));
            case AnimationCurveType.custom:
                console.assert(this.formula, 'formula should be set when AnimationCurveType is .custom')
                if (this.formula === undefined || this.formula === null) { return at; }
                return this.formula(at);
            default:
                console.log(`AnimationCurveType ${this.type} not implemented`);
                return at;
        }
    }
}

export default AnimationCurve