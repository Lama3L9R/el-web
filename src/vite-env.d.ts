/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly EL_API_PROD_ADDRESS: string

}
  
interface ImportMeta {
  readonly env: ImportMetaEnv
}