/**
 * Unit Tests for sortEvents Function
 *
 * This file contains comprehensive tests for the sortEvents functionality,
 * covering various scenarios including normal cases, edge cases, and date sorting.
 */

import sortEvents from "../sortEvents";
import { mockEvents } from "@/constants/mock-events";
import { Event } from "@/constants/types/events.type";

describe("sortEvents", () => {
  describe("Normal Sorting Functionality", () => {
    test("should sort events by newest first", () => {
      const result = sortEvents(mockEvents, "newest");

      // Check that we get all events back
      expect(result.length).toBe(mockEvents.length);

      // Check that dates are in descending order (newest first)
      for (let i = 0; i < result.length - 1; i++) {
        const currentDate = result[i].date.getTime();
        const nextDate = result[i + 1].date.getTime();
        expect(currentDate).toBeGreaterThanOrEqual(nextDate);
      }
    });

    test("should sort events by oldest first", () => {
      const result = sortEvents(mockEvents, "oldest");

      // Check that we get all events back
      expect(result.length).toBe(mockEvents.length);

      // Check that dates are in ascending order (oldest first)
      for (let i = 0; i < result.length - 1; i++) {
        const currentDate = result[i].date.getTime();
        const nextDate = result[i + 1].date.getTime();
        expect(currentDate).toBeLessThanOrEqual(nextDate);
      }
    });

    test("should return all events when sorting", () => {
      const newestResult = sortEvents(mockEvents, "newest");
      const oldestResult = sortEvents(mockEvents, "oldest");

      expect(newestResult.length).toBe(mockEvents.length);
      expect(oldestResult.length).toBe(mockEvents.length);

      // Should contain all the same events, just in different order
      const newestIds = newestResult.map((e) => e.id).sort();
      const oldestIds = oldestResult.map((e) => e.id).sort();
      const originalIds = mockEvents.map((e) => e.id).sort();

      expect(newestIds).toEqual(originalIds);
      expect(oldestIds).toEqual(originalIds);
    });
  });

  describe("Edge Cases", () => {
    test("should handle empty events array", () => {
      const newestResult = sortEvents([], "newest");
      const oldestResult = sortEvents([], "oldest");

      expect(newestResult).toEqual([]);
      expect(oldestResult).toEqual([]);
    });

    test("should handle single event", () => {
      const singleEvent = [mockEvents[0]];
      const newestResult = sortEvents(singleEvent, "newest");
      const oldestResult = sortEvents(singleEvent, "oldest");

      expect(newestResult).toEqual(singleEvent);
      expect(oldestResult).toEqual(singleEvent);
    });

    test("should handle events with same date", () => {
      const sameDate = new Date("2024-06-01T12:00:00Z");
      const eventsWithSameDate: Event[] = [
        { ...mockEvents[0], id: "1", date: sameDate, title: "Event 1" },
        { ...mockEvents[1], id: "2", date: sameDate, title: "Event 2" },
        { ...mockEvents[2], id: "3", date: sameDate, title: "Event 3" },
      ];

      const newestResult = sortEvents(eventsWithSameDate, "newest");
      const oldestResult = sortEvents(eventsWithSameDate, "oldest");

      expect(newestResult.length).toBe(3);
      expect(oldestResult.length).toBe(3);

      // All dates should be the same
      newestResult.forEach((event) => {
        expect(event.date.getTime()).toBe(sameDate.getTime());
      });

      oldestResult.forEach((event) => {
        expect(event.date.getTime()).toBe(sameDate.getTime());
      });
    });
  });

  describe("Data Integrity", () => {
    test("should not modify original events array", () => {
      const originalEvents = [...mockEvents];
      const originalFirstEvent = { ...mockEvents[0] };

      const result = sortEvents(mockEvents, "newest");

      // Original array should be unchanged
      expect(mockEvents).toEqual(originalEvents);
      expect(mockEvents[0]).toEqual(originalFirstEvent);

      // Result should be a new array
      expect(result).not.toBe(mockEvents);
    });

    test("should preserve all event properties", () => {
      const result = sortEvents(mockEvents, "newest");

      result.forEach((event) => {
        expect(event).toHaveProperty("id");
        expect(event).toHaveProperty("title");
        expect(event).toHaveProperty("date");
        expect(event).toHaveProperty("location");
        expect(event).toHaveProperty("organizer");
        expect(event).toHaveProperty("attendeesCount");
        expect(event).toHaveProperty("image");
        expect(event).toHaveProperty("status");

        // Check that the event object is complete
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

    test("should handle Date objects correctly", () => {
      const result = sortEvents(mockEvents, "newest");

      result.forEach((event) => {
        expect(event.date).toBeInstanceOf(Date);
        expect(event.date.getTime()).not.toBeNaN();
      });
    });
  });

  describe("Sorting Order Verification", () => {
    test("should reverse order when switching between newest and oldest", () => {
      const newest = sortEvents(mockEvents, "newest");
      const oldest = sortEvents(mockEvents, "oldest");

      // First event in newest should be last in oldest (if dates are unique)
      // Let's check that the orders are different
      expect(newest[0].id).not.toBe(oldest[0].id);

      // Check that they are reverse sorted
      const newestDates = newest.map((e) => e.date.getTime());
      const oldestDates = oldest.map((e) => e.date.getTime());

      expect(newestDates).toEqual(oldestDates.reverse());
    });

    test("should correctly identify newest event", () => {
      const result = sortEvents(mockEvents, "newest");
      const newestEvent = result[0];

      // This should be the event with the latest date
      const allDates = mockEvents.map((e) => e.date.getTime());
      const maxDate = Math.max(...allDates);

      expect(newestEvent.date.getTime()).toBe(maxDate);
    });

    test("should correctly identify oldest event", () => {
      const result = sortEvents(mockEvents, "oldest");
      const oldestEvent = result[0];

      // This should be the event with the earliest date
      const allDates = mockEvents.map((e) => e.date.getTime());
      const minDate = Math.min(...allDates);

      expect(oldestEvent.date.getTime()).toBe(minDate);
    });
  });

  describe("Performance Tests", () => {
    test("should handle large datasets efficiently", () => {
      // Create a large dataset
      const largeDataset: Event[] = [];
      for (let i = 0; i < 1000; i++) {
        largeDataset.push({
          ...mockEvents[0],
          id: `large-${i}`,
          date: new Date(2024, 0, 1 + i), // Sequential dates
        });
      }

      const startTime = performance.now();
      const result = sortEvents(largeDataset, "newest");
      const endTime = performance.now();

      expect(result.length).toBe(1000);
      expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms

      // Verify it's actually sorted
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].date.getTime()).toBeGreaterThanOrEqual(
          result[i + 1].date.getTime(),
        );
      }
    });
  });

  describe("Real-world Use Cases", () => {
    test("should work with mixed past and upcoming events", () => {
      const now = new Date();
      const pastEvents = mockEvents.filter((e) => e.date < now);
      const upcomingEvents = mockEvents.filter((e) => e.date >= now);

      if (pastEvents.length > 0 && upcomingEvents.length > 0) {
        const newest = sortEvents(mockEvents, "newest");
        const oldest = sortEvents(mockEvents, "oldest");

        // Newest should have most recent dates first
        expect(newest[0].date.getTime()).toBeGreaterThanOrEqual(
          newest[newest.length - 1].date.getTime(),
        );

        // Oldest should have earliest dates first
        expect(oldest[0].date.getTime()).toBeLessThanOrEqual(
          oldest[oldest.length - 1].date.getTime(),
        );
      }
    });

    test("should maintain consistent sorting with multiple calls", () => {
      const result1 = sortEvents(mockEvents, "newest");
      const result2 = sortEvents(mockEvents, "newest");
      const result3 = sortEvents(mockEvents, "oldest");
      const result4 = sortEvents(mockEvents, "oldest");

      expect(result1).toEqual(result2);
      expect(result3).toEqual(result4);
    });
  });
});
