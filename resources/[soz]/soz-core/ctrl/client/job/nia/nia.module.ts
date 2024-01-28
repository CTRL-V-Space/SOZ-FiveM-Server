import { Module } from '@core/decorators/module';

import { NIAProvider } from './nia.provider';

@Module({
    providers: [
        NIAProvider
    ],
})
export class NIAModule {}