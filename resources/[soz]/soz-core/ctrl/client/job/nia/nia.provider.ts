import { Once, OnceStep, OnEvent } from '@core/decorators/event';
import { Inject } from '@core/decorators/injectable';
import { Provider } from '@core/decorators/provider';
import { BlipFactory } from '@public/client/blip';

@Provider()
export class NIAProvider {

    @Inject(BlipFactory)
    private blipFactory: BlipFactory;

    @Once(OnceStep.PlayerLoaded)
    public async onNIALoad() {
        this.blipFactory.create('nia', {
            coords: { x: -1081.28, y: -261.62, z: 37.8 },
            name: 'NIA',
            sprite: 732,
            scale: 0.9,
        });
    }
}
