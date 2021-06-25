import React, { useEffect, useState } from "react"

import { Component as Contact } from "./Contact.jsx"
import * as path from "webnative/dist/path"


export const DEFAULT_PATH = path.file(
  path.Branch.Private, "Documents", "Contacts", "Library.json"
)


export const DEFAULT_BLOCKCHAIN_NETWORKS_PATH = path.file(
  path.Branch.Private, "Documents", "Contacts", "Blockchain Networks.json"
)


export function Component({
  blockchainNetworksPath = DEFAULT_BLOCKCHAIN_NETWORKS_PATH,
  fileSystem,
  itemComponent = Contact,
  libraryPath = DEFAULT_PATH,
  listElement = "dl",
  loadingComponent = Loading
}) {
  if (!fileSystem) throw new Error("You must provide a `fileSystem`")

  const [contacts, setContacts] = useState(null)
  const [blockchainNetworks, setBlockchainNetworks] = useState(null)

  if (!contacts) {
    fileSystem.exists(libraryPath)
      .then(exists => exists ? fileSystem.read(libraryPath) : "[]")
      .then(a => JSON.parse(a.toString()))
      .then(setContacts)
      .catch(err => {
        console.error(err)
        setContacts([])
      })
  }

  if (!blockchainNetworks) {
    fileSystem.exists(blockchainNetworksPath)
      .then(exists => exists ? fileSystem.read(blockchainNetworksPath) : "{}")
      .then(a => JSON.parse(a.toString()))
      .then(setBlockchainNetworks)
      .catch(err => {
        console.error(err)
        setBlockchainNetworks({})
      })
  }

  if (contacts && blockchainNetworks) {
    const items = contacts.sort(
      (a, b) => a.label.localeCompare(b.label)
    ).map(contact => {
      return React.createElement(
        itemComponent,
        { key: contact.uuid, blockchainNetworks, contact: contact }
      )
    })

    return React.createElement(listElement, {}, items)
  } else {
    return React.createElement(loadingComponent)
  }
}


export function Loading() {
  return <div>Loading contacts</div>
}
