import { AnimationFrame, Valve } from '@kitsune-system/common';

export const dummy = () => {
  const am = AnimationFrame();

  am.onRequestAnimationFrame(requestAnimationFrame);
  am.onCancelAnimationFrame(cancelAnimationFrame);

  const valve = Valve();
  am.onFrame(valve);

  valve.onOutput(() => {
    console.log('FRAME');
  });

  window.valve = valve;
};
