import { Module } from '@core/decorators/module';

import { USMSProvider } from './usms.provider';

@Module({
    providers: [
        USMSProvider
    ],
})
export class USMSModule {}