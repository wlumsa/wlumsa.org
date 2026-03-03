'use client'
import React, { useState, useRef } from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import type { UploadField } from './types'
import { Error as FieldError } from '../Error'

const HARD_MAX_MB = 10

export const Upload: React.FC<
  UploadField & {
    errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
    register: UseFormRegister<any & FieldValues>
    setValue: UseFormSetValue<any>
  }
> = ({ name, label, required: requiredFromProps, allowedFileTypes, maxFileSizeMB = 5, errors, register, setValue }) => {
  const [uploading, setUploading] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const effectiveMaxMB = Math.min(maxFileSizeMB ?? 5, HARD_MAX_MB)
  const effectiveMaxBytes = effectiveMaxMB * 1024 * 1024

  const acceptString =
    !allowedFileTypes || allowedFileTypes.length === 0 || allowedFileTypes.includes('*')
      ? undefined
      : allowedFileTypes.join(',')

  const handleFile = async (file: File) => {
    setUploadError(null)

    if (file.size > effectiveMaxBytes) {
      setUploadError(`File is too large. Maximum size is ${effectiveMaxMB}MB.`)
      return
    }

    setUploading(true)
    setUploadedFileName(file.name)

    try {
      // Step 1: get a presigned PUT URL from our API route (uses S3 credentials server-side).
      // The browser never touches Vercel during the actual upload — no timeout risk.
      const presignRes = await fetch('/api/upload-form-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type || 'application/octet-stream',
          sizeMB: file.size / 1024 / 1024,
        }),
      })

      if (!presignRes.ok) {
        const err = await presignRes.json().catch(() => ({})) as { error?: string }
        throw new Error(err.error ?? 'Could not prepare upload. Please try again.')
      }

      const { signedUrl, publicUrl } = await presignRes.json()

      // Step 2: PUT the file directly to Supabase S3 using the presigned URL.
      // This is a browser → Supabase request; no Vercel function is involved.
      const uploadRes = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
      })

      if (!uploadRes.ok) {
        throw new Error('Upload failed. Please try again.')
      }

      // Step 3: store the public URL as the field value
      setValue(name, publicUrl, { shouldValidate: true })
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed. Please try again.')
      setUploadedFileName(null)
      setValue(name, '', { shouldValidate: false })
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setUploadedFileName(null)
    setUploadError(null)
    setValue(name, '', { shouldValidate: true })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="mx-auto min-h-[12rem]">
      <div className="max-w-3xl">
        <label className="block text-xl md:text-2xl font-semibold text-slate-800 dark:text-base-content">
          {label}
          {requiredFromProps && <span className="text-red-700 dark:text-error"> *</span>}
        </label>
        <p className="mt-1 text-sm text-slate-500 dark:text-base-content/60">
          Max {effectiveMaxMB}MB{acceptString && ` · ${acceptString}`}
        </p>

        {/* Hidden input registered with RHF so required-validation works with trigger() */}
        <input type="hidden" {...register(name, { required: requiredFromProps })} />

        {uploadedFileName && !uploading ? (
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-green-200 dark:border-success/30 bg-green-50 dark:bg-success/10 px-4 py-3">
            <svg className="h-5 w-5 shrink-0 text-green-600 dark:text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="flex-1 truncate text-sm text-green-800 dark:text-success">{uploadedFileName}</span>
            <button
              type="button"
              onClick={handleRemove}
              className="shrink-0 text-xs text-slate-500 hover:text-slate-700 dark:text-base-content/60 dark:hover:text-base-content"
            >
              Remove
            </button>
          </div>
        ) : (
          <label
            className={`mt-4 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors
              ${uploading
                ? 'cursor-not-allowed border-slate-200 dark:border-base-300 bg-slate-50 dark:bg-base-300/10'
                : 'border-slate-300 dark:border-base-300 bg-slate-50 dark:bg-base-300/10 hover:border-primary hover:bg-primary/5'
              }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const file = e.dataTransfer.files[0]
              if (file && !uploading) handleFile(file)
            }}
          >
            <div className="flex flex-col items-center justify-center px-4 py-8">
              {uploading ? (
                <>
                  <span className="loading loading-spinner loading-md text-primary" />
                  <p className="mt-2 text-sm text-slate-500 dark:text-base-content/60">
                    Uploading {uploadedFileName}…
                  </p>
                </>
              ) : (
                <>
                  <svg className="mb-2 h-8 w-8 text-slate-400 dark:text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <p className="text-sm text-slate-500 dark:text-base-content/60">
                    <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                  </p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept={acceptString}
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFile(file)
              }}
            />
          </label>
        )}

        {uploadError && (
          <p className="mt-2 text-sm text-red-600 dark:text-error">{uploadError}</p>
        )}
        {requiredFromProps && errors[name] && <FieldError />}
      </div>
    </div>
  )
}
