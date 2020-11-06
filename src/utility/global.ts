export function exists(object: any): boolean {
    if (object === null || object === undefined) {
        return false;
    } else {
        return true;
    }
}

export function isVoid(object: any): boolean {
    return exists(object) === false;
}

export function unwrap<Type>(args: { optional?: Type | null, fallback: Type }): Type {
    if (isVoid(args.optional)) {
        return args.fallback;
    } else {
        return args.optional as Type
    }
}

export function when<Type>(args: { object: any, is: Type, do: (object: Type) => void }): void {
    const castObject = args.object as Type;
    if (castObject === null || castObject === undefined) { return; }
    args.do(castObject);
}