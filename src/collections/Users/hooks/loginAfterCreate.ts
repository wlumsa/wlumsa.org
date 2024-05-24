import { CollectionAfterChangeHook } from 'payload/types'

export const loginAfterCreate: CollectionAfterChangeHook = async ({
  doc,
  req,
  req: { payload, body = {} },
  operation,
}) => {
  if (operation === 'create' && !req.user) {
    const { email, password } = body as { email: string, password: string };

    
    if (email && password) {
      const { user, token } = await payload.login({
        collection: 'users',
        data: { email, password },
        req,

      })

      return {
        ...doc,
        token,
        user,
      }
    }
  }

  return doc
}
