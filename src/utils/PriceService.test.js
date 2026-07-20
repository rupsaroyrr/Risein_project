import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getXlmPrice, calculateXlmCost } from './PriceService';

describe('PriceService Utility Module', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('calculateXlmCost', () => {
    it('should compute correct XLM cost for valid inputs (rounded up)', () => {
      expect(calculateXlmCost(10, 0.1)).toBe(100);
      expect(calculateXlmCost(10, 0.3)).toBe(34); // 10 / 0.3 = 33.333 -> 34
    });

    it('should return 0 if xlmPrice is 0 or negative', () => {
      expect(calculateXlmCost(10, 0)).toBe(0);
      expect(calculateXlmCost(10, -0.5)).toBe(0);
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
      expect(fetchSpy).toHaveBeenCalled();
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
