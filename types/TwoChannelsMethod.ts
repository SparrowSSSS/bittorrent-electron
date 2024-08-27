export type TwoChannelsMethod<T> = (
    opt: T,
    callback?: () => void,
    errCallback?: () => void
) => void;
