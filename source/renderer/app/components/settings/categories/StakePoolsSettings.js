// @flow
import React, { Component } from 'react';
import { map } from 'lodash';
import { Select } from 'react-polymorph/lib/components/Select';
import { SelectSkin } from 'react-polymorph/lib/skins/simple/SelectSkin';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import { isValidUrl } from '../../../utils/validations';
import InlineEditingInput from '../../widgets/forms/InlineEditingInput';
import styles from './StakePoolsSettings.scss';
import {
  SMASH_SERVERS_LIST,
  SMASH_SERVER_TYPES,
} from '../../../config/stakingConfig';
import LocalizableError from '../../../i18n/LocalizableError';
import type { SmashServerType } from '../../../types/stakingTypes';

const messages = defineMessages({
  smashSelectLabel: {
    id: 'settings.stakePools.smash.select.label',
    defaultMessage: '!!!Off-chain metadata server (SMASH)',
    description:
      'smashSelectLabel for the "Smash" selection on the Stake Pools settings page.',
  },
  smashSelectCustomServer: {
    id: 'settings.stakePools.smash.select.placeholder',
    defaultMessage: '!!!Custom server',
    description:
      'smashSelectCustomServer option for the "Smash" selection on the Stake Pools settings page.',
  },
  smashURLInputLabel: {
    id: 'settings.stakePools.smashUrl.input.label',
    defaultMessage: '!!!SMASH server URL',
    description:
      'smashURLInputLabel for the "Smash Custom Server" selection on the Stake Pools settings page.',
  },
  smashUrlInputPlaceholder: {
    id: 'settings.stakePools.smashUrl.input.placeholder',
    defaultMessage: '!!!Enter custom server URL',
    description:
      'smashUrlInputPlaceholder for the "Smash Custom Server" selection on the Stake Pools settings page.',
  },
  smashUrlInputInvalidUrl: {
    id: 'settings.stakePools.smashUrl.input.invalidUrl',
    defaultMessage: '!!!Invalid URL',
    description:
      'smashUrlInputInvalidUrl for the "Smash Custom Server" selection on the Stake Pools settings page.',
  },
});

type Props = {
  smashServerType: SmashServerType,
  smashServerUrl?: string,
  smashServerUrlError?: ?LocalizableError,
  onSelectSmashServerType: Function,
  onSelectSmashServerUrl: Function,
  isLoading?: boolean,
};

type State = {
  lastValidServerUrl: ?string,
  lastValidServerType: SmashServerType,
};

@observer
export default class StakePoolsSettings extends Component<Props, State> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  static getDerivedStateFromProps(
    {
      smashServerUrl: nextValidServerUrl,
      smashServerType: nextValidServerType,
    }: Props,
    { lastValidServerUrl }: State
  ) {
    // The `smashServerUrl` prop only changes when it's a valid server
    // unless it's empty
    // so we update the `lastValidServerType` and `lastValidServerUrl` states
    if (nextValidServerUrl && nextValidServerUrl !== lastValidServerUrl) {
      return {
        lastValidServerUrl: nextValidServerUrl,
        lastValidServerType: nextValidServerType,
      };
    }
    return null;
  }

  state = {
    /* eslint-disable react/no-unused-state */
    // Disabling eslint due to a [known issue](https://github.com/yannickcr/eslint-plugin-react/issues/2061)
    // `smashServerUrl` is actually used in the `getDerivedStateFromProps` method

    // Last valid type and url
    lastValidServerUrl: this.props.smashServerUrl,
    lastValidServerType: this.props.smashServerType,
  };

  componentWillUnmount() {
    // In case the `lastValidServerUrl` prop is empty
    // we revert to the last valid state
    const {
      smashServerType,
      smashServerUrl,
      onSelectSmashServerType,
    } = this.props;
    const { lastValidServerType } = this.state;

    if (smashServerType === SMASH_SERVER_TYPES.CUSTOM && !smashServerUrl) {
      onSelectSmashServerType(lastValidServerType);
    }
  }

  handleSubmit = (url: string) => {
    if (isValidUrl(url || '')) {
      this.props.onSelectSmashServerUrl(url);
    }
  };

  handleIsValid = (url: string) => url === '' || isValidUrl(url);

  render() {
    const {
      smashServerType,
      smashServerUrl,
      smashServerUrlError,
      onSelectSmashServerType,
      isLoading,
    } = this.props;
    const { intl } = this.context;

    const smashSelectOptions = [
      ...map(SMASH_SERVERS_LIST, ({ name: label }, value) => ({
        label,
        value,
      })),
      {
        label: intl.formatMessage(messages.smashSelectCustomServer),
        value: SMASH_SERVER_TYPES.CUSTOM,
      },
    ];

    const errorMessage = smashServerUrlError
      ? intl.formatMessage(smashServerUrlError)
      : null;

    return (
      <div className={styles.component}>
        <Select
          label={intl.formatMessage(messages.smashSelectLabel)}
          value={smashServerType}
          options={smashSelectOptions}
          onChange={(type: SmashServerType) => {
            onSelectSmashServerType(type);
          }}
          skin={SelectSkin}
          className={styles.select}
          optionHeight={50}
        />
        <InlineEditingInput
          className={styles.smashServerUrl}
          label={intl.formatMessage(messages.smashURLInputLabel)}
          value={smashServerUrl || ''}
          placeholder={intl.formatMessage(messages.smashUrlInputPlaceholder)}
          onSubmit={this.handleSubmit}
          isValid={this.handleIsValid}
          valueErrorMessage={intl.formatMessage(
            messages.smashUrlInputInvalidUrl
          )}
          errorMessage={errorMessage}
          readOnly={isLoading || smashServerType !== SMASH_SERVER_TYPES.CUSTOM}
          isLoading={isLoading}
        />
      </div>
    );
  }
}
