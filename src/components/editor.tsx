'use client'

import * as React from 'react'
import { GripVertical } from 'lucide-react'
import { Reorder, useDragControls } from 'framer-motion'
import { BlockContent } from './block-content'
import { EditorBlock, EditorColumn } from '../lib/types'

const iconSize = 'h-4 w-4'

export default function Editor() {
  const [blocks, setBlocks] = React.useState<EditorBlock[]>([
    { id: '1', type: 'text', content: '' },
  ])
  const [showCommand, setShowCommand] = React.useState(false)
  const [activeBlockId, setActiveBlockId] = React.useState<string>('1')
  const dragControls = useDragControls()

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    blockId: string,
    columnId?: string,
  ) => {
    if (e.key === '/' && !showCommand) {
      e.preventDefault()
      setShowCommand(true)
      setActiveBlockId(blockId)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const newBlock: EditorBlock = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'text',
        content: '',
      }

      setBlocks((prev) => {
        const currentIndex = prev.findIndex((block) => block.id === blockId)
        const newBlocks = [...prev]
        newBlocks.splice(currentIndex + 1, 0, newBlock)
        return newBlocks
      })
    }
  }
  const handleContentChange = (id: string, content: string) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, content } : block)),
    )
  }

  const handleColumnChange = (blockId: string, columns: EditorColumn[]) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, columns } : block,
      ),
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Reorder.Group
        axis="y"
        values={blocks}
        onReorder={setBlocks}
        className="space-y-2"
      >
        {blocks.map((block) => (
          <Reorder.Item
            key={block.id}
            value={block}
            dragListener={false} // Disable default drag listener
            dragControls={dragControls} // Use custom drag controls
            className="flex items-center gap-2 group relative"
          >
            <div
              className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
              style={{ cursor: 'grab' }}
              onPointerDown={(e) => dragControls.start(e)} // Start dragging from the icon
            >
              <GripVertical className="h-4 w-4 text-gray-600 hover:text-gray-800" />
            </div>
            <div className="flex-1">
              <BlockContent
                block={block}
                onChange={(content) => handleContentChange(block.id, content)}
                onKeyDown={(e, columnId) =>
                  handleKeyDown(e, block.id, columnId)
                }
                onColumnChange={(newColumns) =>
                  handleColumnChange(block.id, newColumns)
                }
              />
            </div>

          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}
