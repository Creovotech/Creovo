'use client';

import React, { useMemo, useState } from 'react';
import { ReactFlow, Background, BackgroundVariant, Node, Edge, Position, Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

type ProjectType = 'website' | 'fullstack' | 'agentic';

/* ---------------- Custom Nodes ---------------- */

function InputNode({
  data,
}: { 
  data: { 
    type: ProjectType; 
    setType: (t: ProjectType) => void;
    color: string;
    setColor: (c: string) => void;
    scope: number;
    setScope: (n: number) => void;
  } 
}) {
  return (
    <div className="rounded-2xl border-2 border-zinc-700 bg-zinc-900 shadow-2xl text-zinc-100 min-w-[280px]">
      <div className="px-5 py-3 text-sm font-bold text-zinc-200 border-b-2 border-zinc-700 bg-zinc-800/50">
        Configure Your Project
      </div>
      
      <div className="p-5 space-y-6">
        {/* Project Type */}
        <div>
          <div className="text-xs font-semibold text-zinc-400 mb-3 uppercase tracking-wide">
            Project Type
          </div>
          <div className="space-y-2.5">
            {(['website', 'fullstack', 'agentic'] as ProjectType[]).map((t) => (
              <label 
                key={t} 
                className="flex items-center gap-3 cursor-pointer hover:text-pink-400 transition-colors p-2 rounded-lg hover:bg-zinc-800/50"
                onClick={(e) => {
                  e.stopPropagation();
                  data.setType(t);
                }}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  data.type === t 
                    ? 'border-pink-500 bg-pink-500' 
                    : 'border-zinc-600 bg-transparent'
                }`}>
                  {data.type === t && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="capitalize font-medium text-sm">{t}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand Color */}
        <div>
          <div className="text-xs font-semibold text-zinc-400 mb-3 uppercase tracking-wide">
            Brand Color
          </div>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={data.color}
              onChange={(e) => {
                e.stopPropagation();
                data.setColor(e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              className="h-11 w-14 rounded-lg border-2 border-zinc-700 bg-zinc-800 cursor-pointer"
              aria-label="Pick color"
            />
            <input
              type="text"
              value={data.color}
              onChange={(e) => {
                e.stopPropagation();
                data.setColor(e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              className="h-11 flex-1 rounded-lg bg-zinc-800 border-2 border-zinc-700 px-3 text-sm font-mono focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>
        </div>

        {/* Scope */}
        <div>
          <div className="text-xs font-semibold text-zinc-400 mb-3 uppercase tracking-wide">
            Scope
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={data.scope}
            onChange={(e) => {
              e.stopPropagation();
              data.setScope(Number(e.target.value));
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
            style={{
              background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(data.scope - 1) * 11.11}%, #3f3f46 ${(data.scope - 1) * 11.11}%, #3f3f46 100%)`
            }}
          />
          <div className="text-sm text-zinc-300 mt-2 font-semibold text-center bg-zinc-800/50 py-1.5 rounded-lg">
            ~{data.scope} units
          </div>
        </div>
      </div>
      
      <Handle type="source" position={Position.Right} className="!w-4 !h-4 !bg-pink-500 !border-2 !border-zinc-900" />
    </div>
  );
}

function OutputNode({
  data,
}: {
  data: {
    type: ProjectType;
    color: string;
    scope: number;
    price: number;
  };
}) {
  return (
    <div className="rounded-2xl border-2 border-zinc-700 bg-zinc-900 shadow-2xl text-zinc-100 min-w-[320px]">
      <div className="px-5 py-3 text-sm font-bold text-zinc-200 border-b-2 border-zinc-700 bg-zinc-800/50">
        Project Preview
      </div>
      
      <div className="p-5 space-y-4">
        {/* Visual Preview */}
        <div className="rounded-xl bg-black border-2 border-zinc-800 h-[200px] relative overflow-hidden">
          <div className="absolute inset-0">
            {Array.from({ length: 32 }).map((_, i) => {
              const seed = Math.sin(i * 12.3) * 10000;
              const x = ((seed % 1 + 1) % 1) * 100;
              const y = ((Math.cos(seed) % 1 + 1) % 1) * 100;
              const s = 6 + (i % 5);
              return (
                <div
                  key={i}
                  className="absolute rounded-sm transition-all duration-500"
                  style={{
                    left: `calc(${x}% - ${s / 2}px)`,
                    top: `calc(${y}% - ${s / 2}px)`,
                    width: s,
                    height: s,
                    background: data.color,
                    opacity: 0.85,
                    transform: `rotate(${(i * 17) % 360}deg)`,
                    boxShadow: `0 0 10px ${data.color}80`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Price Info */}
        <div className="space-y-3 bg-zinc-800/30 p-4 rounded-xl border border-zinc-800">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-zinc-400">Estimated Start:</span>
            <span className="text-2xl font-bold text-white">${data.price}</span>
          </div>
          
          <div className="text-xs text-zinc-500 leading-relaxed pt-2 border-t border-zinc-800">
            Includes 35% early-bird discount
          </div>
          
          <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-800">
            <span className="text-zinc-500">Type:</span>
            <span className="capitalize text-zinc-300 font-medium">{data.type}</span>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">Scope:</span>
            <span className="text-zinc-300 font-medium">~{data.scope} units</span>
          </div>
        </div>
      </div>
      
      <Handle type="target" position={Position.Left} className="!w-4 !h-4 !bg-pink-500 !border-2 !border-zinc-900" />
    </div>
  );
}

/* ---------------- Main Flow ---------------- */

const nodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
};

export function AgencyFlow() {
  const [type, setType] = useState<ProjectType>('website');
  const [color, setColor] = useState('#ff0071');
  const [scope, setScope] = useState(3);

  const price = useMemo(() => {
    const base = type === 'website' ? 500 : type === 'fullstack' ? 1000 : 2500;
    const bump = Math.round((scope - 1) * (type === 'agentic' ? 200 : type === 'fullstack' ? 150 : 75));
    return base + Math.max(0, bump);
  }, [type, scope]);

  const nodes: Node[] = useMemo(
    () => [
      {
        id: 'input',
        type: 'inputNode',
        position: { x: 50, y: 100 },
        data: { type, setType, color, setColor, scope, setScope },
        draggable: false,
      },
      {
        id: 'output',
        type: 'outputNode',
        position: { x: 450, y: 100 },
        data: { type, color, scope, price },
        draggable: false,
      },
    ],
    [type, color, scope, price]
  );

  const edges: Edge[] = useMemo(
    () => [
      { 
        id: 'e1', 
        source: 'input', 
        target: 'output', 
        animated: true, 
        style: { stroke: '#ec4899', strokeWidth: 3 },
        type: 'smoothstep',
      },
    ],
    []
  );

  return (
    <div className="relative w-full h-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.15, minZoom: 0.6, maxZoom: 1 }}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
        className="bg-transparent"
        minZoom={0.4}
        maxZoom={1.2}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          color="#3f3f46"
          className="opacity-20"
        />
      </ReactFlow>
    </div>
  );
}