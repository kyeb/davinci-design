// Needed for Parcel image resolution to typecheck
declare module '*.jpg' {
    const value: string;
    export default value;
}
declare module '*.jpeg' {
    const value: string;
    export default value;
}
declare module '*.png' {
    const value: string;
    export default value;
}
declare module '*.gif' {
    const value: string;
    export default value;
}
declare module '*.svg' {
    const value: string;
    export default value;
}

// Needed for Parcel Sass resolution to typecheck
declare module '*.scss' {
    const body: string;
}
