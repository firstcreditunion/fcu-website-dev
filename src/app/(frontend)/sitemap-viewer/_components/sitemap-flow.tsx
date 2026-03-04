'use client'

import * as React from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  BackgroundVariant,
  Panel,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import dagre from 'dagre'
import { Badge } from '@/components/ui/badge'
import { TreesIcon } from 'lucide-react'
import {
  LEVEL_COLORS,
  LEVEL_LABELS,
  type HeaderNavigation,
  type NodeLevel,
} from '../_types'
import { PageNode, type PageNodeData } from './page-node'
import Link from 'next/link'

const NODE_WIDTH = 200
const NODE_HEIGHT = 90

const nodeTypes = { pageNode: PageNode }

function buildNodesAndEdges(nav: HeaderNavigation) {
  const nodes: Node[] = []
  const edges: Edge[] = []

  const rootId = '__root__'
  nodes.push({
    id: rootId,
    type: 'pageNode',
    position: { x: 0, y: 0 },
    data: {
      label: 'firstcu.co.nz',
      url: '/',
      level: 'root' as NodeLevel,
      childCount: nav.mainNav?.length ?? 0,
    } satisfies PageNodeData,
    selectable: false,
    deletable: false,
  })

  if (!nav.mainNav) return layoutWithDagre(nodes, edges)

  for (const section of nav.mainNav) {
    const sectionId = `section-${section._key}`

    const groupCount = section.megaMenu?.length ?? 0
    const directLinkCount =
      section.megaMenu?.reduce((sum, g) => sum + (g.items?.length ?? 0), 0) ?? 0

    nodes.push({
      id: sectionId,
      type: 'pageNode',
      position: { x: 0, y: 0 },
      data: {
        label: section.label,
        url: section.url,
        level: 'section' as NodeLevel,
        childCount: groupCount > 0 ? directLinkCount : 0,
      } satisfies PageNodeData,
    })

    edges.push({
      id: `e-root-${sectionId}`,
      source: rootId,
      target: sectionId,
      type: 'smoothstep',
      style: { stroke: LEVEL_COLORS.root, strokeWidth: 2, opacity: 0.35 },
    })

    if (section.megaMenu) {
      for (const group of section.megaMenu) {
        const groupId = `group-${section._key}-${group._key}`

        nodes.push({
          id: groupId,
          type: 'pageNode',
          position: { x: 0, y: 0 },
          data: {
            label: group.title,
            url: section.url,
            level: 'group' as NodeLevel,
            childCount: group.items?.length ?? 0,
          } satisfies PageNodeData,
        })

        edges.push({
          id: `e-${sectionId}-${groupId}`,
          source: sectionId,
          target: groupId,
          type: 'smoothstep',
          style: { stroke: LEVEL_COLORS.section, strokeWidth: 1.5, opacity: 0.3 },
        })

        if (group.items) {
          for (const link of group.items) {
            const linkId = `link-${section._key}-${group._key}-${link._key}`
            const isExternal = link.linkType === 'external'

            nodes.push({
              id: linkId,
              type: 'pageNode',
              position: { x: 0, y: 0 },
              data: {
                label: link.label,
                url: isExternal ? (link.externalUrl ?? '') : (link.url ?? ''),
                level: 'page' as NodeLevel,
                isExternal,
              } satisfies PageNodeData,
            })

            edges.push({
              id: `e-${groupId}-${linkId}`,
              source: groupId,
              target: linkId,
              type: 'smoothstep',
              style: { stroke: LEVEL_COLORS.group, strokeWidth: 1.5, opacity: 0.3 },
            })
          }
        }
      }
    }
  }

  if (nav.utilityNav) {
    const { primaryAction, secondaryAction } = nav.utilityNav

    if (primaryAction) {
      const id = 'utility-primary'
      nodes.push({
        id,
        type: 'pageNode',
        position: { x: 0, y: 0 },
        data: {
          label: primaryAction.label,
          url: primaryAction.url,
          level: 'page' as NodeLevel,
        } satisfies PageNodeData,
      })
      edges.push({
        id: `e-root-${id}`,
        source: rootId,
        target: id,
        type: 'smoothstep',
        style: {
          stroke: LEVEL_COLORS.root,
          strokeWidth: 1.5,
          strokeDasharray: '6 3',
          opacity: 0.35,
        },
      })
    }

    if (secondaryAction) {
      const id = 'utility-secondary'
      nodes.push({
        id,
        type: 'pageNode',
        position: { x: 0, y: 0 },
        data: {
          label: secondaryAction.label,
          url: secondaryAction.url ?? '',
          level: 'page' as NodeLevel,
          isExternal: true,
        } satisfies PageNodeData,
      })
      edges.push({
        id: `e-root-${id}`,
        source: rootId,
        target: id,
        type: 'smoothstep',
        style: {
          stroke: LEVEL_COLORS.root,
          strokeWidth: 1.5,
          strokeDasharray: '6 3',
          opacity: 0.35,
        },
      })
    }
  }

  return layoutWithDagre(nodes, edges)
}

function layoutWithDagre(nodes: Node[], edges: Edge[]) {
  const g = new dagre.graphlib.Graph()
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({
    rankdir: 'TB',
    nodesep: 50,
    ranksep: 70,
    marginx: 40,
    marginy: 40,
  })

  for (const node of nodes) {
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT })
  }

  for (const edge of edges) {
    g.setEdge(edge.source, edge.target)
  }

  dagre.layout(g)

  const positioned = nodes.map((node) => {
    const pos = g.node(node.id)
    return {
      ...node,
      position: {
        x: (pos?.x ?? 0) - NODE_WIDTH / 2,
        y: (pos?.y ?? 0) - NODE_HEIGHT / 2,
      },
    }
  })

  return { nodes: positioned, edges }
}

interface SitemapFlowProps {
  navigation: HeaderNavigation | null
}

export function SitemapFlow({ navigation }: SitemapFlowProps) {
  const { nodes: layoutNodes, edges: layoutEdges } = React.useMemo(
    () =>
      navigation ? buildNodesAndEdges(navigation) : { nodes: [], edges: [] },
    [navigation],
  )

  const [nodes, , onNodesChange] = useNodesState(layoutNodes)
  const [edges, , onEdgesChange] = useEdgesState(layoutEdges)

  const stats = React.useMemo(() => {
    const sections = nodes.filter(
      (n) => (n.data as PageNodeData).level === 'section',
    ).length
    const pages = nodes.filter(
      (n) => (n.data as PageNodeData).level === 'page',
    ).length
    const groups = nodes.filter(
      (n) => (n.data as PageNodeData).level === 'group',
    ).length
    return { sections, groups, pages, total: nodes.length - 1 }
  }, [nodes])

  return (
    <div className='flex h-[calc(100vh-64px)] flex-col'>
      {/* Toolbar */}
      <div className='flex items-center justify-between border-b border-border bg-card/50 px-4 py-2.5 backdrop-blur-sm'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2'>
            <TreesIcon className='size-5 text-primary' />
            <h1 className='text-lg font-bold tracking-tight'>Sitemap</h1>
          </div>
          <div className='hidden items-center gap-1.5 sm:flex'>
            <Badge variant='outline' className='gap-1 text-[10px]'>
              <span
                className='inline-block size-1.5 rounded-full'
                style={{ backgroundColor: LEVEL_COLORS.section }}
              />
              {stats.sections} sections
            </Badge>
            <Badge variant='outline' className='gap-1 text-[10px]'>
              <span
                className='inline-block size-1.5 rounded-full'
                style={{ backgroundColor: LEVEL_COLORS.group }}
              />
              {stats.groups} groups
            </Badge>
            <Badge variant='outline' className='gap-1 text-[10px]'>
              <span
                className='inline-block size-1.5 rounded-full'
                style={{ backgroundColor: LEVEL_COLORS.page }}
              />
              {stats.pages} pages
            </Badge>
            <Badge variant='secondary' className='text-[10px]'>
              {stats.total} total
            </Badge>
          </div>
        </div>

        <a
          href='/studio/structure/headerNavigation'
          target='_blank'
          rel='noopener noreferrer'
          className='text-xs font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground'
        >
          Edit in Studio
        </a>
      </div>

      {/* Canvas */}
      <div className='flex-1'>
        {!navigation || !navigation.mainNav?.length ? (
          <div className='flex h-full flex-col items-center justify-center gap-4 text-center'>
            <div className='rounded-2xl bg-muted/50 p-6'>
              <TreesIcon className='mx-auto size-12 text-muted-foreground/40' />
            </div>
            <div>
              <h2 className='text-lg font-semibold'>No navigation data</h2>
              <p className='mt-1 max-w-sm text-sm text-muted-foreground'>
                Add navigation items in{' '}
                <Link
                  href='/studio/structure/headerNavigation'
                  className='underline'
                >
                  Sanity Studio
                </Link>{' '}
                to see them visualised here.
              </p>
            </div>
          </div>
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.1}
            maxZoom={2}
            proOptions={{ hideAttribution: true }}
            className='bg-background'
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color='hsl(var(--border) / 0.5)'
            />
            <Controls
              showInteractive={false}
              className='rounded-xl! border-border! bg-card! shadow-lg!'
            />
            <MiniMap
              nodeColor={(node) => {
                const d = node.data as PageNodeData
                return LEVEL_COLORS[d.level] ?? '#6b7280'
              }}
              maskColor='hsl(var(--background) / 0.8)'
              className='rounded-xl! border-border! bg-card! shadow-lg!'
            />
            <Panel position='bottom-center' className='mb-2'>
              <div className='flex items-center gap-3 rounded-full border border-border bg-card/90 px-4 py-1.5 text-[10px] font-medium shadow-lg backdrop-blur-sm'>
                {(Object.entries(LEVEL_LABELS) as [NodeLevel, string][]).map(
                  ([key, label]) => (
                    <span
                      key={key}
                      className='inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5'
                      style={{
                        backgroundColor: `${LEVEL_COLORS[key]}12`,
                        color: LEVEL_COLORS[key],
                      }}
                    >
                      <span
                        className='inline-block size-1.5 rounded-full'
                        style={{ backgroundColor: LEVEL_COLORS[key] }}
                      />
                      {label}
                    </span>
                  ),
                )}
                <span className='inline-flex items-center gap-1.5 rounded-md bg-muted px-1.5 py-0.5 text-muted-foreground'>
                  <span className='inline-block size-1.5 rounded-full border border-dashed border-current' />
                  Utility
                </span>
              </div>
            </Panel>
          </ReactFlow>
        )}
      </div>
    </div>
  )
}
