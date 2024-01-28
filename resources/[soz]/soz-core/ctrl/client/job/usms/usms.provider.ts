import { Once, OnceStep, OnEvent } from '@core/decorators/event';
import { Inject } from '@core/decorators/injectable';
import { Provider } from '@core/decorators/provider';
import { BlipFactory } from '@public/client/blip';

@Provider()
export class USMSProvider {

    @Inject(BlipFactory)
    private blipFactory: BlipFactory;

    @Once(OnceStep.PlayerLoaded)
    public async onUSMSLoad() {
        this.blipFactory.create('usms', {
            coords: { x: -823.54, y: -694.68, z: 28.06 },
            name: 'United States Marshals Service',
            sprite: 732,
            scale: 0.9,
        });
    }
}




