import { defineType, defineField } from 'sanity'

export const designSystemUser = defineType({
  name: 'designSystemUser',
  title: 'Design System User',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: 'hashedPin',
      title: 'Hashed PIN',
      type: 'string',
      readOnly: true,
      description: 'SHA-256 hash of the user PIN — never stored in plaintext',
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
    }),
    defineField({
      name: 'lastLoginAt',
      title: 'Last Login',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Registered',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: 'email', subtitle: 'displayName' },
  },
})
