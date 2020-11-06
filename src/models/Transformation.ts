export enum TransformationType {
    translation,
    opacity,
    scale,
    rotation
}

export interface Transformation<Value> {
    type: TransformationType
    value: Value
 }

export class Translation implements Transformation<{x: number, y: number}> {

    type: TransformationType = TransformationType.translation;
    get value() { return { x: this.x, y: this.y } }

    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static x(value: number): Translation {
        return new Translation(value, 0);
    }

    static y(value: number): Translation {
        return new Translation(0, value);
    }

    static xy(x: number, y: number): Translation {
        return new Translation(x, y);
    }
}

export class Scale implements Transformation<number> {

    type: TransformationType = TransformationType.scale;

    value: number;

    constructor(value: number) {
        this.value = value;
    }

    static amount(amount: number): Scale {
        return new Scale(amount);
    }
}

export class Rotation implements Transformation<number> {

    type: TransformationType = TransformationType.rotation;

    value: number;

    constructor(value: number) {
        this.value = value
    }

    static amount(value: number): Rotation {
        return new Rotation(value);
    }
}

export class Opacity implements Transformation<number> {

    type: TransformationType = TransformationType.opacity;

    value: number;

    constructor(value: number) {
        this.value = value
    }

    static amount(value: number): Opacity {
        return new Opacity(value);
    }
}