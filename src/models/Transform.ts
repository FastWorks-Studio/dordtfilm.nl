import * as Models from './module';
import { TransformationType } from './Transformation';

export class Transform {
    public transformations: Models.Transformation<any>[] = []

    public static get identity() {
        return new Transform();
    }

    public translated(by: { x?: number, y?: number }): Transform {
        this.transformations.push(Models.Translation.xy(by.x || 0, by.y || 0));
        return this;
    }

    public scaled(by: { amount: number }): Transform {
        this.transformations.push(Models.Scale.amount(by.amount));
        return this;
    }

    public rotated(by: { amount: number }): Transform {
        this.transformations.push(Models.Rotation.amount(by.amount));
        return this;
    }

    public opacity(by: { amount: number }): Transform {
        this.transformations.push(Models.Opacity.amount(by.amount));
        return this;
    }

    public get properties(): Models.TransformProperties {
        var result: Models.TransformProperties = { };
        this.transformations.forEach(transformation => {
            switch (transformation.type) {
                case TransformationType.translation:
                    result.translation = transformation.value; break;
                case TransformationType.rotation:
                    result.rotation = transformation.value; break;
                case TransformationType.opacity:
                    result.opacity = transformation.value; break;
                case TransformationType.scale:
                    result.scale = transformation.value; break;
                default:
                    console.assert(false, `handling ${transformation.type} was not implemented`); break;
            }
        })
        return result;
    }
}

export default Transform