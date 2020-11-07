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
        this.startTime = Date.now() + ((animation.delay || 0) * 1000);
        this.previousUpdate = Date.now() + ((animation.delay || 0) * 1000);
        if (Utility.exists(animation.delay)) {
            this.renderState(0);
            setTimeout(this.renderNextFrame.bind(this), ((animation.delay || 0) * 1000))
        } else {
            this.renderNextFrame()
        }
    }

    private element: HTMLElement | null;
    private startProperties: Model.TransformProperties;
    private endProperties: Model.TransformProperties;
    private animation: Model.Animation;

    private previousUpdate: number
    private startTime: number

    private renderNextFrame() {
        const progress = (this.previousUpdate - this.startTime) / (this.animation.duration * 1000);
        this.previousUpdate = Date.now();
        this.renderState(progress);
        if (progress < 1) { 
            requestAnimationFrame(this.renderNextFrame.bind(this)); 
        } else {
            this.element = null;
        }
    }

    private renderState(progress: number) {
        this.renderOpacity(progress);
        this.renderTransform(progress);
        this.renderFilter(progress);
    }

    private renderOpacity(progress: number) {
        const value = this.interpolate({ 
            from: this.startProperties.opacity, 
            to: this.endProperties.opacity, 
            progress: progress, 
            fallback: 1 
        })
        if (Utility.isVoid(value) || this.element === null || this.element === undefined) { return; }
        this.element.style.opacity = value?.toFixed(4) || ``;
    }

    private renderFilter(progress: number) {
        const value = this.interpolate({ 
            from: this.startProperties.blur, 
            to: this.endProperties.blur, 
            progress: progress, 
            fallback: 0
        });
        if (this.element === null || this.element === undefined) { return; }
        if (value === undefined || value === null) { return; }
        this.element.style.filter = `blur(${value.toFixed(4)}vmin)`;
    }

    private renderTransform(progress: number) {
        if (this.element === null || this.element === undefined) { return; }
        const scale = this.getScale(progress);
        const rotation = this.getRotation(progress);
        const translation = this.getTranslation(progress);
        let translations: string[] = []
        if (scale !== null) { translations.push(`scale(${scale.toFixed(4)})`); }
        if (rotation !== null) { translations.push(`rotate(${rotation.toFixed(4)}deg)`); }
        if (translation !== null) { translations.push(`translate3d(${translation.x.toFixed(4)}px, ${translation.y.toFixed(4)}px, 0px)`); }
        const transform = translations.join(" ");
        this.element.style.transform = transform;
    }

    private getScale(progress: number): number | null {
        return this.interpolate({ from: this.startProperties.scale, to: this.endProperties.scale, progress: progress, fallback: 1 })
    }

    private getRotation(progress: number): number | null {
        return this.interpolate({ from: this.startProperties.rotation, to: this.endProperties.rotation, progress: progress, fallback: 0 })
    }

    private getTranslation(progress: number): { x: number, y: number } | null {
        const x = this.interpolate({ from: this.startProperties.translation?.x, to: this.endProperties.translation?.x, progress: progress, fallback: 0 })
        const y = this.interpolate({ from: this.startProperties.translation?.y, to: this.endProperties.translation?.y, progress: progress, fallback: 0 })
        if (x === null && y === null) { return null; }
        return { 
            x: Utility.unwrap<number>({ optional: x, fallback: 0 }),
            y: Utility.unwrap<number>({ optional: y, fallback: 0 })
        }
    }

    private interpolate(args: {from?: number, to?: number, progress: number, fallback?: number }): number | null {
        if (Utility.isVoid(args.from) && Utility.isVoid(args.to)) { return null; }
        const start = Utility.unwrap({ optional: args.from, fallback: Utility.unwrap({ optional: args.fallback, fallback: 0 }) })
        const end = Utility.unwrap({ optional: args.to, fallback: Utility.unwrap({ optional: args.fallback, fallback: 0 }) })
        const progress = this.animation.curve?.value(args.progress) || args.progress;
        const value = ((1 - progress) * start) + (progress * end);
        return value;
    }
}

export default Animator