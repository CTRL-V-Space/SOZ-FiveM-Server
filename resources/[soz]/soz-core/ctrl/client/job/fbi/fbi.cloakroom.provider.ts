import { PlayerWardrobe } from '@public/client/player/player.wardrobe';
import { Once, OnceStep, OnEvent } from '@public/core/decorators/event';
import { Inject } from '@public/core/decorators/injectable';
import { Provider } from '@public/core/decorators/provider';
import { ClientEvent, ServerEvent } from '@public/shared/event';
import { DUTY_OUTFIT_NAME, FBICloakroom } from '../../../shared/job/fbi';

@Provider()
export class FBICloakRoomProvider {
    @Inject(PlayerWardrobe)
    private playerWardrobe: PlayerWardrobe;

    @OnEvent(ClientEvent.FBI_APPLY_OUTFIT)
    public async applyDutyClothing() {
        const model = GetEntityModel(PlayerPedId());

        const outfit = FBICloakroom[model][DUTY_OUTFIT_NAME];
        const { completed } = await this.playerWardrobe.waitProgress(false);
        if (completed) {
            TriggerServerEvent(ServerEvent.CHARACTER_SET_JOB_CLOTHES, outfit);
        }
    }
}
