import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getXlmPrice, calculateXlmCost, clearPriceCache } from './PriceService';

describe('PriceService Utility Module', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    clearPriceCache();
  });

  describe('calculateXlmCost', () => {
    it('should compute correct XLM cost for valid inputs (rounded up)', () => {
      expect(calculateXlmCost(10, 0.1)).toBe(100);
      expect(calculateXlmCost(10, 0.3)).toBe(34); // 10 / 0.3 = 33.333 -> 34
    });

    it('should handle numeric string inputs correctly', () => {
      expect(calculateXlmCost("15", "0.15")).toBe(100);
    });

    it('should return 0 if xlmPrice is 0 or negative', () => {
      expect(calculateXlmCost(10, 0)).toBe(0);
      expect(calculateXlmCost(10, -0.5)).toBe(0);
      expect(calculateXlmCost("invalid", "0.15")).toBe(0);
    });
  });

  describe('getXlmPrice', () => {
    it('should fetch price successfully and return the stellar usd value', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ stellar: { usd: 0.15 } })
      };
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse);

      const price = await getXlmPrice();
      expect(price).toBe(0.15);
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    it('should serve cached price on subsequent calls within TTL window', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ stellar: { usd: 0.18 } })
      };
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse);

      const firstCall = await getXlmPrice();
      const secondCall = await getXlmPrice();

      expect(firstCall).toBe(0.18);
      expect(secondCall).toBe(0.18);
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    it('should fall back to 0.12 if response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 500
      };
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse);

      const price = await getXlmPrice();
      expect(price).toBe(0.12);
    });

    it('should fall back to 0.12 if fetch throws an exception', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network drop'));

      const price = await getXlmPrice();
      expect(price).toBe(0.12);
    });
  });
});

