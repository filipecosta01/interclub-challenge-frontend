import { schema } from 'normalizr'

export const member = new schema.Entity('members', {}, { idAttribute: 'id' })
