export const runHeavy = () =>
  setInterval(() => {
    for (let i = 0; i < 5000; i++) {
      (Math.random() * 9999999) / 7;
    }
  }, 0);
