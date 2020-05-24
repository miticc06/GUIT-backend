
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class InputUpdateSetting {
    domain?: string;
}

export class Permission {
    _id?: string;
    code?: string;
    descriptions?: string;
}

export class Role {
    _id?: string;
    name?: string;
    code?: string;
    descriptions?: string;
}

export abstract class IQuery {
    abstract getSetting(): Setting | Promise<Setting>;
}

export abstract class IMutation {
    abstract updateSetting(input: InputUpdateSetting): boolean | Promise<boolean>;

    abstract restoreDB(label: string): boolean | Promise<boolean>;

    abstract backupDB(label: string): boolean | Promise<boolean>;
}

export class Setting {
    domain?: string;
}

export class User {
    _id?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    imageUrl?: string;
    email?: string;
    phoneNumber?: string;
    isActive?: boolean;
    isLocked?: boolean;
    createdAt?: number;
    createdBy?: User;
}
