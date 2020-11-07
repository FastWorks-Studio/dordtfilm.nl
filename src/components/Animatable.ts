export interface Animatable {

    prepareForAnimation(): void
    animateIn(args?: { delay?: number }): void
}