import * as Model from '../../models/module';
import * as Utility from '../../utility/module';

export class Animator {

    public static animate(element: HTMLElement | null | undefined, animation: Model.Animation) {
        if (element === null || element === undefined) { return; }
        new Animator(element, animation);
    }

    private constructor(element: HTMLElement, animation: Model.Animation) {
        this.element = element;
        this.animation = animation;
        this.startProperties = animation.from?.properties || Model.Transform.identity.properties;
        this.endProperties = animation.to?.properties || Model.Transform.identity.properties;
        if (Utility.exists(animation.delay)) {
            this.renderState();
            setInterval(this.renderNextFrame.bind(this), ((animation.delay || 0) * 1000))
        } else {
            this.renderState();
            this.renderNextFrame()
        }
    }

    private element: HTMLElement;
    private startProperties: Model.TransformProperties;
    private endProperties: Model.TransformProperties;
    private animation: Model.Animation;

    private elapsed: number = 0;
    private frameDuration: number = 0.02;

    private get progress() { return this.elapsed / this.animation.duration; }

    private renderNextFrame() {
        this.elapsed = Math.min(this.elapsed + this.frameDuration, this.animation.duration);
        this.renderState();
        if (this.elapsed < this.animation.duration) { requestAnimationFrame(this.renderNextFrame.bind(this)); }
    }

    private renderState() {
        this.renderOpacity();
        this.renderTransform();
    }

    private renderOpacity() {
        const value = this.interpolate({ from: this.startProperties.opacity, to: this.endProperties.opacity, fallback: 1 })
        if (Utility.isVoid(value)) { return; }
        this.element.style.opacity = value?.toFixed(2) || ``;
    }

    private renderTransform() {
        const scale = this.getScale();
        const rotation = this.getRotation();
        const translation = this.getTranslation();
        let translations: string[] = []
        if (scale !== null) { translations.push(`scale(${scale.toFixed(5)})`); }
        if (rotation !== null) { translations.push(`rotate(${rotation.toFixed(2)}deg)`); }
        if (translation !== null) { translations.push(`translate3d(${translation.x.toFixed(5)}px, ${translation.y.toFixed(5)}px, 0px)`); }
        const transform = translations.join(" ");
        this.element.style.transform = transform;
    }

    private getScale(): number | null {
        return this.interpolate({ from: this.startProperties.scale, to: this.endProperties.scale, fallback: 1 })
    }

    private getRotation(): number | null {
        return this.interpolate({ from: this.startProperties.rotation, to: this.endProperties.rotation, fallback: 0 })
    }

    private getTranslation(): { x: number, y: number } | null {
        const x = this.interpolate({ from: this.startProperties.translation?.x, to: this.endProperties.translation?.x, fallback: 0 })
        const y = this.interpolate({ from: this.startProperties.translation?.y, to: this.endProperties.translation?.y, fallback: 0 })
        if (x === null && y === null) { return null; }
        return { 
            x: Utility.unwrap<number>({ optional: x, fallback: 0 }),
            y: Utility.unwrap<number>({ optional: y, fallback: 0 })
        }
    }

    private interpolate(args: {from?: number, to?: number, fallback?: number }): number | null {
        if (Utility.isVoid(args.from) && Utility.isVoid(args.to)) { return null; }
        const start = Utility.unwrap({ optional: args.from, fallback: Utility.unwrap({ optional: args.fallback, fallback: 0 }) })
        const end = Utility.unwrap({ optional: args.to, fallback: Utility.unwrap({ optional: args.fallback, fallback: 0 }) })
        const progress = this.animation.curve?.value(this.progress) || this.progress;
        const value = ((1 - progress) * start) + (progress * end);
        return value;
    }
}

export default Animator