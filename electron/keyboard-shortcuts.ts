import { Menu, MenuItemConstructorOptions } from 'electron';

const template: MenuItemConstructorOptions[] = [
    {
        label: 'File',
        submenu: [
            {
                role: 'quit',
                label: '&Quit'
            },
            {
                role: "close",
                label: "&Close Window"
            }
        ]
    }, {
        label: 'Edit',
        submenu: [
            {
                role: 'undo',
                label: '&Undo'
            }, {
                role: 'redo',
                label: '&Redo'
            }, {
                type: 'separator'
            }, {
                role: 'cut',
                label: 'Cu&t'
            }, {
                role: 'copy',
                label: '&Copy'
            }, {
                role: 'paste',
                label: '&Paste'
            }, {
                role: "selectAll",
                label: "Select &All"
            }
        ]
    }, {
        label: "Help",
        submenu: [
            {
                role: 'about',
                label: '&About'
            }, {
                label: 'Learn About &Pomodoro',
            }
        ]
    }
];

const mainMenu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(mainMenu);

export { mainMenu };