const roleCan = {
  SYSTEM_ADMIN: {
    superAccess: true
  },
  SCRIBE_MANAGER: {
    scribe: {
      create: true,
      edit: true,
      delete: false,
      list: true
    }
  },
  SCRIBE_DEVELOPER: {
    scribe: {
      create: true,
      edit: true,
      delete: true
    }
  },
  USER: {},
  TESTING_USER: {},
  OPERATIONS_SUPPORT: {},
  PARTNER_MANAGER: {},
  SALES_MANAGER: {},
  SALES_AGENT: {},
  SERVICE_MANAGER: {},
  SERVICE_PROVIDER: {},
  CONTENT_MANAGER: {},
  CONTENT_DEVELOPER: {},
  NOTIFICATION_MANAGER: {},
  PLAN_MANAGER: {
    plan: {
      create: true,
      list: true
    }
  }
};

export default roleCan;
