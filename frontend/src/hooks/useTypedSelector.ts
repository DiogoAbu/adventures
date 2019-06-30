import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../reducers';

/**
 * Create a hook that is properly typed for store's root state.
 */
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
