const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) { }

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:8000,http://localhost:7001,http://localhost:8091,https://persues.cradial.in,https://cradial.in,https://www.cradial.in";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000,http://localhost:7000,http://localhost:7001,http://localhost:8091,https://persues.cradial.in,https://cradial.in,https://www.cradial.in";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  {
    resolve: `medusa-plugin-wishlist`,
  },

  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,

  // {
  //   resolve: `medusa-payment-razorpay`,
  //   options: {
  //     key_id: process.env.RAZORPAY_ID,
  //     key_secret: process.env.RAZORPAY_SECRET,
  //     razorpay_account: process.env.RAZORPAY_ACCOUNT,
  //     automatic_expiry_period: 30, /*any value between 12minuts and 30 days expressed in minutes*/
  //     manual_expiry_period: 20,
  //     refund_speed: "normal",
  //     webhook_secret: process.env.RAZORPAY_SECRET,
  //   }
  // },
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
      backend_url: process.env.MEDUSA_ADMIN_BACKEND_URL
    },
  },
  {
    resolve: `@rsc-labs/medusa-documents`,
    options: {
      enableUI: true
    }
  },
  {
    resolve: `@rsc-labs/medusa-store-analytics`,
    options: {
      enableUI: true
    }
  },
  {
    resolve: `medusa-plugin-restock-notification`,
    options: {
      trigger_delay: 500, // optional, delay time in milliseconds
      inventory_required: 4, // minimum inventory quantity to consider a variant as restocked
    },
  },

  //  {
  //   resolve: 'medusa-plugin-variant-images',
  //   options: {
  //     enableUI: true,
  //   },
  // },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      serve: true,
      backend: "https://persues.cradial.in/",
      outDir: "build",
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
        port: 8091,
      },
    },
  },
];

const modules = {
  inventoryService: {
    resolve: "@medusajs/inventory",
  },


  /*eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },*/
  // cacheService: {
  //   resolve: "@medusajs/cache-redis",
  //   options: {
  //     redisUrl: REDIS_URL,
  //     ttl: 30,
  //   },
  // },
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  working_key: "B38674E7A69677D0376DF414AD3AE82E",
  merchant_id: "ewjfrfkejrf",
  access_code: "AVSZ09KI06AA59ZSAA",
  redirect_url: "erg4tg4g45",
  cancel_url: "4rg45g45",
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  // Uncomment the following lines to enable REDIS
  // redis_url: REDIS_URL,
  // database_extra: process.env.NODE_ENV !== "development" ?
  //   {
  //     ssl: {
  //       rejectUnauthorized: false,
  //     },
  //   } : {},

};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};
