import * as webnative from "webnative"
import React, { useState } from "react"
import ReactDOM from "react-dom"

import { SignInButton } from "@fission-suite/kit/components/react/buttons.jsx"
import { List } from "../../src/index.js"


// 🔐


const PERMISSIONS = {
  fs: {
    private: [ webnative.path.directory("Documents", "Contacts") ],
    public: []
  }
}



// 🚀


const node = document.getElementById("root")


ReactDOM.render(
  <Container>{Loader("⚡️")()}</Container>,
  node
)


webnative.initialise({
  permissions: PERMISSIONS

}).then(state => {
  ReactDOM.render(
    App({ authenticatedUsername: state.username, fs: state.fs }),
    node
  )

}).catch(err =>
  alert(err)

)



// APP


function App({ authenticatedUsername, fs }) {
  const signedInUsername = authenticatedUsername

  const content = signedInUsername
    ? <List fileSystem={fs} loadingComponent={Loader("💡")} />

    : <SignInButton
      className="bg-base-900 text-base-50 dark:bg-base-100 dark:text-base-900"
      onClick={() => webnative.redirectToLobby(PERMISSIONS)}
    />

  return <Container>{content}</Container>
}



// 🖼


function Container(props) {
  return <main className="bg-base-50 flex font-body items-center justify-center min-h-screen text-base text-base-900 dark:bg-base-900 dark:text-base-100">
    {props.children}
  </main>
}


function Loader(emoji) {
  return () => <div><span className="italic">Energizing</span> {emoji}</div>
}
