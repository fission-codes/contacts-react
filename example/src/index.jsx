import * as webnative from "webnative"
import React, { useState } from "react"
import ReactDOM from "react-dom"

import { SignInButton } from "fission-kit/components/react"
import { Contact } from "../../src/index.js"


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
  <Container><Loader /></Container>,
  node
)


webnative.initialise({
  permissions: PERMISSIONS

}).then(state => {
  ReactDOM.render(
    App({ authenticatedUsername: state.username }),
    node
  )

}).catch(err =>
  alert(err)

)



// APP


function App({ authenticatedUsername }) {
  const signedInUsername = authenticatedUsername

  const content = signedInUsername
    ? <div>
      TODO: Render contacts with Contact component
    </div>

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


function Loader() {
  return <div>
    Loading ⚡️
  </div>
}
