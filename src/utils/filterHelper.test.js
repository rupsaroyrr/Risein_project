import { describe, it, expect } from 'vitest';
import { filterHistory } from './filterHelper';

describe('filterHistory utility function', () => {
  const mockHistory = [
    { id: '1', addr: 'GA123456', amt: '150.00 XLM', hash: 'txhash_abc123' },
    { id: '2', addr: 'GB789012', amt: '5.50 XLM', hash: 'txhash_xyz789' },
    { id: '3', addr: 'GC345678', amt: '25.00 XLM', hash: 'txhash_def456' },
  ];

  it('should return all items when search query and minAmt are empty', () => {
    const result = filterHistory(mockHistory, '', '');
    expect(result).toHaveLength(3);
    expect(result).toEqual(mockHistory);
  });

  it('should search case-insensitively by address', () => {
    const result = filterHistory(mockHistory, 'ga123', '');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should search case-insensitively by hash', () => {
    const result = filterHistory(mockHistory, 'XYZ789', '');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2');
  });

  it('should filter by minimum XLM amount', () => {
    const result = filterHistory(mockHistory, '', '25');
    expect(result).toHaveLength(2); // 150.00 and 25.00
    expect(result.map(r => r.id)).toContain('1');
    expect(result.map(r => r.id)).toContain('3');
  });

  it('should filter by maximum XLM amount range', () => {
    const result = filterHistory(mockHistory, '', '5', '30');
    expect(result).toHaveLength(2); // 5.50 and 25.00
    expect(result.map(r => r.id)).toContain('2');
    expect(result.map(r => r.id)).toContain('3');
  });

  it('should filter by search query, min amount, and max amount combined', () => {
    const result = filterHistory(mockHistory, ' txhash ', '10', '100');
    expect(result).toHaveLength(1); // Only GC345678 (25 XLM)
    expect(result[0].id).toBe('3');
  });

  it('should handle empty or null values gracefully', () => {
    expect(filterHistory(null, 'abc', '10')).toEqual([]);
    expect(filterHistory(undefined, 'abc', '10')).toEqual([]);
    expect(filterHistory([], 'abc', '10')).toEqual([]);
  });
});

