import { ipcMain } from "electron";
import { Notification } from "electron/main";
import DiscordRPC from "discord-rpc";

const clientId = "1194793667337142334"; // this fallback is for an app called "META Now(tm)"... idk
const RPC = new DiscordRPC.Client({ transport: 'ipc' });

var endTime = Date.now() + 3600000;
DiscordRPC.register(clientId);

var currentActivity: DiscordRPC.Presence | null = null;

async function setRPCActivity() {
    if (!RPC || !currentActivity) return;
    console.log(`polling rpc`);
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

const clearRPC = () => {
    currentActivity = null;
    RPC.clearActivity();
}

function setupIpcController() {
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
        if (args.session.type == "none") {
            clearRPC();
            return;
        }
        if (args.session.type === "focus") {
            currentActivity = {
                details: "In a focus session!",
                startTimestamp: Date.now(),
                endTimestamp: Date.now() + args.session.length,
                largeImageKey: 'bell_slash',
                largeImageText: "I\'m not available right now, check back later.",
                instance: false,
            };
        } else {
            currentActivity = {
                details: "On a break!",
                startTimestamp: Date.now(),
                endTimestamp: Date.now() + args.session.length,
                largeImageKey: 'hourglass',
                largeImageText: "I'm on a break!",
                instance: false,
            };
        }

        console.log("setting rpc for \'" + args.session.type + "\' session");

        setRPCActivity();
    });

    ipcMain.handle("end-rpc", clearRPC);
};

const cleanup = () => {
    clearRPC();
};

export { setupIpcController, cleanup };