import { Fragment, FunctionComponent, ReactElement, useEffect, useState } from 'react';

import { Animations, Moods, Walks } from '../../../config/animation';
import { AnimationConfigItem, WalkConfigItem } from '../../../shared/animation';
import { Invoice } from '../../../shared/bank';
import { ClothConfig } from '../../../shared/cloth';
import { NuiEvent } from '../../../shared/event';
import { CardType } from '../../../shared/nui/card';
import { MenuType } from '../../../shared/nui/menu';
import { PlayerPersonalMenuData, Shortcut } from '../../../shared/nui/player';
import { fetchNui } from '../../fetch';
import { usePlayer } from '../../hook/data';
import { useNuiEvent } from '../../hook/nui';
import {
    MainMenu,
    Menu,
    MenuContent,
    MenuItemButton,
    MenuItemCheckbox,
    MenuItemSelect,
    MenuItemSelectOption,
    MenuItemSubMenuLink,
    MenuTitle,
    SubMenu,
} from '../Styleguide/Menu';

type MenuPlayerPersonalProps = {
    data: PlayerPersonalMenuData;
};

export const MenuPlayerPersonal: FunctionComponent<MenuPlayerPersonalProps> = ({ data }) => {
    const player = usePlayer();

    if (!player) {
        return null;
    }

    const openKeys = () => {
        fetchNui(NuiEvent.PlayerMenuOpenKeys);
    };

    return (
        <Menu type={MenuType.PlayerPersonal}>
            <MainMenu>
                <MenuTitle banner="https://nui-img/soz/menu_personal">
                    {player.charinfo.firstname} {player.charinfo.lastname}
                </MenuTitle>
                <MenuContent>
                    <MenuItemSubMenuLink id="identity" description="Voir/Montrer vos papiers d'identité">
                        Mon identité
                    </MenuItemSubMenuLink>
                    <MenuItemButton onConfirm={openKeys}>Gestion des clés</MenuItemButton>
                    <MenuItemSubMenuLink id="clothing">Gestion de la tenue</MenuItemSubMenuLink>
                    <MenuItemSubMenuLink id="invoices">Gestion des factures</MenuItemSubMenuLink>
                    <MenuItemSubMenuLink id="animations">Animations</MenuItemSubMenuLink>
                    <MenuItemSubMenuLink id="hud">HUD</MenuItemSubMenuLink>
                    <MenuItemButton onConfirm={() => fetchNui(NuiEvent.PlayerMenuVoipReset)}>
                        Redémarrer la voip
                    </MenuItemButton>
                </MenuContent>
            </MainMenu>
            <MenuIdentity />
            <MenuClothing />
            <MenuInvoice invoices={data.invoices} />
            <MenuAnimation shortcuts={data.shortcuts} />
            <SubMenu id="hud">
                <MenuTitle banner="https://nui-img/soz/menu_personal">HUD</MenuTitle>
                <MenuContent>
                    <MenuItemCheckbox
                        checked={data.isHudVisible}
                        description="Active/Désactive le HUD"
                        onChange={value => fetchNui(NuiEvent.PlayerMenuHudSetGlobal, { value })}
                    >
                        HUD: Global
                    </MenuItemCheckbox>
                    <MenuItemCheckbox
                        checked={data.isCinematicMode}
                        description="Active/Désactive les barres noires"
                        onChange={value => fetchNui(NuiEvent.PlayerMenuHudSetCinematicMode, { value })}
                    >
                        HUD: Cinématique
                    </MenuItemCheckbox>
                    <MenuItemCheckbox
                        checked={data.isCinematicCameraActive}
                        description="Active/Désactive la caméra cinématique"
                        onChange={value => fetchNui(NuiEvent.PlayerMenuHudSetCinematicCameraActive, { value })}
                    >
                        Caméra: Cinématique
                    </MenuItemCheckbox>
                </MenuContent>
            </SubMenu>
            <SubMenu id="job"></SubMenu>
            <SubMenu id="voip"></SubMenu>
        </Menu>
    );
};

const MenuIdentity: FunctionComponent = () => {
    const showOrSeeCard = (type: CardType) => {
        return (index, value) => {
            if (value === 'see') {
                fetchNui(NuiEvent.PlayerMenuCardSee, { type });
            } else {
                fetchNui(NuiEvent.PlayerMenuCardShow, { type });
            }
        };
    };

    return (
        <SubMenu id="identity">
            <MenuTitle banner="https://nui-img/soz/menu_personal">Gestion de l'identité</MenuTitle>
            <MenuContent>
                <MenuItemSelect title="Carte d'identité" onConfirm={showOrSeeCard('identity')}>
                    <MenuItemSelectOption value="see">Voir</MenuItemSelectOption>
                    <MenuItemSelectOption value="show">Montrer</MenuItemSelectOption>
                </MenuItemSelect>
                <MenuItemSelect title="Vos licences" onConfirm={showOrSeeCard('license')}>
                    <MenuItemSelectOption value="see">Voir</MenuItemSelectOption>
                    <MenuItemSelectOption value="show">Montrer</MenuItemSelectOption>
                </MenuItemSelect>
                <MenuItemSelect title="Carte de santé" onConfirm={showOrSeeCard('health')}>
                    <MenuItemSelectOption value="see">Voir</MenuItemSelectOption>
                    <MenuItemSelectOption value="show">Montrer</MenuItemSelectOption>
                </MenuItemSelect>
            </MenuContent>
        </SubMenu>
    );
};

const MenuClothing: FunctionComponent = () => {
    const player = usePlayer();

    const createUpdateClothConfig = (key: keyof ClothConfig['Config'], inverted = false) => {
        return value => {
            if (!inverted) {
                value = !value;
            }

            fetchNui(NuiEvent.PlayerMenuClothConfigUpdate, { key, value });
        };
    };

    return (
        <SubMenu id="clothing">
            <MenuTitle banner="https://nui-img/soz/menu_personal">Gestion de la tenue</MenuTitle>
            <MenuContent>
                <MenuItemCheckbox
                    onChange={createUpdateClothConfig('ShowHelmet', true)}
                    checked={player.cloth_config.Config['ShowHelmet']}
                >
                    Casque
                </MenuItemCheckbox>
                <MenuItemCheckbox
                    onChange={createUpdateClothConfig('HideHead')}
                    checked={!player.cloth_config.Config['HideHead']}
                >
                    Chapeau
                </MenuItemCheckbox>
                <MenuItemCheckbox
                    onChange={createUpdateClothConfig('HideMask')}
                    checked={!player.cloth_config.Config['HideMask']}
                >
                    Masque
                </MenuItemCheckbox>
                <MenuItemCheckbox
                    onChange={createUpdateClothConfig('HideGlasses')}
                    checked={!player.cloth_config.Config['HideGlasses']}
                >
                    Lunettes
                </MenuItemCheckbox>
                <MenuItemCheckbox
                    onChange={createUpdateClothConfig('HideEar')}
                    checked={!player.cloth_config.Config['HideEar']}
                >
                    Boucles
                </MenuItemCheckbox>
                <MenuItemCheckbox
                    onChange={createUpdateClothConfig('HideChain')}
                    checked={!player.cloth_config.Config['HideChain']}
                >
                    Collier
                </MenuItemCheckbox>
                <MenuItemCheckbox
                    onChange={createUpdateClothConfig('HideBulletproof')}
                    checked={!player.cloth_config.Config['HideBulletproof']}
                >
                    Gilet
                </MenuItemCheckbox>
                <MenuItemCheckbox
                    onChange={createUpdateClothConfig('HideTop')}
                    checked={!player.cloth_config.Config['HideTop']}
                >
                    Haut
                </MenuItemCheckbox>
                <MenuItemCheckbox
                    onChange={createUpdateClothConfig('HideLeftHand')}
                    checked={!player.cloth_config.Config['HideLeftHand']}
                >
                    Montre
                </MenuItemCheckbox>
                <MenuItemCheckbox
                    onChange={createUpdateClothConfig('HideRightHand')}
                    checked={!player.cloth_config.Config['HideRightHand']}
                >
                    Bracelet
                </MenuItemCheckbox>
                <MenuItemCheckbox
                    onChange={createUpdateClothConfig('HideBag')}
                    checked={!player.cloth_config.Config['HideBag']}
                >
                    Sac
                </MenuItemCheckbox>
                <MenuItemCheckbox
                    onChange={createUpdateClothConfig('HidePants')}
                    checked={!player.cloth_config.Config['HidePants']}
                >
                    Pantalon
                </MenuItemCheckbox>
                <MenuItemCheckbox
                    onChange={createUpdateClothConfig('HideShoes')}
                    checked={!player.cloth_config.Config['HideShoes']}
                >
                    Chaussures
                </MenuItemCheckbox>
            </MenuContent>
        </SubMenu>
    );
};

type MenuInvoiceProps = {
    invoices: Invoice[];
};

const MenuInvoice: FunctionComponent<MenuInvoiceProps> = ({ invoices: invoicesIntial }) => {
    const [invoices, setInvoices] = useState(invoicesIntial);

    useNuiEvent('player', 'UpdateInvoices', (invoices: Invoice[]) => {
        setInvoices(invoices);
    });

    return (
        <SubMenu id="invoices">
            <MenuTitle banner="https://nui-img/soz/menu_personal">Gestion des factures</MenuTitle>
            <MenuContent>
                {invoices.map((invoice, i) => (
                    <MenuItemSelect
                        title={invoice.label}
                        description={`Payer ${invoice.amount}$ pour ${invoice.emitterName}`}
                        key={i}
                        onConfirm={(i, value) => {
                            if (value === 'pay') {
                                fetchNui(NuiEvent.PlayerMenuInvoicePay, { invoiceId: invoice.id });
                            } else if (value === 'deny') {
                                fetchNui(NuiEvent.PlayerMenuInvoiceDeny, { invoiceId: invoice.id });
                            }
                        }}
                    >
                        <MenuItemSelectOption value="pay">Payer</MenuItemSelectOption>
                        <MenuItemSelectOption value="deny">Refuser</MenuItemSelectOption>
                    </MenuItemSelect>
                ))}
            </MenuContent>
        </SubMenu>
    );
};

type MenuAnimationProps = {
    shortcuts: Record<string, Shortcut>;
};

const MenuAnimation: FunctionComponent<MenuAnimationProps> = ({ shortcuts: intialShortcuts }) => {
    const [shortcuts, setShortcuts] = useState(intialShortcuts);

    useNuiEvent('player', 'UpdateAnimationShortcuts', shortcuts => {
        setShortcuts(shortcuts);
    });

    return (
        <>
            <SubMenu id="animations">
                <MenuTitle banner="https://nui-img/soz/menu_personal">Gestion des animations</MenuTitle>
                <MenuContent>
                    <MenuItemSubMenuLink id="animation_list">Animations</MenuItemSubMenuLink>
                    <MenuItemSubMenuLink id="walk_list">Démarches</MenuItemSubMenuLink>
                    <MenuItemSubMenuLink id="mood_list">Humeurs</MenuItemSubMenuLink>
                    <MenuItemSubMenuLink id="favorite_list">Mes animations</MenuItemSubMenuLink>
                </MenuContent>
            </SubMenu>
            <SubMenu id="mood_list">
                <MenuTitle banner="https://nui-img/soz/menu_personal">Humeurs</MenuTitle>
                <MenuContent>
                    {Moods.map((mood, i) => (
                        <MenuItemButton
                            onConfirm={() => {
                                fetchNui(NuiEvent.PlayerMenuAnimationSetMood, { moodItem: mood });
                            }}
                            key={i}
                        >
                            {mood.name}
                        </MenuItemButton>
                    ))}
                </MenuContent>
            </SubMenu>
            <SubMenu id="favorite_list">
                <MenuTitle banner="https://nui-img/soz/menu_personal">Mes raccourcis d'animations</MenuTitle>
                <MenuContent>
                    {Object.keys(shortcuts).map((key, i) => {
                        const shortcut = shortcuts[key];

                        if (!shortcut.animation) {
                            return <MenuItemButton key={key}>{shortcut.name}</MenuItemButton>;
                        }

                        return (
                            <MenuItemSelect
                                title={shortcut.name}
                                onConfirm={(i, value) => {
                                    if (value === 'delete') {
                                        fetchNui(NuiEvent.PlayerMenuAnimationFavoriteDelete, { key });
                                    }
                                }}
                                key={key}
                            >
                                <MenuItemSelectOption value="delete">Supprimer</MenuItemSelectOption>
                            </MenuItemSelect>
                        );
                    })}
                </MenuContent>
            </SubMenu>
            <MenuWalkList />
            <MenuAnimationList />
        </>
    );
};

const MenuAnimationList: FunctionComponent = () => {
    const elements = [];
    const subMenus = [];

    for (const item of Animations) {
        const [element, newSubMenus] = createAnimationItemMenu(item, 'animation');

        elements.push(element);
        subMenus.push(...newSubMenus);
    }

    return (
        <>
            <SubMenu id="animation_list">
                <MenuTitle banner="https://nui-img/soz/menu_personal">Liste des animations</MenuTitle>
                <MenuContent>
                    <MenuItemButton
                        onConfirm={() => {
                            fetchNui(NuiEvent.PlayerMenuAnimationStop);
                        }}
                    >
                        🛑 Stopper l'animation
                    </MenuItemButton>
                    {elements.map((element, index) => {
                        return <Fragment key={index}>{element}</Fragment>;
                    })}
                </MenuContent>
            </SubMenu>
            {subMenus.map((element, index) => {
                return <Fragment key={index}>{element}</Fragment>;
            })}
        </>
    );
};

const MenuWalkList: FunctionComponent = () => {
    const elements = [];
    const subMenus = [];

    for (const item of Walks) {
        const [element, newSubMenus] = createWalkItemMenu(item, 'walk');

        elements.push(element);
        subMenus.push(...newSubMenus);
    }

    return (
        <>
            <SubMenu id="walk_list">
                <MenuTitle banner="https://nui-img/soz/menu_personal">Liste des démarches</MenuTitle>
                <MenuContent>
                    {elements.map((element, index) => {
                        return <Fragment key={index}>{element}</Fragment>;
                    })}
                </MenuContent>
            </SubMenu>
            {subMenus.map((element, index) => {
                return <Fragment key={index}>{element}</Fragment>;
            })}
        </>
    );
};

type ItemCategory<T> = {
    type: string;
    name: string;
    items?: T[];
};

const createRecursiveSubMenu = <T extends ItemCategory<T>>(
    item: T,
    prefix: string,
    createLeafItem: (item: T) => ReactElement
): [ReactElement, ReactElement[]] => {
    if (item.type !== 'category') {
        return [createLeafItem(item), []];
    }

    if (item.type === 'category') {
        const elements = [];
        const subMenus = [];

        for (const subItem of item.items) {
            const [element, newSubMenus] = createRecursiveSubMenu(subItem, `${prefix}_${item.name}`, createLeafItem);

            elements.push(element);
            subMenus.push(...newSubMenus);
        }

        subMenus.push(
            <SubMenu id={`${prefix}${item.name}`}>
                <MenuTitle banner="https://nui-img/soz/menu_personal">Gestion des animations</MenuTitle>
                <MenuContent>
                    {elements.map((element, index) => {
                        return <Fragment key={index}>{element}</Fragment>;
                    })}
                </MenuContent>
            </SubMenu>
        );

        return [<MenuItemSubMenuLink id={`${prefix}${item.name}`}>{item.name}</MenuItemSubMenuLink>, subMenus];
    }

    return [null, []];
};

const createAnimationLeafItem = (item: AnimationConfigItem): ReactElement => {
    if (item.type === 'category') {
        return null;
    }

    return (
        <MenuItemSelect
            onConfirm={(i, value) => {
                if (value === 'play') {
                    fetchNui(NuiEvent.PlayerMenuAnimationPlay, { animationItem: item });
                } else if (value === 'favorite') {
                    fetchNui(NuiEvent.PlayerMenuAnimationFavorite, {
                        animationItem: item,
                    });
                }
            }}
            title={
                <div className="flex items-center">
                    {item.icon && <div className="mr-2">{item.icon}</div>}
                    <div>{item.name}</div>
                </div>
            }
        >
            <MenuItemSelectOption value="play">Jouer</MenuItemSelectOption>
            <MenuItemSelectOption value="favorite">Mettre en Raccourci</MenuItemSelectOption>
        </MenuItemSelect>
    );
};

const createAnimationItemMenu = (item: AnimationConfigItem, prefix: string): [ReactElement, ReactElement[]] => {
    return createRecursiveSubMenu(item, prefix, createAnimationLeafItem);
};

const createWalkLeafItem = (item: WalkConfigItem): ReactElement => {
    if (item.type === 'category') {
        return null;
    }

    return (
        <MenuItemButton
            onConfirm={() => {
                fetchNui(NuiEvent.PlayerMenuAnimationSetWalk, { walkItem: item });
            }}
        >
            {item.name}
        </MenuItemButton>
    );
};

const createWalkItemMenu = (item: WalkConfigItem, prefix: string): [ReactElement, ReactElement[]] => {
    return createRecursiveSubMenu(item, prefix, createWalkLeafItem);
};
