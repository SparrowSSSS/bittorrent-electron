import { dialog } from "electron";

export const catchError = (error: any) => {
    error = error as Error;

    dialog.showErrorBox(error.name, error.message);
};
