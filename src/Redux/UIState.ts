import { createStore } from "redux";

export class UIState {
    public isMenuOpen: boolean = false;
}

export enum UIActionType {
    ToggleMenu = "ToggleMenu"
}

export interface UIAction {
    type: UIActionType;
    payload?: any;
}

export function toggleMenu(): UIAction {
    return { type: UIActionType.ToggleMenu };
}
export function UIReducer(currentState = new UIState(), action: UIAction): UIState {
    const newState = { ...currentState };

    switch (action.type) {

        case UIActionType.ToggleMenu:
            newState.isMenuOpen = true;
            break;
    }

    return newState;
}

export const UIStore = createStore(UIReducer);
