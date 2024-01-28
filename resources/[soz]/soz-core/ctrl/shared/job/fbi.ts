import { Component, Prop, WardrobeConfig } from '@public/shared/cloth';
import { VanillaComponentDrawableIndexMaxValue, VanillaPropDrawableIndexMaxValue } from '@public/shared/drawable';
import { joaat } from '@public/shared/joaat';

export const DUTY_OUTFIT_NAME = 'Tenue de terrain';

export const FBICloakroom: WardrobeConfig = {
    [joaat('mp_m_freemode_01')]: {
        [DUTY_OUTFIT_NAME]: {
            Components: {
                [Component.Torso]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Legs]: {
                    Drawable: 34,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.Shoes]: { Drawable: 51, Texture: 0, Palette: 0 },
                [Component.Undershirt]: {
                    Drawable: 15,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.BodyArmor]: {
                    Drawable: 60,
                    Texture: 2,
                    Palette: 0,
                },
                [Component.Decals]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Tops]: {
                    Drawable: 50,
                    Texture: 0,
                    Palette: 0,
                },
            },
            Props: {
                [Prop.Hat]: {
                    Drawable: 8,
                    Texture: 0,
                    Palette: 0,
                },
            },
        },
        ['Tenue sombre']: {
            Components: {
                [Component.Torso]: { Drawable: 22, Texture: 0, Palette: 0 },
                [Component.Legs]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Component.Legs] + 8,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.Bag]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Component.Bag] + 2,
                    Texture: 1,
                    Palette: 0,
                },
                [Component.Shoes]: { Drawable: 51, Texture: 0, Palette: 0 },
                [Component.Accessories]: {
                    Drawable:
                        VanillaComponentDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Component.Accessories] + 4,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.Undershirt]: {
                    Drawable:
                        VanillaComponentDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Component.Undershirt] + 4,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.BodyArmor]: {
                    Drawable:
                        VanillaComponentDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Component.BodyArmor] + 8,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.Decals]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Tops]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Component.Tops] + 2,
                    Texture: 3,
                    Palette: 0,
                },
            },
            Props: {
                [Prop.Hat]: {
                    Drawable: VanillaPropDrawableIndexMaxValue[joaat('mp_m_freemode_01')][Prop.Hat] + 7,
                    Texture: 0,
                    Palette: 0,
                },
            },
        },
    },
    [joaat('mp_f_freemode_01')]: {
        [DUTY_OUTFIT_NAME]: {
            Components: {
                [Component.Torso]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Legs]: {
                    Drawable: 34,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.Shoes]: { Drawable: 51, Texture: 0, Palette: 0 },
                [Component.Undershirt]: {
                    Drawable: 15,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.BodyArmor]: {
                    Drawable: 60,
                    Texture: 2,
                    Palette: 0,
                },
                [Component.Decals]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Tops]: {
                    Drawable: 50,
                    Texture: 0,
                    Palette: 0,
                },
            },
            Props: {
                [Prop.Hat]: {
                    Drawable: 8,
                    Texture: 0,
                    Palette: 0,
                },
            },
        },
        ['Tenue sombre']: {
            Components: {
                [Component.Torso]: { Drawable: 9, Texture: 0, Palette: 0 },
                [Component.Legs]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_f_freemode_01')][Component.Legs] + 8,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.Bag]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_f_freemode_01')][Component.Bag] + 2,
                    Texture: 1,
                    Palette: 0,
                },
                [Component.Shoes]: { Drawable: 52, Texture: 0, Palette: 0 },
                [Component.Accessories]: {
                    Drawable:
                        VanillaComponentDrawableIndexMaxValue[joaat('mp_f_freemode_01')][Component.Accessories] + 4,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.Undershirt]: {
                    Drawable:
                        VanillaComponentDrawableIndexMaxValue[joaat('mp_f_freemode_01')][Component.Undershirt] + 4,
                    Texture: 0,
                    Palette: 0,
                },
                [Component.BodyArmor]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Decals]: { Drawable: 0, Texture: 0, Palette: 0 },
                [Component.Tops]: {
                    Drawable: VanillaComponentDrawableIndexMaxValue[joaat('mp_f_freemode_01')][Component.Tops] + 2,
                    Texture: 3,
                    Palette: 0,
                },
            },
            Props: {
                [Prop.Hat]: {
                    Drawable: VanillaPropDrawableIndexMaxValue[joaat('mp_f_freemode_01')][Prop.Hat] + 7,
                    Texture: 0,
                    Palette: 0,
                },
            },
        },
    },
};