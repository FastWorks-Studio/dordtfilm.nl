import * as Model from '../../models/module';

export class Animator {

    public static animate(element: HTMLElement, animation: Animation) {
        console.log(`would animate ${element} with ${JSON.stringify(animation)}`);
    }
}

export default Animator