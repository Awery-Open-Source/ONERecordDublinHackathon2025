import {InjectionToken} from '@angular/core';

export interface UrlConfig {
    apiUrl: string;
    type: 'php-one' | 'php-another-one';
}

export const URL_CONFIG = new InjectionToken<UrlConfig>('URL')
