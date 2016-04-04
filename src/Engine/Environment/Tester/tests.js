/**
 * Mathematical tests
 * @type {Array}
 */
export let Mathematical = [
  /** Logical */
  {
    name: "Not",
    expression: "!true",
    expect: false
  },
  {
    name: "Not",
    expression: "!!true",
    expect: true
  },
  {
    name: "Not",
    expression: "!!!false",
    expect: true
  },
  {
    name: "Logical And",
    expression: "1 && 2",
    expect: 2
  },
  {
    name: "Logical And",
    expression: "1 == 1 && 2 >= 2",
    expect: true
  },
  {
    name: "Logical And",
    expression: "1 != 1 && 2 < 2",
    expect: false
  },
  {
    name: "Logical Or",
    expression: "0 || 2",
    expect: 2
  },
  {
    name: "Logical Or",
    expression: "2 || 0",
    expect: 2
  },
  {
    name: "Logical Or",
    expression: "10 <= 2 || 5 < 2 || 50 / 2 == 25",
    expect: true
  },
  {
    name: "Logical And Or",
    expression: "5 == 1 || 1 == 2 || 5 == 5",
    expect: true
  },
  /** Comparisions */
  {
    name: "Equality",
    expression: "1 == 5",
    expect: false
  },
  {
    name: "Equality",
    expression: "5 == 5",
    expect: true
  },
  {
    name: "Inequality",
    expression: "1 != 5",
    expect: true
  },
  {
    name: "Inequality",
    expression: "5 != 5",
    expect: false
  },
  {
    name: "LW",
    expression: "5 < 10",
    expect: true
  },
  {
    name: "LW",
    expression: "10 < 5",
    expect: false
  },
  {
    name: "LW",
    expression: "5 < 5",
    expect: false
  },
  {
    name: "LE",
    expression: "5 <= 10",
    expect: true
  },
  {
    name: "LE",
    expression: "10 <= 5",
    expect: false
  },
  {
    name: "LE",
    expression: "5 <= 5",
    expect: true
  },
  {
    name: "GT",
    expression: "5 > 10",
    expect: false
  },
  {
    name: "GT",
    expression: "10 > 5",
    expect: true
  },
  {
    name: "GT",
    expression: "5 > 5",
    expect: false
  },
  {
    name: "GE",
    expression: "5 >= 10",
    expect: false
  },
  {
    name: "GE",
    expression: "10 >= 5",
    expect: true
  },
  {
    name: "GE",
    expression: "5 >= 5",
    expect: true
  },
  /** Binary operators */
  {
    name: "Add operator",
    expression: "5.5 + 2.5 + 7",
    expect: 15
  },
  {
    name: "Minus operator",
    expression: "5.5 - 2.5 - 7",
    expect: -4
  },
  {
    name: "Mul operator",
    expression: "5.5 * 2.5 * 7",
    expect: 96.25
  },
  {
    name: "Div operator",
    expression: "25 / 5 / 2.5",
    expect: 2
  },
  {
    name: "Mod operator",
    expression: "32 % 6",
    expect: 2
  },
  {
    name: "Complex",
    expression: "5 + 1 / 2 * 2 - ((2.5 * (6 + 4 * 2) / 5) * 5) - 1.5",
    expect: -30.5
  },
  /** Numbers */
  {
    name: "Negative integer",
    expression: "-77.5",
    expect: -77.5
  },
  /** Booleans */
  {
    name: "True bool",
    expression: "true",
    expect: true
  },
  {
    name: "False bool",
    expression: "false",
    expect: false
  }
];