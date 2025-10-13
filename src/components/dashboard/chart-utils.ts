export function buildTicks(values: number[]): number[] {
  if (values.length === 0) {
    return [0];
  }

  const maxValue = Math.max(...values);
  if (maxValue === 0) {
    return [0];
  }

  const rawStep = maxValue / 5;
  const exponent = Math.floor(Math.log10(rawStep));
  const magnitude = 10 ** exponent;
  const fraction = rawStep / magnitude;

  let niceFraction: number;
  if (fraction <= 1) {
    niceFraction = 1;
  } else if (fraction <= 2) {
    niceFraction = 2;
  } else if (fraction <= 5) {
    niceFraction = 5;
  } else {
    niceFraction = 10;
  }

  const step = niceFraction * magnitude;
  const maxTick = Math.ceil(maxValue / step) * step;
  const ticks: number[] = [];

  for (let tick = 0; tick <= maxTick; tick += step) {
    ticks.push(tick);
  }

  if (ticks.length === 0 || ticks[ticks.length - 1] !== maxTick) {
    ticks.push(maxTick);
  }

  return ticks;
}
