import React, { ReactNode } from 'react';

export interface DataListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  emptyMessage?: string;
  className?: string;
}

export function DataList<T>({
  data,
  renderItem,
  keyExtractor,
  emptyMessage = 'No items to display.',
  className = '',
}: DataListProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className={`p-8 text-center text-slate-400 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {data.map((item, index) => (
        <div key={keyExtractor(item, index)} className="group">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
