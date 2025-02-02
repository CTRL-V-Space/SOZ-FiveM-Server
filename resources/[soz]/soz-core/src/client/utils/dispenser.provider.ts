import { Once } from '@public/core/decorators/event';
import { Inject } from '@public/core/decorators/injectable';
import { ServerEvent } from '@public/shared/event';

import { Provider } from '../../core/decorators/provider';
import { PlayerService } from '../player/player.service';
import { ProgressService } from '../progress.service';
import { TargetFactory } from '../target/target.factory';

const dispenser_eat_price = 10;
const dispenser_drink_price = 10;
const dispenser_cafe_price = 10;

const vending_machine_drink = ['prop_vend_soda_01', 'prop_vend_soda_02', 'prop_watercooler_dark', 'prop_watercooler'];
const vending_machine_food = ['prop_vend_snak_01', 'prop_vend_snak_01_tu'];
const vending_machine_cafe = ['prop_vend_coffe_01'];

@Provider()
export class DispenserProvider {
    @Inject(PlayerService)
    public playerService: PlayerService;

    @Inject(TargetFactory)
    public targetFactory: TargetFactory;

    @Inject(ProgressService)
    private progressService: ProgressService;

    @Once()
    public onStart() {
        this.targetFactory.createForModel(
            vending_machine_drink,
            [
                {
                    label: "Bouteille d'eau ($" + dispenser_drink_price + ')',
                    icon: 'c:food/bouteille.png',
                    action: () => {
                        this.buy('Achète à boire...', 'water_bottle', dispenser_drink_price);
                    },
                },
            ],
            1
        );

        this.targetFactory.createForModel(
            vending_machine_food,
            [
                {
                    label: 'Sandwich ($' + dispenser_eat_price + ')',
                    icon: 'c:food/baguette.png',
                    action: () => {
                        this.buy('Achète à manger...', 'sandwich', dispenser_eat_price);
                    },
                },
            ],
            1
        );

        this.targetFactory.createForModel(
            vending_machine_cafe,
            [
                {
                    label: 'Café ($' + dispenser_cafe_price + ')',
                    icon: 'c:food/cafe.png',
                    action: () => {
                        this.buy('Achète un Café...', 'coffee', dispenser_cafe_price);
                    },
                },
            ],
            1
        );
    }

    private async buy(action: string, item: string, price: number) {
        const { completed } = await this.progressService.progress(
            'dispenser_buy',
            action,
            5000,
            {
                dictionary: 'mini@sprunk',
                name: 'plyr_buy_drink_pt1',
                flags: 16,
            },
            {
                useAnimationService: true,
                disableMovement: true,
                disableCarMovement: false,
                disableMouse: false,
                disableCombat: true,
            }
        );

        if (!completed) {
            return;
        }

        TriggerServerEvent(ServerEvent.DISPENSER_BUY, price, item);
    }
}
