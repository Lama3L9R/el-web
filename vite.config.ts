import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, parse } from 'path'
import fs from 'fs'

const sourceDirectory = resolve(__dirname, 'src')

export default defineConfig({
  root: sourceDirectory,
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        ...(() => {
          const scanFolder: (folder: string, accu: string[]) => void = (folder, accu) => {
              const files = fs.readdirSync(folder).map(f => resolve(folder, f))

              files.filter(f => fs.lstatSync(f).isFile()).forEach(f => accu.push(f))
              files.filter(f => fs.lstatSync(f).isDirectory()).forEach(f => scanFolder(f, accu))
          }

          const files: string[] = []
          scanFolder('./src', files)
          const output: any = {}

          for(const i of files.filter((it) => it.endsWith(".html"))) {
            output[parse(i).name] = i 
          }

          return output
        })()
      }
    }
  }
})
