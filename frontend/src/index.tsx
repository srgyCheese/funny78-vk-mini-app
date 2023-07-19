import React from "react"
import ReactDOM from "react-dom"
import bridge from "@vkontakte/vk-bridge"
import App from "./App"
import AppProviders from "./AppProviders"

// Init VK  Mini App
bridge.send("VKWebAppInit")

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
)

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}) //runtime download
}
