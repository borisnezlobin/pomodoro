import { ipcMain } from "electron";
import { Notification } from "electron/main";

type NotificationCreateRequest = {
    title: string,
    body?: string,
}

function setupIpcController(){
    // idk
    ipcMain.handle('show-notification', (event, args: NotificationCreateRequest) => {
        // do
        // I don't get it
        // this code gets reached, but it doesn't actually SHOW the notification... how is that?
        // like... this code gets here, and even if I replace "args" with "{ title: 'abc' }", it'll still not show a notification
        // arguably I don't have wifi but this should be local notifications?
        // TODO I guess
        new Notification(args).show();
    })
};

export { setupIpcController };