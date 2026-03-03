export type UploadField = {
  blockType: 'upload'
  name: string
  label?: string
  width?: number
  required?: boolean
  allowedFileTypes?: string[]
  maxFileSizeMB?: number
}
