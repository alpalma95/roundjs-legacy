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
 * @param {Function} callback Callback for the event handler
 * @param {{}} options Options we can pass to add event listener method
 * @returns
 */
export const delegate = (component, callback, options = {}) => {
  /**
   * @param {string} eventType Type of the event we're registering (click, mouseover, focus...)
   * @param {string} target Unique identifier generated when rendering the HTML string.
   * It'll be used to attach the event listener to the correct component's child
   */
  return (eventType, target) => {
    const event = {
      type: eventType,
      target: target,
      cb: callback,
    };

    const isRegistered = eventIsRegistered(component, event);

    if (isRegistered) {
      return;
    }

    const handler = ($event) => {
      event.cb.call(component, $event);
    };

    track.push({ component, event, handler });

    return event.cb;
  };
};

export const hydrate = (component) => {
  track.forEach((registry) => {
    const targetChild = component.querySelector(
      `[_key="${registry.event.target}"]`
    );
    if (!targetChild) return;

    targetChild.addEventListener(registry.event.type, registry.handler);
  });
};

export const unregisterEvents = (component) => {
  track.forEach((registry) => {
    const targetChild = component.querySelector(
      `[_key="${registry.event.target}"]`
    );
    if (!targetChild) return;
    targetChild.removeEventListener(registry.event.type, registry.handler);
  });
  track = [...track.filter((registry) => registry.component != component)];
  return;
};
