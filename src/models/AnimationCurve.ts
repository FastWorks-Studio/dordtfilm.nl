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

    static get spring(): AnimationCurve {
        return new AnimationCurve(AnimationCurveType.custom, function(x: number) { 
            const a = 0.15;
            const w = 19.4;
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
            case AnimationCurveType.linear:
                console.log(`ease animation not implemented yet`);
                return at;
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