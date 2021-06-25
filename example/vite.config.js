import reactRefresh from "@vitejs/plugin-react-refresh"


export default {
  plugins: [
    reactRefresh()
  ],
  build: {
    outDir: "dist",
    target: "es2020"
  }
}
