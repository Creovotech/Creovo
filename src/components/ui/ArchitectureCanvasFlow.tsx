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
      {/* squarish stacked layers */}
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

      {/* invisible handles */}
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
  { id: 'user-io', type: 'architecture', position: { x: 0, y: 250 }, data: { label: 'User IO', icon: '👤' } },
  { id: 'sdks', type: 'architecture', position: { x: 280, y: 250 }, data: { label: 'SDKs', tag: 'CLIENT', icon: '⚛️' } },
  { id: 'webrtc', type: 'architecture', position: { x: 560, y: 250 }, data: { label: 'WebRTC', icon: '📡' } },
  { id: 'media', type: 'architecture', position: { x: 880, y: 150 }, data: { label: 'Media server', icon: '🎛️' } },
  { id: 'agent', type: 'architecture', position: { x: 880, y: 360 }, data: { label: 'Agent server', icon: '🤖' } },
  { id: 'noise', type: 'architecture', position: { x: 1200, y: 100 }, data: { label: 'Noise cancellation', icon: '🔊' } },
  { id: 'turn', type: 'architecture', position: { x: 1200, y: 300 }, data: { label: 'Semantic turn detection', tag: 'STT', icon: '🧠' } },
  { id: 'llm', type: 'architecture', position: { x: 1200, y: 500 }, data: { label: 'LLM', tag: 'LLM', icon: '📚' } },
  { id: 'tts', type: 'architecture', position: { x: 1520, y: 220 }, data: { label: 'TTS', tag: 'TTS', icon: '🎙️' } },
  { id: 'logic', type: 'architecture', position: { x: 1520, y: 420 }, data: { label: 'Custom business logic', icon: '🧩' } },
];

const initialEdges = [
  { id: 'e1', source: 'user-io', target: 'sdks', animated: true },
  { id: 'e2', source: 'sdks', target: 'webrtc', animated: true },
  { id: 'e3', source: 'webrtc', target: 'media', animated: true },
  { id: 'e4', source: 'webrtc', target: 'agent', animated: true },
  { id: 'e5', source: 'media', target: 'noise', animated: true },
  { id: 'e6', source: 'agent', target: 'turn', animated: true },
  { id: 'e7', source: 'agent', target: 'llm', animated: true },
  { id: 'e8', source: 'llm', target: 'tts', animated: true },
  { id: 'e9', source: 'tts', target: 'logic', animated: true },
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
    <div className="relative w-full h-[600px] md:h-[700px]">
      <div className="absolute inset-0">
        <div
          className="relative h-full w-full"
          style={{
            transform: 'rotateX(62deg) rotateZ(-35deg)',
            transformOrigin: '50% 50%',
          }}
        >
          {/* the isometric "board" - now fully transparent */}
          <div className="pointer-events-none absolute inset-[6%] bg-transparent" />

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
            proOptions={{hideAttribution : true}}
            className="h-full w-full bg-transparent"
          >
            {/* Removed Background component to eliminate grid lines */}
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}