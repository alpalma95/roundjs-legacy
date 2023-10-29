import { ReactiveWC } from "./round";

export let track = [];

const eventIsRegistered = (component, event) =>
  track.some(
    (registry) =>
      registry.component == component &&
      registry.event.type == event.type &&
      registry.event.target === event.target
  );

/**
 *
 * @param {ReactiveWC} component Web component to which we want to add the event listener
 * @param {{type: string, cb: ()=> {}, target: string}} event Object containing type of event, callback and target
 * @param {object} options
 * @returns
 */
export const registerEvent = (component, event, options = {}) => {
  const isRegistered = eventIsRegistered(component, event);

  if (isRegistered) {
    return;
  }

  const handler = ($event) => {
    const target = $event.originalTarget;
    if (
      target.getAttribute(":key") == event.target ||
      target.getAttribute("id") == event.target
    ) {
      event.cb.call(component, $event);
    }
  };

  track.push({ component, event, handler });
  component.addEventListener(event.type, handler, options);
  return event.cb;
};

export const unregisterEvents = (component) => {
  track.forEach((registry) => {
    component.removeEventListener(registry.event.type, registry.handler);
  });
  track = [...track.filter((registry) => registry.component != component)];
  return;
};
