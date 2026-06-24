'use client';

import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function ArchitectureNode({ data, selected }: any) {
  return (
    <div
      className={
        'group relative min-w-[180px] text-lg text-zinc-100 transition-transform duration-150 ' +
        (selected ? 'scale-[1.04] drop-shadow-[0_0_30px_rgba(56,189,248,0.7)]' : '')
      }
    >
      <div className="pointer-events-none absolute inset-0 translate-x-[8px] translate-y-[8px] rounded-xl border border-white/5 bg-zinc-950/70" />
      <div className="pointer-events-none absolute inset-0 translate-x-[16px] translate-y-[16px] rounded-xl border border-white/10 bg-zinc-900/60" />

      <div className="relative rounded-xl border border-white/20 bg-zinc-900/95 px-6 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.7)]">
        {data?.tag && (
          <span className="absolute -top-3 left-4 rounded-full border border-white/20 bg-black/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-400">
            {data.tag}
          </span>
        )}
        <div className="flex items-center gap-2 text-lg font-medium">
          {data?.icon && <span className="text-lg">{data.icon}</span>}
          <span className="whitespace-nowrap">{data?.label}</span>
        </div>
        <div className="mt-2 h-[2px] w-12 rounded-full bg-gradient-to-r from-sky-500 to-indigo-400" />
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="!h-2 !w-2 !opacity-0 !pointer-events-none"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-2 !w-2 !opacity-0 !pointer-events-none"
      />
    </div>
  );
}

const nodeTypes = { architecture: ArchitectureNode };

const initialNodes = [
  { id: 'frontend', type: 'architecture', position: { x: 280, y: 250 }, data: { label: 'Frontend Dev', tag: 'WEB', icon: '💻' } },
  { id: 'backend', type: 'architecture', position: { x: 560, y: 250 }, data: { label: 'Backend & API', icon: '⚙️' } },
  { id: 'ai', type: 'architecture', position: { x: 880, y: 150 }, data: { label: 'AI Integration', tag: 'AI', icon: '🤖' } },
  { id: 'database', type: 'architecture', position: { x: 880, y: 360 }, data: { label: 'Database', icon: '🗄️' } },
  { id: 'deployment', type: 'architecture', position: { x: 1200, y: 250 }, data: { label: 'Deployment', icon: '☁️' } },
];

const initialEdges = [
  { id: 'e2', source: 'frontend', target: 'backend', animated: true },
  { id: 'e3', source: 'backend', target: 'ai', animated: true },
  { id: 'e4', source: 'backend', target: 'database', animated: true },
  { id: 'e5', source: 'ai', target: 'deployment', animated: true },
  { id: 'e6', source: 'database', target: 'deployment', animated: true },
];

export function ArchitectureFlowCanvas() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges as any);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'smoothstep',
            animated: true,
            style: { strokeWidth: 1.6 },
          },
          eds,
        ),
      ),
    [setEdges],
  );

  return (
    <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center">
      <div className="w-full h-full">
        <div
          className="relative h-full w-full"
          style={{
            transform: 'rotateX(50deg) rotateZ(-25deg)', 
            transformOrigin: '50% 50%',
          }}
        >
          <div className="pointer-events-none absolute inset-[6%] rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(39,39,42,0.5)_0%,rgba(39,39,42,0)_70%)]" />

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            panOnScroll={false}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            nodesDraggable={false} 
            nodesConnectable={false}
            elementsSelectable={false}
            proOptions={{ hideAttribution: true }}
            className="h-full w-full bg-transparent"
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={24}
              size={1}
              color="#555"
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}