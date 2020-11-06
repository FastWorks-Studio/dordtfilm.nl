import Transform from './Transform';
import AnimationCurve from './AnimationCurve';

export interface Animation {
    from: Transform
    to: Transform
    duration: number
    curve?: AnimationCurve
}
