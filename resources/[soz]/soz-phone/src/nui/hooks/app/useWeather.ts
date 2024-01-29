import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';

export const useWeather = () => {
    const forecasts = useSelector((state: RootState) => state.appWeather.forecasts);
    const stormAlert: Date = useSelector((state: RootState) => state.appWeather.alert);

    const getForecasts = useCallback(() => {
        return forecasts;
    }, [forecasts]);

    const getAlert = useCallback(() => {
        return new Date(stormAlert);
    }, [stormAlert]);

    return {
        getForecasts,
        getAlert,
    };
};
