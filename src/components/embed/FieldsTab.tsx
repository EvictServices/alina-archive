"use client";

import { FiPlus, FiTrash } from "react-icons/fi";
import { EmbedData } from "@/types/embeds";
import { VariableInput } from "@/components/variable/VariableInput";

interface FieldsTabProps {
  fields: EmbedData["fields"];
  onAdd: () => void;
  onUpdate: (
    index: number,
    key: "name" | "value" | "inline",
    value: any
  ) => void;
  onRemove: (index: number) => void;
}

export const FieldsTab = ({
  fields,
  onAdd,
  onUpdate,
  onRemove,
}: FieldsTabProps) => (
  <div className="space-y-4">
    {fields.map((field, index) => (
      <div
        key={index}
        className="bg-white/[0.01] border border-white/5 rounded-md p-3"
      >
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium">Field {index + 1}</h4>
          <button
            onClick={() => onRemove(index)}
            className="text-white/60 hover:text-red-400 p-1 rounded transition-colors"
          >
            <FiTrash size={14} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-white/60 text-[11px] leading-none mb-1">
              Name
            </label>
            <VariableInput
              value={field.name}
              onChange={(value) => onUpdate(index, "name", value)}
              className="w-full bg-white/[0.01] border border-white/5 rounded-md px-3 py-2 text-white focus:outline-none focus:border-evict-primary/50 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-white/60 text-[11px] leading-none mb-1">
              Value
            </label>
            <VariableInput
              type="textarea"
              value={field.value}
              onChange={(value) => onUpdate(index, "value", value)}
              className="w-full bg-white/[0.01] border border-white/5 rounded-md px-3 py-2 text-white focus:outline-none focus:border-evict-primary/50 transition-colors text-sm"
              rows={2}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id={`inline-${index}`}
              checked={field.inline}
              onChange={(e) => onUpdate(index, "inline", e.target.checked)}
              className="mr-2 h-4 w-4 rounded border-white/30 text-evict-primary focus:ring-evict-primary/20"
            />
            <label
              htmlFor={`inline-${index}`}
              className="text-xs text-white/70"
            >
              Inline field
            </label>
          </div>
        </div>
      </div>
    ))}

    <button
      onClick={onAdd}
      className="w-full py-2 border border-dashed border-white/5 rounded-md text-white/60 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center gap-2"
    >
      <FiPlus size={16} />
      <span>Add Field</span>
    </button>
  </div>
);
