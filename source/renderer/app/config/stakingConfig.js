// @flow
import type {
  RedeemItnRewardsStep,
  SmashServerType,
} from '../types/stakingTypes';

import type { SmashServerStatuses } from '../api/staking/types';

export const SMASH_SERVERS_LIST: {
  [key: SmashServerType]: {
    name: string,
    url: string,
  },
} = {
  iohk: {
    name: 'IOHK',
    url: 'https://smash.cardano-mainnet.iohk.io',
  },
  adaPools: {
    name: 'AdaPools',
    url: 'https://smash.adapools.org',
  },
};

export const SMASH_SERVER_TYPES: SmashServerType = {
  IOHK: 'iohk',
  ADA_POOLS: 'adaPools',
  CUSTOM: 'custom',
};

export const SMASH_SERVER_STATUSES: {
  [key: string]: SmashServerStatuses,
} = {
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  UNREACHABLE: 'unreachable',
  NO_SMASH_CONFIGURED: 'no_smash_configured',
};

export const RANKING_SLIDER_RATIO = 60;
export const MIN_DELEGATION_FUNDS_LOG = Math.log(10);
export const MIN_DELEGATION_FUNDS = 10;
export const INITIAL_DELEGATION_FUNDS_LOG = Math.log(1000);
export const INITIAL_DELEGATION_FUNDS = 1000;
export const MAX_DELEGATION_FUNDS_LOG = Math.log(220000000);
export const MAX_DELEGATION_FUNDS = 220000000;
export const OUT_OF_RANGE_MAX_DELEGATION_FUNDS = 33000000000;
export const ALL_WALLETS_SELECTION_ID = '0';

// Dimensions

export const OFFSET_LEFT = 84;
export const OFFSET_TOP = 135;
export const THUMBNAIL_HEIGHT = 71;
export const THUMBNAIL_WIDTH = 80;
export const THUMBNAIL_OFFSET_WIDTH = THUMBNAIL_WIDTH / 2;
export const THUMBNAIL_OFFSET_HEIGHT = THUMBNAIL_HEIGHT / 2;
export const ARROW_WIDTH = 22;
export const ARROW_HEIGHT = 11;
export const ARROW_OFFSET = ARROW_WIDTH / 2;
export const TOOLTIP_DELTA = 5;
export const LIST_VIEW_TOOLTIP_DELTA_TOP = 120;
export const LIST_VIEW_ROW_HEIGHT = 36;
export const TOOLTIP_MIN_HEIGHT = 287;
export const TOOLTIP_MAX_HEIGHT = 370;
export const TOOLTIP_AVG_HEIGHT = (TOOLTIP_MIN_HEIGHT + TOOLTIP_MAX_HEIGHT) / 2;
export const TOOLTIP_WIDTH = 240;
export const CONTAINER_MARGIN = 21;
export const RECENT_STAKE_POOLS_COUNT = 6;

// Timers

export const STAKE_POOL_TRANSACTION_CHECK_INTERVAL = 1 * 1000; // 1 second | unit: milliseconds;
export const STAKE_POOL_TRANSACTION_CHECKER_TIMEOUT = 30 * 1000; // 30 seconds | unit: milliseconds;
export const STAKE_POOLS_INTERVAL = 1 * 60 * 1000; // 1 minute | unit: milliseconds;
export const STAKE_POOLS_FAST_INTERVAL = 1 * 1000; // 1 second | unit: milliseconds;

// Redeem ITN Rewards

export const REDEEM_ITN_REWARDS_AMOUNT = 1 * 1000000; // 1 ADA | unit: lovelace

export const REDEEM_ITN_REWARDS_STEPS: {
  [key: string]: RedeemItnRewardsStep,
} = {
  CONFIGURATION: 'configuration',
  CONFIRMATION: 'confirmation',
  RESULT: 'result',
};

export const IS_RANKING_DATA_AVAILABLE = true;

export const IS_SATURATION_DATA_AVAILABLE = true;

export const EPOCH_COUNTDOWN_INTERVAL = 1 * 1000; // 1 second | unit: milliseconds;
