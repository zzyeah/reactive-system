import deleteHandler from "./behavior/deleteHandler";
import getHandler from "./behavior/getHandler";
import hasHandler from "./behavior/hasHandler";
import ownKeysHandler from "./behavior/ownKeysHandler";
import setHandler from "./behavior/setHandler";

const handlers: ProxyHandler<Record<string | symbol, any>> = {
  get: getHandler,
  set: setHandler,
  deleteProperty: deleteHandler,
  has: hasHandler,
  ownKeys: ownKeysHandler,
};

export default handlers;
