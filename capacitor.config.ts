// Configuration Capacitor pour le packaging iOS de SmartWash.
// Le CLI Capacitor lira ce fichier (aucun import TypeScript n'est nécessaire).

const config = {
  appId: "com.matthis.smartwash",
  appName: "SmartWash",
  webDir: "dist",
  bundledWebRuntime: false,
  ios: {
    // Couleur de fond utilisée par le webview au démarrage.
    backgroundColor: "#f7f5f0",
    contentInset: "automatic",
  },
};

export default config;

