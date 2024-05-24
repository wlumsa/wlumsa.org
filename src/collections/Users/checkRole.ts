
import type { User } from '../../payload-types'

export const checkRole = (allRoles: User['roles'] = [], user?: User): boolean => {
  if (user) {
    if (
      allRoles && allRoles.some(role => { // Add null check for allRoles
        return user?.roles?.some(individualRole => {
          return individualRole === role
        })
      })
    )
      return true
  }

  return false
}
