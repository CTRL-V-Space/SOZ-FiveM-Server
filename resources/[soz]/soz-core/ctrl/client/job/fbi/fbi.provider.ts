import { Once, OnceStep, OnEvent } from '@core/decorators/event';
import { Inject } from '@core/decorators/injectable';
import { Provider } from '@core/decorators/provider';
import { BlipFactory } from '@public/client/blip';

@Provider()
export class FBIProvider {

    @Inject(BlipFactory)
    private blipFactory: BlipFactory;

    @Once(OnceStep.PlayerLoaded)
    public async onFBILoad() {
        this.blipFactory.create('fbi', {
            coords: { x: 12.87, y: -930.67, z: 29.90 },
            name: 'FIB',
            sprite: 421,
            scale: 1.0,
        });
    }
}


