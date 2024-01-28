import { Module } from '@core/decorators/module';

import { FBICloakRoomProvider } from './fbi.cloakroom.provider';
import { FBIProvider } from './fbi.provider';

@Module({
    providers: [
        FBICloakRoomProvider,
        FBIProvider
    ],
})
export class FBIModule {}
