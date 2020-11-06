import { Transformation, Translation, Scale, Rotation } from './Transformation';

export class Transform {
    public transformations: Transformation[] = []

    static get identity() {
        return new Transform();
    }

    public translated(by: { x?: number, y?: number }) {
        this.transformations.push(Translation.xy(by.x || 0, by.y || 0));
    }

    public scaled(by: { amount: number }) {
        this.transformations.push(Scale.amount(by.amount));
    }

    public rotated(by: { amount: number }) {
        this.transformations.push(Rotation.amount(by.amount));
    }
}

export default Transform