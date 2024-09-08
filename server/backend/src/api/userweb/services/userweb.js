'use strict';

/**
 * userweb service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::userweb.userweb');
