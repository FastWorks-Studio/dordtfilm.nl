export abstract class Transformation { }

export class Translation implements Transformation {
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

export class Scale implements Transformation {
    amount: number;

    constructor(amount: number) {
        this.amount = amount
    }

    static amount(amount: number): Scale {
        return new Scale(amount);
    }
}

export class Rotation implements Transformation {
    amount: number;

    constructor(amount: number) {
        this.amount = amount
    }

    static amount(amount: number): Rotation {
        return new Rotation(amount);
    }
}