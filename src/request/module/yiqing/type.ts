
export interface ShowAddSwitch {
    nowConfirm: boolean;
    importedCase: boolean;
    noInfect: boolean;
    localConfirm: boolean;
    localinfeciton: boolean;
    all: boolean;
    confirm: boolean;
    suspect: boolean;
    dead: boolean;
    heal: boolean;
    nowSevere: boolean;
}

export interface Today {
    confirm: number;
    isUpdated: boolean;
}

export interface Total {
    adcode: string;
    confirm: number;
    showHeal: boolean;
    highRiskAreaNum: number;
    mtime: string;
    showRate: boolean;
    wzz: number;
    mediumRiskAreaNum: number;
    provinceLocalConfirm: number;
    continueDayZeroLocalConfirmAdd: number;
    continueDayZeroLocalConfirm: number;
    nowConfirm: number;
    dead: number;
    heal: number;
}

export interface Today {
    confirm: number;
    confirmCuts: number;
    isUpdated: boolean;
    wzz_add: string;
    local_confirm_add: number;
}

export interface Total {
    nowConfirm: number;
    showHeal: boolean;
    provinceLocalConfirm: number;
    mediumRiskAreaNum: number;
    highRiskAreaNum: number;
    continueDayZeroLocalConfirmAdd: number;
    continueDayZeroLocalConfirm: number;
    dead: number;
    heal: number;
    adcode: string;
    confirm: number;
    wzz: number;
    showRate: boolean;
    mtime: string;
}

export interface Children {
    name: string;
    adcode: string;
    date: string;
    today: Today;
    total: Total;
}

export interface Today {
    abroad_confirm_add: number;
    dead_add: number;
    confirm: number;
    confirmCuts: number;
    isUpdated: boolean;
    tip: string;
    wzz_add: string;
    local_confirm_add: number;
}

export interface Total {
    confirm: number;
    continueDayZeroConfirmAdd: number;
    nowConfirm: number;
    showRate: boolean;
    showHeal: boolean;
    provinceLocalConfirm: number;
    highRiskAreaNum: number;
    mtime: string;
    heal: number;
    wzz: number;
    mediumRiskAreaNum: number;
    continueDayZeroConfirm: number;
    adcode: string;
    dead: number;
    continueDayZeroLocalConfirmAdd: number;
}

export interface Children {
    children: Children[];
    name: string;
    adcode: string;
    date: string;
    today: Today;
    total: Total;
}

export interface AreaTree {
    name: string;
    today: Today;
    total: Total;
    children: Children[];
}

export interface ChinaTotal {
    confirm: number;
    nowSevere: number;
    noInfectH5: number;
    localWzzAdd: number;
    localConfirm: number;
    heal: number;
    suspect: number;
    noInfect: number;
    showLocalConfirm: number;
    showlocalinfeciton: number;
    mtime: string;
    dead: number;
    importedCase: number;
    local_acc_confirm: number;
    confirmAdd: number;
    nowLocalWzz: number;
    localConfirmAdd: number;
    localConfirmH5: number;
    deadAdd: number;
    mediumRiskAreaNum: number;
    highRiskAreaNum: number;
    nowConfirm: number;
    mRiskTime: string;
}

export interface ChinaAdd {
    heal: number;
    suspect: number;
    importedCase: number;
    noInfect: number;
    noInfectH5: number;
    localConfirmH5: number;
    confirm: number;
    dead: number;
    nowConfirm: number;
    nowSevere: number;
    localConfirm: number;
}

export interface Diseaseh5Shelf {
    showAddSwitch: ShowAddSwitch;
    areaTree: AreaTree[];
    lastUpdateTime: string;
    chinaTotal: ChinaTotal;
    chinaAdd: ChinaAdd;
    isShowAdd: boolean;
}

export interface StatisGradeCityDetail {
    province: string;
    confirmAdd: number;
    sdate: string;
    mtime: string;
    city: string;
    nowConfirm: number;
    confirm: number;
    dead: number;
    heal: number;
    grade: string;
    date: string;
    syear: number;
    wzz_add: string;
}

export interface Data {
    diseaseh5Shelf: Diseaseh5Shelf;
    statisGradeCityDetail: StatisGradeCityDetail[];
}

export interface RootObject {
    ret: number;
    info: string;
    data: Data;
}