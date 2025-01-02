import { UIFieldServerComponent } from 'payload'
import React from 'react'

const FormData: UIFieldServerComponent = async ({ data }) => {
  const formData = data.submissionData as Record<string, any[]>
  console.log("Form Data",formData)
  const arrayFields = Object.entries(formData).filter(([_, value]) => Array.isArray(value))

  return (
    <div className="space-y-6">
      {arrayFields.map(([fieldName, items]) => (
        <div key={fieldName}>
          <h2 className="text-2xl font-bold mb-3 capitalize">{fieldName}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item: any, index: number) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-lg font-semibold">
                    {item.firstName && item.lastName && `${item.firstName} ${item.lastName}`}
                  </h3>
                  <div className="space-y-1">
                    {Object.entries(item).map(
                      ([key, value]) =>
                        key !== 'firstName' &&
                        key !== 'lastName' && (
                          <p key={key}>
                            <span className="capitalize font-bold">{key}</span>: {value as string}
                          </p>
                        ),
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FormData
