const plot = require("node-scatterplot");

// Probability Functions
function phiOne(A, B) {
  if (!A && !B) {
    return 30;
  } else if (!A && B) {
    return 5;
  } else if (A && !B) {
    return 1;
  } else {
    return 10;
  }
}

function phiTwo(B, C) {
  if (!B && !C) {
    return 100;
  } else if (!B && C) {
    return 1;
  } else if (B && !C) {
    return 1;
  } else {
    return 100;
  }
}

function phiThree(C, D) {
  if (!C && !D) {
    return 1;
  } else if (!C && D) {
    return 100;
  } else if (C && !D) {
    return 100;
  } else {
    return 1;
  }
}

function phiFour(D, A) {
  if (!D && !A) {
    return 100;
  } else if (!D && A) {
    return 1;
  } else if (D && !A) {
    return 1;
  } else {
    return 100;
  }
}

// Sampling functions
function nextSampledVariable(variable) {
  switch (variable) {
    case "A":
      return "C";

    case "C":
      return "D";

    case "D":
      return "A";

    default:
      break;
  }
}

function sampleVariable(variable) {
  let sample;

  switch (variable) {
    case "A":
      let A1 = phiOne(1, B) * phiFour(D, 1);
      let A0 = phiOne(0, B) * phiFour(D, 0);
      sample = normalizeAndSample(A1, A0);
      A = sample;
      break;

    case "C":
      let C1 = phiTwo(B, 1) * phiThree(1, D);
      let C0 = phiTwo(B, 0) * phiThree(0, D);
      sample = normalizeAndSample(C1, C0);
      C = sample;
      break;

    case "D":
      let D1 = phiThree(C, 1) * phiFour(1, A);
      let D0 = phiThree(C, 0) * phiFour(0, A);
      sample = normalizeAndSample(D1, D0);
      D = sample;
      break;

    default:
      break;
  }

  if (A) {
    countA1++;
  } else {
    countA0++;
  }
}

function normalizeAndSample(var1, var0) {
  let total = var1 + var0;
  let var1Normalized = var1/total;
  return Math.random() <= var1Normalized;
}

// Initial States (global)
let A = true;
let B = true;
let C = true;
let D = true;

let countA1 = 0;
let countA0 = 0;

let set = [];

function main() {
  const totalSamples = 100000;
  let sampledVariable = "A";
  let iteration = 1;
  let current = 0;
  
  while (iteration <= totalSamples) {
    sampleVariable(sampledVariable);

    current = countA1 / (countA1 + countA0);
    set.push([
      iteration,
      current
    ]);

    sampledVariable = nextSampledVariable(sampledVariable);
    iteration++;
  }
  
  plot(set);
}

main();
