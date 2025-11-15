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
        'group relative min-w-[120px] text-[11px] text-zinc-100 transition-transform duration-150 ' +
        (selected ? 'scale-[1.04] drop-shadow-[0_0_30px_rgba(56,189,248,0.7)]' : '')
      }
    >
      {/* squarish stacked layers */}
      <div className="pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-xl border border-white/5 bg-zinc-950/70" />
      <div className="pointer-events-none absolute inset-0 translate-x-[12px] translate-y-[12px] rounded-xl border border-white/10 bg-zinc-900/60" />

      <div className="relative rounded-xl border border-white/20 bg-zinc-900/95 px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.7)]">
        {data?.tag && (
          <span className="absolute -top-3 left-3 rounded-full border border-white/20 bg-black/80 px-2 py-[2px] text-[9px] uppercase tracking-[0.18em] text-zinc-400">
            {data.tag}
          </span>
        )}
        <div className="flex items-center gap-1.5 text-xs font-medium">
          {data?.icon && <span className="text-[13px]">{data.icon}</span>}
          <span>{data?.label}</span>
        </div>
        <div className="mt-1 h-[2px] w-10 rounded-full bg-gradient-to-r from-sky-500 to-indigo-400" />
      </div>

      {/* invisible handles so edges still attach, but no interaction */}
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
  { id: 'user-io', type: 'architecture', position: { x: 0, y: 150 }, data: { label: 'User IO', icon: '👤' } },
  { id: 'sdks', type: 'architecture', position: { x: 200, y: 150 }, data: { label: 'SDKs', tag: 'CLIENT', icon: '⚛️' } },
  { id: 'webrtc', type: 'architecture', position: { x: 400, y: 150 }, data: { label: 'WebRTC', icon: '📡' } },
  { id: 'media', type: 'architecture', position: { x: 620, y: 90 }, data: { label: 'Media server', icon: '🎛️' } },
  { id: 'agent', type: 'architecture', position: { x: 620, y: 220 }, data: { label: 'Agent server', icon: '🤖' } },
  { id: 'noise', type: 'architecture', position: { x: 840, y: 60 }, data: { label: 'Noise cancellation', icon: '🔊' } },
  { id: 'turn', type: 'architecture', position: { x: 840, y: 180 }, data: { label: 'Semantic turn detection', tag: 'STT', icon: '🧠' } },
  { id: 'llm', type: 'architecture', position: { x: 840, y: 300 }, data: { label: 'LLM', tag: 'LLM', icon: '📚' } },
  { id: 'tts', type: 'architecture', position: { x: 1060, y: 140 }, data: { label: 'TTS', tag: 'TTS', icon: '🎙️' } },
  { id: 'logic', type: 'architecture', position: { x: 1060, y: 260 }, data: { label: 'Custom business logic', icon: '🧩' } },
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
    // bigger and transparent wrapper; background comes from hero
    <div className="relative w-full h-[460px] md:h-[520px]">
      <div className="absolute inset-0">
        <div
          className="relative h-full w-full"
          style={{
            transform: 'rotateX(62deg) rotateZ(-35deg)',
            transformOrigin: '50% 50%',
          }}
        >
          {/* the isometric “board” */}
          <div className="pointer-events-none absolute inset-[6%] rounded-[32px] border border-white/15 bg-black/40" />

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            panOnScroll={false}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            className="h-full w-full bg-transparent"
          >
            <Background
              variant={BackgroundVariant.Lines}
              gap={32}
              size={1}
              color="#27272a"
            />
            {/* no Controls => no +/- icons */}
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
