// @flow
import { observable, action } from 'mobx';
import type Store from './lib/Store';
import AddressesStore from './AddressesStore';
import AppStore from './AppStore';
import AppUpdateStore from './AppUpdateStore';
import NetworkStatusStore from './NetworkStatusStore';
import NewsFeedStore from './NewsFeedStore';
import ProfileStore from './ProfileStore';
import SidebarStore from './SidebarStore';
import StakingStore from './StakingStore';
import TransactionsStore from './TransactionsStore';
import UiDialogsStore from './UiDialogsStore';
import UiNotificationsStore from './UiNotificationsStore';
import WalletsStore from './WalletsStore';
import WalletsLocalStore from './WalletsLocalStore';
import WalletBackupStore from './WalletBackupStore';
import WalletMigrationStore from './WalletMigrationStore';
import WalletSettingsStore from './WalletSettingsStore';
import WindowStore from './WindowStore';
import VotingStore from './VotingStore';

export const storeClasses = {
  addresses: AddressesStore,
  app: AppStore,
  appUpdate: AppUpdateStore,
  networkStatus: NetworkStatusStore,
  newsFeed: NewsFeedStore,
  profile: ProfileStore,
  sidebar: SidebarStore,
  staking: StakingStore,
  transactions: TransactionsStore,
  uiDialogs: UiDialogsStore,
  uiNotifications: UiNotificationsStore,
  wallets: WalletsStore,
  walletsLocal: WalletsLocalStore,
  walletBackup: WalletBackupStore,
  walletMigration: WalletMigrationStore,
  walletSettings: WalletSettingsStore,
  window: WindowStore,
  voting: VotingStore,
};

export type StoresMap = {
  addresses: AddressesStore,
  app: AppStore,
  appUpdate: AppUpdateStore,
  networkStatus: NetworkStatusStore,
  newsFeed: NewsFeedStore,
  profile: ProfileStore,
  router: Object,
  sidebar: SidebarStore,
  staking: StakingStore,
  transactions: TransactionsStore,
  uiDialogs: UiDialogsStore,
  uiNotifications: UiNotificationsStore,
  wallets: WalletsStore,
  walletsLocal: WalletsLocalStore,
  walletBackup: WalletBackupStore,
  walletMigration: WalletMigrationStore,
  walletSettings: WalletSettingsStore,
  window: WindowStore,
  voting: VotingStore,
};

let stores: ?StoresMap = null;
const storeNames = Object.keys(storeClasses);

// Helpers
function executeOnEveryStore(fn: (store: Store) => void) {
  storeNames.forEach((name) => {
    if (stores && stores[name]) fn(stores[name]);
  });
}

// Set up and return the stores for this app -> also used to reset all stores to defaults
export default action((api, actions, router): StoresMap => {
  function createStoreInstanceOf<T: Store>(StoreSubClass: Class<T>): T {
    return new StoreSubClass(api, actions);
  }

  // Teardown existing stores
  if (stores) executeOnEveryStore((store) => store.teardown());

  // Create fresh instances of all stores
  stores = observable({
    uiNotifications: createStoreInstanceOf(UiNotificationsStore),
    addresses: createStoreInstanceOf(AddressesStore),
    app: createStoreInstanceOf(AppStore),
    networkStatus: createStoreInstanceOf(NetworkStatusStore),
    newsFeed: createStoreInstanceOf(NewsFeedStore),
    appUpdate: createStoreInstanceOf(AppUpdateStore),
    profile: createStoreInstanceOf(ProfileStore),
    router,
    sidebar: createStoreInstanceOf(SidebarStore),
    staking: createStoreInstanceOf(StakingStore),
    transactions: createStoreInstanceOf(TransactionsStore),
    uiDialogs: createStoreInstanceOf(UiDialogsStore),
    wallets: createStoreInstanceOf(WalletsStore),
    walletsLocal: createStoreInstanceOf(WalletsLocalStore),
    walletBackup: createStoreInstanceOf(WalletBackupStore),
    walletMigration: createStoreInstanceOf(WalletMigrationStore),
    walletSettings: createStoreInstanceOf(WalletSettingsStore),
    window: createStoreInstanceOf(WindowStore),
    voting: createStoreInstanceOf(VotingStore),
  });
  // Configure and initialize all stores
  executeOnEveryStore((store) => {
    if (stores) store.configure(stores);
  });
  executeOnEveryStore((store) => store.initialize());
  return stores;
});
