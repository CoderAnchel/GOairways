//USED IN STORES AIRPORTS STATE
export function setTipoFunc(distance) {
  if (distance < 1500) {
    return "SHORT-RANGE";
  } else if (distance < 4000) {
    return "MID-RANGE";
  } else {
    return "LONG-RANGE";
  }
}
