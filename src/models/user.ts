import { LongDateFormat, ShortDateFormat, LongTimeFormat, ShortTimeFormat } from '@/core/datetime.ts';
import { DecimalSeparator, DigitGroupingSymbol, DigitGroupingType } from '@/core/numeral.ts';
import { CurrencyDisplayType } from '@/core/currency.ts';
import { PresetAmountColor } from '@/core/color.ts';
import type { LocalizedPresetCategory } from '@/core/category.ts';
import { TransactionEditScopeType } from '@/core/transaction.ts';

export class User {
    public username: string = '';
    public password: string = '';
    public confirmPassword: string = '';
    public email: string = '';
    public nickname: string = '';
    public language: string;
    public defaultCurrency: string;
    public firstDayOfWeek: number;

    public defaultAccountId?: string;
    public transactionEditScope?: number;
    public longDateFormat?: number;
    public shortDateFormat?: number;
    public longTimeFormat?: number;
    public shortTimeFormat?: number;
    public decimalSeparator?: number;
    public digitGroupingSymbol?: number;
    public digitGrouping?: number;
    public currencyDisplayType?: number;
    public expenseAmountColor?: number;
    public incomeAmountColor?: number;

    private constructor(language: string, defaultCurrency: string, firstDayOfWeek: number) {
        this.language = language;
        this.defaultCurrency = defaultCurrency;
        this.firstDayOfWeek = firstDayOfWeek;
    }

    public toRegisterRequest(categories?: LocalizedPresetCategory[]): UserRegisterRequest {
        return {
            username: this.username,
            email: this.email,
            nickname: this.nickname,
            password: this.password,
            language: this.language,
            defaultCurrency: this.defaultCurrency,
            firstDayOfWeek: this.firstDayOfWeek,
            categories: categories
        };
    }

    public toProfileUpdateRequest(currentPassword?: string): UserProfileUpdateRequest {
        return {
            email: this.email,
            nickname: this.nickname,
            password: this.password,
            oldPassword: currentPassword,
            defaultAccountId: this.defaultAccountId,
            transactionEditScope: this.transactionEditScope,
            language: this.language,
            defaultCurrency: this.defaultCurrency,
            firstDayOfWeek: this.firstDayOfWeek,
            longDateFormat: this.longDateFormat,
            shortDateFormat: this.shortDateFormat,
            longTimeFormat: this.longTimeFormat,
            shortTimeFormat: this.shortTimeFormat,
            decimalSeparator: this.decimalSeparator,
            digitGroupingSymbol: this.digitGroupingSymbol,
            digitGrouping: this.digitGrouping,
            currencyDisplayType: this.currencyDisplayType,
            expenseAmountColor: this.expenseAmountColor,
            incomeAmountColor: this.incomeAmountColor
        };
    }

    public static of(profileResponse: UserProfileResponse): User {
        const user = new User(profileResponse.language, profileResponse.defaultCurrency, profileResponse.firstDayOfWeek);
        user.defaultAccountId = profileResponse.defaultAccountId;
        user.transactionEditScope = profileResponse.transactionEditScope;
        user.longDateFormat = profileResponse.longDateFormat;
        user.shortDateFormat = profileResponse.shortDateFormat;
        user.longTimeFormat = profileResponse.longTimeFormat;
        user.shortTimeFormat = profileResponse.shortTimeFormat;
        user.decimalSeparator = profileResponse.decimalSeparator;
        user.digitGroupingSymbol = profileResponse.digitGroupingSymbol;
        user.digitGrouping = profileResponse.digitGrouping;
        user.currencyDisplayType = profileResponse.currencyDisplayType;
        user.expenseAmountColor = profileResponse.expenseAmountColor;
        user.incomeAmountColor = profileResponse.incomeAmountColor;

        return user;
    }

    public static createNewUser(language: string, defaultCurrency: string, firstDayOfWeek: number): User {
        return new User(language, defaultCurrency, firstDayOfWeek);
    }
}

export interface UserBasicInfo {
    readonly username: string;
    readonly email: string;
    readonly nickname: string;
    readonly avatar: string;
    readonly avatarProvider?: string;
    readonly defaultAccountId: string;
    readonly transactionEditScope: number;
    readonly language: string;
    readonly defaultCurrency: string;
    readonly firstDayOfWeek: number;
    readonly longDateFormat: number;
    readonly shortDateFormat: number;
    readonly longTimeFormat: number;
    readonly shortTimeFormat: number;
    readonly decimalSeparator: number;
    readonly digitGroupingSymbol: number;
    readonly digitGrouping: number;
    readonly currencyDisplayType: number;
    readonly expenseAmountColor: number;
    readonly incomeAmountColor: number;
    readonly emailVerified: boolean;
}

export interface UserLoginRequest {
    readonly loginName: string;
    readonly password: string;
}

export interface UserRegisterRequest {
    readonly username: string;
    readonly email: string;
    readonly nickname: string;
    readonly password: string;
    readonly language: string;
    readonly defaultCurrency: string;
    readonly firstDayOfWeek: number;
    readonly categories?: LocalizedPresetCategory[];
}

export interface UserVerifyEmailResponse {
    readonly newToken?: string;
    readonly user: UserBasicInfo;
    readonly notificationContent?: string;
}

export interface UserResendVerifyEmailRequest {
    readonly email: string;
    readonly password: string;
}

export interface UserProfileUpdateRequest {
    readonly email?: string;
    readonly nickname?: string;
    readonly password?: string;
    readonly oldPassword?: string;
    readonly defaultAccountId?: string;
    readonly transactionEditScope?: number;
    readonly language?: string;
    readonly defaultCurrency?: string;
    readonly firstDayOfWeek?: number;
    readonly longDateFormat?: number;
    readonly shortDateFormat?: number;
    readonly longTimeFormat?: number;
    readonly shortTimeFormat?: number;
    readonly decimalSeparator?: number;
    readonly digitGroupingSymbol?: number;
    readonly digitGrouping?: number;
    readonly currencyDisplayType?: number;
    readonly expenseAmountColor?: number;
    readonly incomeAmountColor?: number;
}

export interface UserProfileUpdateResponse {
    readonly user: UserBasicInfo;
    readonly newToken?: string;
}

export interface UserProfileResponse extends UserBasicInfo {
    readonly lastLoginAt: number;
}

export const EMPTY_USER_BASIC_INFO: UserBasicInfo = {
    username: '',
    email: '',
    nickname: '',
    avatar: '',
    avatarProvider: undefined,
    defaultAccountId: '',
    transactionEditScope: TransactionEditScopeType.All.type,
    language: '',
    defaultCurrency: '',
    firstDayOfWeek: -1,
    longDateFormat: LongDateFormat.Default.type,
    shortDateFormat: ShortDateFormat.Default.type,
    longTimeFormat: LongTimeFormat.Default.type,
    shortTimeFormat: ShortTimeFormat.Default.type,
    decimalSeparator: DecimalSeparator.LanguageDefaultType,
    digitGroupingSymbol: DigitGroupingSymbol.LanguageDefaultType,
    digitGrouping: DigitGroupingType.LanguageDefaultType,
    currencyDisplayType: CurrencyDisplayType.Default.type,
    expenseAmountColor: PresetAmountColor.DefaultExpenseColor.type,
    incomeAmountColor: PresetAmountColor.DefaultIncomeColor.type,
    emailVerified: false
}
