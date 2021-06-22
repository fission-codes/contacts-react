import React from "react"


export function Component(props) {
  if (!props.contact) throw new Error("Missing `contact` prop")

  const { address, label } = props.contact
  const blockchainNetworks = props.blockchainNetworks

  const info = (() => {
    if (isBlockchainAddress(address)) {
      const network = lookUpBlockchainNetwork(address, blockchainNetworks)

      return <dd>
        <p style={{ marginBottom: "1rem" }}>
          {address.accountAddress}<br />
          <span style={{ fontStyle: "italic", opacity: 0.5 }}>{network.label}</span>
        </p>
      </dd>
    }
  })()

  return <>
    <dt><strong>{label}</strong></dt>
    {info}
  </>
}


export function isBlockchainAddress(address) {
  return !!address.chainId
}


export function lookUpBlockchainNetwork(address, blockchainNetworks) {
  const [namespace, reference] = address.chainId.split(":")

  return (blockchainNetworks || {}).find(
    n => n.namespace === namespace && n.reference === reference
  )
}
