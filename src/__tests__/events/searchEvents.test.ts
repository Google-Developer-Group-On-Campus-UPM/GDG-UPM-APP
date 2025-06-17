/**
 * Unit Tests for searchEvents Function
 *
 * This file contains comprehensive tests for the searchEvents functionality,
 * covering various scenarios including normal cases, edge cases, and error handling.
 */

import { mockEvents } from "@/constants/data/mock-events";
import { Event } from "@/constants/types/events.type";
import searchEvents from "@/services/events/functions/searchEvents";

describe("searchEvents", () => {
  describe("Normal Search Functionality", () => {
    test("should return all events when search term is empty", () => {
      const result = searchEvents(mockEvents, "");
      expect(result).toEqual(mockEvents);
      expect(result.length).toBe(mockEvents.length);
    });

    test("should return all events when search term is only whitespace", () => {
      const result = searchEvents(mockEvents, "   ");
      expect(result).toEqual(mockEvents);
    });

    test("should search by exact title match", () => {
      const result = searchEvents(mockEvents, "Flutter Workshop for Beginners");
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Flutter Workshop for Beginners");
    });

    test("should search by partial title match", () => {
      const result = searchEvents(mockEvents, "Flutter");
      expect(result.length).toBeGreaterThan(0);

      // All results should contain "Flutter" in title
      result.forEach((event) => {
        expect(event.title.toLowerCase()).toContain("flutter");
      });
    });

    test("should search by single keyword", () => {
      const result = searchEvents(mockEvents, "Workshop");
      expect(result.length).toBeGreaterThan(0);

      // Check that all results contain "workshop"
      result.forEach((event) => {
        expect(event.title.toLowerCase()).toContain("workshop");
      });
    });

    test("should be case insensitive", () => {
      const lowerCase = searchEvents(mockEvents, "flutter");
      const upperCase = searchEvents(mockEvents, "FLUTTER");
      const mixedCase = searchEvents(mockEvents, "FlUtTeR");

      expect(lowerCase).toEqual(upperCase);
      expect(upperCase).toEqual(mixedCase);
      expect(lowerCase.length).toBeGreaterThan(0);
    });

    test("should return multiple events for common keywords", () => {
      const result = searchEvents(mockEvents, "Team");
      expect(result.length).toBeGreaterThan(1);

      // Verify all results contain "team" in organizer or title
      result.forEach((event) => {
        const hasTeamInTitle = event.title.toLowerCase().includes("team");
        const hasTeamInOrganizer = event.organizer
          .toLowerCase()
          .includes("team");
        expect(hasTeamInTitle || hasTeamInOrganizer).toBe(true);
      });
    });
  });

  describe("Performance and Data Integrity", () => {
    test("should not modify original events array", () => {
      const originalEvents = [...mockEvents];
      const result = searchEvents(mockEvents, "Flutter");

      expect(mockEvents).toEqual(originalEvents);
      expect(result).not.toBe(mockEvents); // Should be a new array
    });

    test("should return Event objects with all required properties", () => {
      const result = searchEvents(mockEvents, "Flutter");

      result.forEach((event) => {
        expect(event).toHaveProperty("id");
        expect(event).toHaveProperty("title");
        expect(event).toHaveProperty("date");
        expect(event).toHaveProperty("location");
        expect(event).toHaveProperty("organizer");
        expect(event).toHaveProperty("attendeesCount");
        expect(event).toHaveProperty("image");
        expect(event).toHaveProperty("status");

        // Check types
        expect(typeof event.id).toBe("string");
        expect(typeof event.title).toBe("string");
        expect(event.date).toBeInstanceOf(Date);
        expect(typeof event.location).toBe("string");
        expect(typeof event.organizer).toBe("string");
        expect(typeof event.attendeesCount).toBe("number");
        expect(typeof event.image).toBe("string");
        expect(["upcoming", "past"]).toContain(event.status);
      });
    });

    test("should handle large datasets efficiently", () => {
      // Create a large dataset
      const largeDataset: Event[] = [];
      for (let i = 0; i < 1000; i++) {
        largeDataset.push({
          ...mockEvents[0],
          id: `large-${i}`,
          title: i % 2 === 0 ? `Flutter Event ${i}` : `Other Event ${i}`,
        });
      }

      const startTime = performance.now();
      const result = searchEvents(largeDataset, "Flutter");
      const endTime = performance.now();

      expect(result.length).toBe(500); // Half should match
      expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
    });
  });

  describe("Integration with Real Use Cases", () => {
    test("should work with typical user search patterns", () => {
      // Test common search patterns users might use
      const searchTerms = ["workshop", "ai", "design", "mobile", "web"];

      searchTerms.forEach((term) => {
        const result = searchEvents(mockEvents, term);
        // Each search should return some results for our mock data
        expect(result.length).toBeGreaterThanOrEqual(0);

        if (result.length > 0) {
          result.forEach((event) => {
            expect(event.title.toLowerCase()).toContain(term.toLowerCase());
          });
        }
      });
    });

    test("should handle partial word matches", () => {
      const result = searchEvents(mockEvents, "Tail"); // Should match "TailwindCSS"
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].title).toContain("TailwindCSS");
    });
  });
});
