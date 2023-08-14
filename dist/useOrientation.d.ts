export interface IOrientationState {
    angle: number;
    type: string;
}
export declare const defaultState: IOrientationState;
export declare function useOrientation(initialState?: IOrientationState): IOrientationState;
