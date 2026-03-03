'use client'

import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from 'motion/react'

export function ResearchDocumentSection({ content }: { content: string }) {
  return (
    <motion.section
      id='architecture-research'
      className='scroll-mt-8 pb-20'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className='mb-8'>
        <h2 className='text-2xl font-bold tracking-tight text-foreground'>
          Architecture Research
        </h2>
        <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
          The full research document covering component architecture, Sanity
          schema patterns, page builder design, and implementation phases.
        </p>
      </div>

      <div className='rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10'>
        <article className='prose prose-sm max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-h1:text-2xl prose-h2:mt-10 prose-h2:text-xl prose-h3:text-base prose-p:text-muted-foreground prose-a:text-fcu-primary-900 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-xs prose-code:font-medium prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:bg-foreground prose-pre:text-background prose-table:text-xs prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-foreground prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2 prose-td:text-muted-foreground prose-hr:border-border prose-li:text-muted-foreground prose-blockquote:border-fcu-primary-900/30 prose-blockquote:text-muted-foreground prose-img:rounded-xl'>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </div>
    </motion.section>
  )
}
