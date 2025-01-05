import { UIFieldServerComponent } from 'payload'
import React from 'react'

const FormData: UIFieldServerComponent = async ({ data }) => {
  const formData = data.submissionData as Record<string, any>
  
  console.log("Raw Form Data:", JSON.stringify(formData, null, 2))
  
  // Handle both array and non-array fields
  const fields = Object.entries(formData)

  return (
    <div className="space-y-6">
      {/* Debug view */}
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h3 className="text-sm font-mono mb-2">Raw Form Data:</h3>
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>

      {/* Render all fields */}
      {fields.map(([fieldName, value]) => (
        <div key={fieldName}>
          <h2 className="text-2xl font-bold mb-3 capitalize">{fieldName}</h2>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <p>
                 {
                  Array.isArray(value) 
                    ? JSON.stringify(value, null, 2)
                    : String(value)
                }
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FormData
