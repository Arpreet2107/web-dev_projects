'use strict';

/**
 * event-registration service with lifecycle hooks
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::event-registration.event-registration', ({ strapi }) => ({
  async create(data) {
    const result = await super.create(data);
    
    // Decrement available seats when registration is confirmed
    if (result.status === 'confirmed' && result.event?.id) {
      const eventService = strapi.service('api::event.event');
      await eventService.decrementAvailableSeats(result.event.id);
    }
    
    return result;
  },

  async update(id, data) {
    const existing = await strapi.entityService.findOne('api::event-registration.event-registration', id);
    const result = await super.update(id, data);
    
    const eventService = strapi.service('api::event.event');
    
    // Handle status changes
    if (existing && result) {
      // If cancelled, increment seats
      if (existing.status === 'confirmed' && result.status === 'cancelled' && existing.event?.id) {
        await eventService.incrementAvailableSeats(existing.event.id);
      }
      // If confirmed from cancelled, decrement seats
      if (existing.status === 'cancelled' && result.status === 'confirmed' && result.event?.id) {
        await eventService.decrementAvailableSeats(result.event.id);
      }
    }
    
    return result;
  },
}));
