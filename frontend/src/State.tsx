import {useState} from 'react'

import {
    NewState,
    ClickOpenWorkspace,
    ViewWorkspaceChild,
    ViewWorkspaceParent,
    OpenWorkspace,
    ViewService,
    OpenService,
    CloseService,
    ReorderResources,
    ExpandResource,
    OpenResourceSetting,
    CloseResourceSetting,
    ChangeResourceSetting,
    ChangeResourceName,
    OpenContextMenuResource,
    HandleContextMenuResource,
    CloseContextMenuResource,

    OpenContextMenuService,
    HandleContextMenuService,
    HandleActivateProvider,
    HandleActivateCredentials,
    HandleDeactivateCredentials,
    HandleDeleteCredentials,
    CloseContextMenuService,


    OpenContextMenuAddResource,
    HandleContextMenuAddResource,
    CloseContextMenuAddResource,

    OpenContextMenuAddService,
    HandleContextMenuAddService,
    CloseContextMenuAddService,

    OpenMenuService,

    CloseDialog,
    ChangeCredentialValue,
    AddService,
    AddFolder,

    ActivateService,
    DeactivateService,
    RemoveService,

    LoadStatus,
    SaveFiles,

    NavigateChild,
    NavigateParent,

    ImportService,
    ExportService,
    OpenDropdown,
    CloseDropdown,
    HandleDropdown,

    OpenSettings,

    OpenDropdownTheme,
    HandleDropdownTheme,
    OpenDropdownSize,
    HandleDropdownSize,

    // ViewErrorLogs,
    // CloseErrorLogs,

} from '../wailsjs/go/main/App'

export interface IState {
    page: string
    workspace: string
    folder: string
    files: string[]
    subfolders: string[]
    services: {
        file: string
        title: string
        subtitle: string
        iconPath: string
        iconColor: string
        configSaved: string
        configCurrent: string
        status: {
            status: string
            message: string
            url: string
        }
        resources: {
            title: string
            subtitle: string
            iconPath: string
            iconColor: string
            expanded: boolean
            settings: {
                title: string
                type: string
                value: string
                options: string[]
            }[]
        }[]
    }[]
    service: {
        file: string
        title: string
        subtitle: string
        iconPath: string
        iconColor: string
        configSaved: string
        configCurrent: string
        status: {
            status: string
            message: string
            url: string
        }
        resources: {
            index: number
            title: string
            subtitle: string
            iconPath: string
            iconColor: string
            expanded: boolean
            settings: {
                title: string
                type: string
                value: string
                options: string[]
            }[]
        }[]
    }
    resource: {
        index: number
        title: string
        subtitle: string
        iconPath: string
        iconColor: string
        expanded: boolean
        settings: {
            title: string
            type: string
            value: string
            options: string[]
        }[]
    }
    setting: {
        title: string
        type: string
        value: string
        options: string[]
    }
    dialog: string
    contextMenuType: string
    contextMenu: string
    contextMenuOptions: string[]
    contextMenuX: number
    contextMenuY: number

    presets: {
        resources: {
            title: string
            iconPath: string
            iconColor: string
            settings: {
                title: string
                type: string
                options: string[]
            }[]
        }[]
        providers: {
            title: string
            iconPath: string
            iconColor: string
            iconViewBox: string
            credentials: {
                label: string
                type: string
                env: string
                value: string
            }[]
        }[]
        icons: {
            title: string
            iconPath: string
            iconColor: string
        }[]
    }
    action: string
    provider: string
    navigation: {
        folder: string
        folders: string[]
        files: string[]
    }
    size: string
    font: number
    theme: string
    error: boolean
}

export class State {

    public constructor(
        public state: IState, 
        public setState: React.Dispatch<React.SetStateAction<IState>>
    ) { }

    public TestState() {
        NewState().then((result: string) => {
            ClickOpenWorkspace(result).then((result: string) => {
                this.setState(JSON.parse(result))
            })
        })
    }

    public NewState() {
        NewState().then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public ClickOpenWorkspace() {
        ClickOpenWorkspace(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public ViewWorkspaceChild(child: string) {
        ViewWorkspaceChild(JSON.stringify(this.state), child).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public ViewWorkspaceParent() {
        ViewWorkspaceParent(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public OpenWorkspace() {
        OpenWorkspace(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public ViewService(service: string) {
        ViewService(JSON.stringify(this.state), service).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public OpenService() {
        OpenService(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public CloseService() {
        CloseService(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public ReorderResources(resources: any) {
        ReorderResources(JSON.stringify(this.state), JSON.stringify(resources)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public ExpandResource(resource: number) {
        ExpandResource(JSON.stringify(this.state), resource).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public ChangeResourceSetting(resource: number, setting: string, value: string) {
        ChangeResourceSetting(JSON.stringify(this.state), resource, setting, value).then((result: string) => {
            this.setState(JSON.parse(result))
        }
    )}
    public OpenResourceSetting(resource: number, setting: string) {
        OpenResourceSetting(JSON.stringify(this.state), resource, setting).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public CloseResourceSetting() {
        CloseResourceSetting(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    public ChangeResourceName(resource: number, name: string) {
        ChangeResourceName(JSON.stringify(this.state), resource, name).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    public OpenContextMenuAddService(x: number, y: number) {
        OpenContextMenuAddService(JSON.stringify(this.state), x, y).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public HandleContextMenuAddService(option: string) {
        HandleContextMenuAddService(JSON.stringify(this.state), option).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public CloseContextMenuAddService() {
        CloseContextMenuAddService(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    public OpenContextMenuService(service: string, x: number, y: number) {
        OpenContextMenuService(JSON.stringify(this.state), service, x, y).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }


    public LoadStatus() {

        LoadStatus(JSON.stringify(this.state)).then((result: string) => {
            let r: IState = JSON.parse(result)
            let old_status = JSON.stringify(this.state.services.map(service => service.status.status).sort())
            let new_status = JSON.stringify(r.services.map(service => service.status.status).sort())
            if (old_status != new_status) {
                this.setState(r)
            }
        })
    }


    public HandleContextMenuService(service: string, option: string) {
        HandleContextMenuService(JSON.stringify(this.state), service, option).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public HandleActivateProvider(provider: string) {
        HandleActivateProvider(JSON.stringify(this.state), provider).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public HandleActivateCredentials() {
        HandleActivateCredentials(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
            ActivateService(result)
        })
    }
    public HandleDeactivateCredentials() {
        HandleDeactivateCredentials(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
            DeactivateService(result)
        })
    }
    public HandleDeleteCredentials() {
        HandleDeleteCredentials(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
            RemoveService(result)
        })
    }

    public CloseContextMenuService() {
        CloseContextMenuService(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    public OpenContextMenuAddResource(x: number, y: number) {
        OpenContextMenuAddResource(JSON.stringify(this.state), x, y).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public HandleContextMenuAddResource(option: string) {
        HandleContextMenuAddResource(JSON.stringify(this.state), option).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public CloseContextMenuAddResource() {
        CloseContextMenuAddResource(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    public OpenContextMenuResource(resource: string, x: number, y: number) {
        OpenContextMenuResource(JSON.stringify(this.state), resource, x, y).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public HandleContextMenuResource(resource: string, option: string) {
        HandleContextMenuResource(JSON.stringify(this.state), resource, option).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public CloseContextMenuResource() {
        CloseContextMenuResource(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    public OpenMenuService() {
        OpenMenuService(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    public CloseDialog() {
        CloseDialog(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    public ChangeCredentialValue(provider: string, credential: string, value: string) {
        ChangeCredentialValue(JSON.stringify(this.state), provider, credential, value).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    public AddService(name: string) {
        AddService(JSON.stringify(this.state), name).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public AddFolder(name: string) {
        AddFolder(JSON.stringify(this.state), name).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    public DeactivateService() {
        DeactivateService(JSON.stringify(this.state))
    }

    public SaveFiles() {
        SaveFiles(JSON.stringify(this.state)).then((result: string) => {
            // let r: IState = JSON.parse(result)
            // if (this.state.services != r.services) {
            //     console.log("updating")
            //     this.setState(r)
            // }
        })
    }

    public NavigateChild(child: string) {
        NavigateChild(JSON.stringify(this.state), child).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public NavigateParent() {
        NavigateParent(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    public ImportService(file: string) {
        ImportService(JSON.stringify(this.state), file).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public ExportService(file: string) {
        ExportService(JSON.stringify(this.state), file).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    public OpenDropdown(resource: number, setting: string) {
        OpenDropdown(JSON.stringify(this.state), resource, setting).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    public CloseDropdown() {
        CloseDropdown(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    public HandleDropdown(option: string) {
        HandleDropdown(JSON.stringify(this.state), option).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    public OpenSettings() {
        OpenSettings(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public OpenDropdownTheme() {
        OpenDropdownTheme(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public HandleDropdownTheme(option: string) {
        HandleDropdownTheme(JSON.stringify(this.state), option).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public OpenDropdownSize() {
        OpenDropdownSize(JSON.stringify(this.state)).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }
    public HandleDropdownSize(option: string) {
        HandleDropdownSize(JSON.stringify(this.state), option).then((result: string) => {
            this.setState(JSON.parse(result))
        })
    }

    // public ViewErrorLogs() {
    //     ViewErrorLogs(JSON.stringify(this.state)).then((result: string) => {
    //         this.setState(JSON.parse(result))
    //     })
    // }
    // public CloseErrorLogs() {
    //     CloseErrorLogs(JSON.stringify(this.state)).then((result: string) => {
    //         this.setState(JSON.parse(result))
    //     })
    // }

}
export default State
