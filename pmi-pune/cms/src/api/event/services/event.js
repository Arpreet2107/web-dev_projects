'use strict';

/**
 * event service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::event.event', ({ strapi }) => ({
  async decrementAvailableSeats(eventId) {
    const event = await strapi.entityService.findOne('api::event.event', eventId);
    if (event && event.availableSeats > 0) {
      await strapi.entityService.update('api::event.event', eventId, {
        data: {
          availableSeats: event.availableSeats - 1,
        },
      });
    }
  },

  async incrementAvailableSeats(eventId) {
    const event = await strapi.entityService.findOne('api::event.event', eventId);
    if (event && event.maxAttendees) {
      const newSeats = Math.min(event.availableSeats + 1, event.maxAttendees);
      await strapi.entityService.update('api::event.event', eventId, {
        data: {
          availableSeats: newSeats,
        },
      });
    }
  },
}));

