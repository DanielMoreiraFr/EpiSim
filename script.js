/* ================================================================
   EpiSim — SIR Model | RK4 Integration
   ================================================================ */

// ── Chart setup ──────────────────────────────────────────────────
const ctx  = document.getElementById('sir-chart').getContext('2d');
let chart  = null;

function buildChart(labels, S, I, R) {
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'S(t) — Suscetíveis',
          data: S,
          borderColor: '#00c9a7',
          backgroundColor: 'rgba(0,201,167,.07)',
          borderWidth: 2.2,
          pointRadius: 0,
          fill: true,
          tension: 0.35,
        },
        {
          label: 'I(t) — Infectados',
          data: I,
          borderColor: '#ff4f6d',
          backgroundColor: 'rgba(255,79,109,.07)',
          borderWidth: 2.5,
          pointRadius: 0,
          fill: true,
          tension: 0.35,
        },
        {
          label: 'R(t) — Recuperados',
          data: R,
          borderColor: '#7b61ff',
          backgroundColor: 'rgba(123,97,255,.07)',
          borderWidth: 2.2,
          pointRadius: 0,
          fill: true,
          tension: 0.35,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#14141f',
          borderColor: '#2a2a40',
          borderWidth: 1,
          titleColor: '#7070a0',
          bodyColor: '#e8e8f0',
          padding: 12,
          callbacks: {
            label: ctx => ` ${ctx.dataset.label.split('—')[0].trim()}: ${fmt(ctx.parsed.y)}`,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#555577',
            font: { family: "'Space Mono', monospace", size: 10 },
            maxTicksLimit: 12,
          },
          grid: { color: 'rgba(255,255,255,.04)' },
          title: {
            display: true,
            text: 'Dias',
            color: '#555577',
            font: { size: 11 },
          },
        },
        y: {
          ticks: {
            color: '#555577',
            font: { family: "'Space Mono', monospace", size: 10 },
            callback: v => fmtShort(v),
          },
          grid: { color: 'rgba(255,255,255,.04)' },
          title: {
            display: true,
            text: 'Indivíduos',
            color: '#555577',
            font: { size: 11 },
          },
        },
      },
    },
  });
}

// ── RK4 SIR Integration ───────────────────────────────────────────
function sirDerivatives(S, I, R, N, beta, gamma) {
  const newInfections = beta * S * I / N;
  const recoveries    = gamma * I;
  return {
    dS: -newInfections,
    dI:  newInfections - recoveries,
    dR:  recoveries,
  };
}

function runSIR(N, I0, R0, infPeriod, days) {
  const gamma = 1 / infPeriod;
  const beta  = R0 * gamma;
  const dt    = 1;           // 1-day step

  let S = N - I0, I = I0, R = 0;

  const sArr = [S], iArr = [I], rArr = [R];
  const labels = ['Dia 0'];

  for (let t = 1; t <= days; t++) {
    // RK4
    const k1 = sirDerivatives(S, I, R, N, beta, gamma);

    const S2 = S + .5*dt*k1.dS;
    const I2 = I + .5*dt*k1.dI;
    const R2 = R + .5*dt*k1.dR;
    const k2 = sirDerivatives(S2, I2, R2, N, beta, gamma);

    const S3 = S + .5*dt*k2.dS;
    const I3 = I + .5*dt*k2.dI;
    const R3 = R + .5*dt*k2.dR;
    const k3 = sirDerivatives(S3, I3, R3, N, beta, gamma);

    const S4 = S + dt*k3.dS;
    const I4 = I + dt*k3.dI;
    const R4 = R + dt*k3.dR;
    const k4 = sirDerivatives(S4, I4, R4, N, beta, gamma);

    S += (dt/6) * (k1.dS + 2*k2.dS + 2*k3.dS + k4.dS);
    I += (dt/6) * (k1.dI + 2*k2.dI + 2*k3.dI + k4.dI);
    R += (dt/6) * (k1.dR + 2*k2.dR + 2*k3.dR + k4.dR);

    // clamp
    S = Math.max(0, S);
    I = Math.max(0, I);
    R = Math.max(0, R);

    sArr.push(S);
    iArr.push(I);
    rArr.push(R);
    labels.push(`Dia ${t}`);
  }

  return { labels, S: sArr, I: iArr, R: rArr };
}

// ── Metrics ───────────────────────────────────────────────────────
function updateMetrics(iArr, rArr, N, R0) {
  const peakVal = Math.max(...iArr);
  const peakDay = iArr.indexOf(peakVal);
  const totalCases = rArr[rArr.length - 1];
  const herd = Math.max(0, 1 - 1/R0);

  document.getElementById('m-peak-val').textContent = fmt(peakVal);
  document.getElementById('m-peak-pct').textContent = `${pct(peakVal/N)} da população`;
  document.getElementById('m-peak-day').textContent = `Dia ${peakDay}`;
  document.getElementById('m-total').textContent = fmt(totalCases);
  document.getElementById('m-total-pct').textContent = `${pct(totalCases/N)} da população`;
  document.getElementById('m-herd').textContent = `${pct(herd)}`;
}

// ── Helpers ───────────────────────────────────────────────────────
const fmt      = v => Math.round(v).toLocaleString('pt-BR');
const pct      = v => (v*100).toFixed(1) + '%';
const fmtShort = v => {
  if (v >= 1e6) return (v/1e6).toFixed(1)+'M';
  if (v >= 1e3) return (v/1e3).toFixed(0)+'k';
  return Math.round(v);
};

// ── Slider bindings ───────────────────────────────────────────────
const sliders = [
  { id: 'sl-N',     valId: 'val-N',     fmt: v => Number(v).toLocaleString('pt-BR') },
  { id: 'sl-I0',    valId: 'val-I0',    fmt: v => v },
  { id: 'sl-R0',    valId: 'val-R0',    fmt: v => Number(v).toFixed(1) },
  { id: 'sl-gamma', valId: 'val-gamma', fmt: v => v },
  { id: 'sl-days',  valId: 'val-days',  fmt: v => v },
];

sliders.forEach(({ id, valId, fmt: f }) => {
  const el  = document.getElementById(id);
  const out = document.getElementById(valId);
  el.addEventListener('input', () => { out.textContent = f(el.value); });
});

// ── Run simulation ────────────────────────────────────────────────
function simulate() {
  const N        = +document.getElementById('sl-N').value;
  const I0       = +document.getElementById('sl-I0').value;
  const R0       = +document.getElementById('sl-R0').value;
  const infPer   = +document.getElementById('sl-gamma').value;
  const days     = +document.getElementById('sl-days').value;

  const { labels, S, I, R } = runSIR(N, I0, R0, infPer, days);
  buildChart(labels, S, I, R);
  updateMetrics(I, R, N, R0);
}

document.getElementById('btn-run').addEventListener('click', simulate);

// Run on load
simulate();