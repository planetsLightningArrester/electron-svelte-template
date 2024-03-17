import path from 'path'
import { MakerZIP } from '@electron-forge/maker-zip'
import { type ForgeConfig } from '@electron-forge/shared-types'
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives'

const config: ForgeConfig = {
  packagerConfig: {
    name: 'Electron Svelte template',
    asar: true,
    icon: path.join(__dirname, 'src', 'images', 'icon'),
    executableName: 'electron_svelte_template',
  },
  rebuildConfig: {},
  makers: [new MakerZIP({})],
  plugins: [new AutoUnpackNativesPlugin({})],
}

export default config
