import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main.ts', // The entry point for the Electron main process
        tsconfig: 'tsconfig.json',  // Specify the TypeScript config file for the main process
        onstart: (options) => {
          if (process.env.VITE_DEV_SERVER_URL) {
            options.startup();
          }
        },
      },
    }),
  ],
  build: {
    outDir: 'dist',
  },
});








// # Step 1: Set up the Vite Project
// # First, create a Vite project with TypeScript and React
// npm create vite@latest price-detective --template react-ts
// cd price-detective

// # Step 2: Install dependencies for Electron and Vite Plugin
// npm install electron concurrently cross-env vite-plugin-electron ts-node @types/node --save-dev

// # Step 3: Create the required project structure
// mkdir -p electron

// # Create main.ts for the Electron main process
// cat <<EOL > electron/main.ts
// import { app, BrowserWindow } from 'electron';
// import * as path from 'path';

// function createWindow() {
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'), // Note: Use 'preload.js' as this file might need to be transpiled first
//       nodeIntegration: true,
//     },
//   });

//   if (process.env.VITE_DEV_SERVER_URL) {
//     mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
//   } else {
//     mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
//   }
// }

// // Listen for the 'ready' event to create the window
// app.on('ready', createWindow);

// // Listen for window-all-closed event
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// // Listen for 'activate' event to recreate window
// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });
// EOL

// # Step 4: Create tsconfig.json for TypeScript Configuration
// cat <<EOL > tsconfig.json
// {
//   "compilerOptions": {
//     "target": "ES2020",
//     "module": "CommonJS",
//     "outDir": "dist",
//     "rootDir": ".",
//     "strict": true,
//     "esModuleInterop": true,
//     "moduleResolution": "node",
//     "jsx": "react-jsx",
//     "allowJs": true,
//     "resolveJsonModule": true,
//     "skipLibCheck": true,
//     "forceConsistentCasingInFileNames": true
//   },
//   "include": [
//     "src",
//     "electron"
//   ],
//   "exclude": [
//     "node_modules"
//   ]
// }
// EOL

// # Step 5: Adjust package.json scripts
// cat <<EOL > package.json
// {
//   "name": "price-detective",
//   "private": true,
//   "version": "0.0.0",
//   "main": "electron/main.ts",
//   "scripts": {
//     "dev": "cross-env VITE_DEV_SERVER_URL=http://localhost:5173 concurrently \"ts-node -T electron/main.ts\" \"vite\"",
//     "build": "tsc -b && vite build",
//     "lint": "eslint .",
//     "preview": "vite preview"
//   },
//   "dependencies": {
//     "react": "^18.3.1",
//     "react-dom": "^18.3.1",
//     "electron": "^33.2.0"
//   },
//   "devDependencies": {
//     "@eslint/js": "^9.13.0",
//     "@types/react": "^18.3.12",
//     "@types/react-dom": "^18.3.1",
//     "@vitejs/plugin-react": "^4.3.3",
//     "concurrently": "^9.1.0",
//     "cross-env": "^7.0.3",
//     "vite-plugin-electron": "^0.1.0",
//     "ts-node": "^10.0.0",
//     "@types/node": "^20.0.0",
//     "eslint": "^9.13.0",
//     "eslint-plugin-react-hooks": "^5.0.0",
//     "eslint-plugin-react-refresh": "^0.4.14",
//     "globals": "^15.11.0",
//     "typescript": "~5.6.2",
//     "typescript-eslint": "^8.11.0",
//     "vite": "^5.4.10"
//   }
// }
// EOL

// # Step 6: Configure Electron Builder (optional)
// cat <<EOL > electron-builder.json
// {
//   "appId": "com.price.detective",
//   "productName": "Price Detective",
//   "files": [
//     "dist/**/*",
//     "electron/**/*"
//   ],
//   "directories": {
//     "buildResources": "resources"
//   }
// }
// EOL

// # Step 7: Update viteReact.config.ts in root 
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import electron from 'vite-plugin-electron';

// export default defineConfig({
//   plugins: [
//     react(),
//     electron({
//       main: {
//         entry: 'electron/main.ts', // The entry point for the Electron main process
//         tsconfig: 'tsconfig.json',  // Specify the TypeScript config file for the main process
//         onstart: (options) => {
//           if (process.env.VITE_DEV_SERVER_URL) {
//             options.startup();
//           }
//         },
//       },
//     }),
//   ],
//   build: {
//     outDir: 'dist',
//   },
// });

// # Step 8: Run the development environment
// npm run dev
// // I am trying to setup vite typescript electron project it should be using ts-node and vite-plugin-electron for hotreloading on the backend
