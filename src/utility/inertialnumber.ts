export class InertialNumber {
  
    public current: number = 0;
    public target: number = 0;
    public acceleration: number;
    public inertia: number;
    public velocity: number = 0;
    public onUpdate?: (value: number) => void;
    
    private timeout?: NodeJS.Timeout;
    private disableWhenSettledAtTarget: boolean = false;
    private isAutoUpdating: boolean = false;

    constructor(props?: { acceleration?: number, inertia?: number }) {
        this.acceleration = props?.acceleration || 1
        this.inertia = props?.inertia || 0.85
    }

    moveTo(props: { to: number, from: number, keepVelocity?: boolean, disableWhenSettledAtTarget?: boolean, selfUpdate?: boolean }) {
        this.target = props.to;
        this.current = props.from;
        if (props.keepVelocity !== false ) { this.velocity = 0; }
        this.disableWhenSettledAtTarget = (props.disableWhenSettledAtTarget !== false);
        if (props.selfUpdate !== false) { this.setAutoUpdates(true); }
    }

    update(deltaTime: number) {
        const delta = this.target - this.current;
        const preferredVelocity = delta * 10;
        const deltaVelocity = preferredVelocity - this.velocity;
        const acceleration = deltaVelocity * 10 * this.acceleration;
        this.velocity += acceleration * deltaTime
        this.current += this.velocity * deltaTime
        if (this.onUpdate) { this.onUpdate(this.current); }
        this.velocity *= this.inertia;
        if (this.disableWhenSettledAtTarget && this.isSettled()) { 
            this.setAutoUpdates(false);
        }
    }

    setAutoUpdates(auto: boolean) {
        this.isAutoUpdating = auto
        if (auto) {
            var intervalMs = 1000 / 60;
            const context = this;
            if (this.timeout !== undefined) { clearInterval(this.timeout); }
            context.timeout = setInterval(function() { 
                context.update(intervalMs / 1000)
            }, intervalMs);
        } else {
            if (this.timeout === undefined) { return; }
            clearInterval(this.timeout);
        }
    }

    public getIsAutoUpdating(): boolean {
        return this.isAutoUpdating
    }

    stop() {
        this.setAutoUpdates(false);
        this.disableWhenSettledAtTarget = false
        this.velocity = 0;
    }

    public isSettled(): boolean {
        const delta = Math.abs(this.current - this.target).toFixed(0);
        const velocity = Math.abs(this.velocity).toFixed(0);
        return delta === '0' && velocity === '0';
    }
}

export default InertialNumber