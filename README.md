<div align="center">
  <img src="https://github.com/fission-codes/kit/blob/main/images/logo-icon-coloured.png?raw=true" width="100" />

  <h1>Contacts React</h1>

[![Build Status](https://travis-ci.org/fission-suite/contacts-react.svg?branch=master)](https://travis-ci.org/fission-suite/contacts-react)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/fission-suite/blob/master/LICENSE)
[![Maintainability](https://api.codeclimate.com/v1/badges/44fb6a8a0cfd88bc41ef/maintainability)](https://codeclimate.com/github/fission-suite/contacts-react/maintainability)
[![Built by FISSION](https://img.shields.io/badge/⌘-Built_by_FISSION-purple.svg)](https://fission.codes)
[![Discord](https://img.shields.io/discord/478735028319158273.svg)](https://discord.gg/zAQBDEq)
[![Discourse](https://img.shields.io/discourse/https/talk.fission.codes/topics)](https://talk.fission.codes)

</div>

React components for working with contacts data.

## Contacts Data

These components assume contacts in the form of:

```json
{
  "uuid": "a58bca0d-a38f-42a1-8b33-bcd53027881c",
  "label": "Main ETH account",
  "notes": "💰",
  "createdAt": "2021-05-26T16:03:03Z",
  "modifiedAt": "2021-05-26T16:03:03Z",
  "address": {
    "accountAddress": "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
    "chainId": "eip155:1"
  }
}
```

You can find the JSON schema in the [repo](https://github.com/fission-suite/contacts/blob/main/src/Schemas/Dawn/Contact.json) from the contacts app, which is live at [contacts.fission.app](https://contacts.fission.app/). In the app you can view and manage your contacts. By default it assumes the contacts data in the `private/Documents/Contacts/` directory.

## Components

To illustrate how easy it is to work with the [webnative](https://github.com/fission-suite/webnative) filesystem, we're making a few React components to easily render contacts in your React app.

```js
import { List } from '@fission-suite/contacts-react'

webnative.initialise({ ... }).then(state => {
  if (state.fs) {
    return <List fileSystem={state.fs} />
  }
})
```

`List` component properties:

```js
{
  blockchainNetworksPath,       // default: @fission-suite/contacts-react/List.DEFAULT_BLOCKCHAIN_NETWORKS_PATH
  emptyStateComponent,          // default: @fission-suite/contacts-react/List.EmptyState
  fileSystem,                   // REQUIRED
  itemComponent,                // default: @fission-suite/contacts-react/Contact.Contact
  libraryPath,                  // default: @fission-suite/contacts-react/List.DEFAULT_PATH
  listElement,                  // default: "dl"
  loadingComponent,             // default: @fission-suite/contacts-react/List.Loading
}
```

`Contact` component properties:

```js
{
  blockchainNetworks, // default: {}, passed from the default `List` component
    contact; // REQUIRED
}
```

The default `Contact` and loading components are unstyled, so most likely you'll want to provide styled components instead.

```js
import {
  isBlockchainAddress,
  lookUpBlockchainNetwork,
} from "@fission-suite/contacts-react/Contact";

<List
  fileSystem={state.fs}
  listElement="ol"
  emptyStateComponent={<div>Nothing here yet.</div>}
  loadingComponent={() => <div>Loading …</div>}
  itemComponent={({ blockchainNetworks, contact }) => {
    if (isBlockchainAddress(contact.address)) {
      const network = lookUpBlockchainNetwork(
        contact.address,
        blockchainNetworks
      );
      return (
        <li>
          {contact.address.accountAddress}
          {network.label}
        </li>
      );
    }

    return <></>;
  }}
/>;
```

## Example

There is an example in the [example](example/) directory, which is also available at [contacts-react.fission.app](https://contacts-react.fission.app). That also serves as an example for the React components from the [Fission UI Kit](https://github.com/fission-suite/kit).
