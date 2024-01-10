import { ipcMain } from "electron";
import { Notification } from "electron/main";
import DiscordRPC from "discord-rpc";

const clientId = '1015856802748969061';
const RPC = new DiscordRPC.Client({ transport: 'ipc' });


var endTime = Date.now()+3600000;
DiscordRPC.register(clientId);

var currentActivity: DiscordRPC.Presence | null = null;

async function setRPCActivity(){
    console.log("starting rpc");
    if (!RPC || !currentActivity) return;
    RPC.setActivity(currentActivity);
}

RPC.on('ready', async () => {
    console.log("setting activity");
    setRPCActivity();

    const interval = setInterval(() => {
        setRPCActivity();
    }, 15000);

    return () => clearInterval(interval)
})

RPC.login({ clientId }).catch(err => console.error(err)); 


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
    });

    ipcMain.handle("start-rpc", (event, args) => {
        currentActivity = {
            details: 'In a focus session!',
            state: 'Session over in:',
            startTimestamp: Date.now(),
            endTimestamp: Date.now() + args.session.length,
            largeImageKey: 'session_img',
            largeImageText: 'I\'m not available right now, check back later.',
            smallImageKey: 'download-2',
            smallImageText: 'I will be back!',
            instance: false,
        };

        setRPCActivity();
    });

    ipcMain.handle("end-rpc", () => RPC.clearActivity());
};

export { setupIpcController };