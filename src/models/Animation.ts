import * as Models from './module';

export interface Animation {
    from?: Models.Transform
    to?: Models.Transform
    duration: number
    delay?: number
    curve?: Models.AnimationCurve
    completion?: () => void
}
